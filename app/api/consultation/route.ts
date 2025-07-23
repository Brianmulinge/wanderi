import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ConsultationRequestEmail } from '@/app/emails/consultation-request';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const consultationSchema = z.object({
  name: z.string().min(2),
  age: z.string(),
  contactMethod: z.enum(['email', 'phone']),
  email: z.string().optional().refine((val) => {
    if (!val || val === '') return true; // Allow empty/undefined
    return z.string().email().safeParse(val).success;
  }, {
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().optional().refine((val) => {
    if (!val || val === '') return true; // Allow empty/undefined
    return /^\d{10}$/.test(val); // Must be exactly 10 digits if provided
  }, {
    message: 'Phone number must be exactly 10 digits.',
  }),
  services: z.array(z.enum(['term-life', 'annuity', 'iul'])),
  date: z.string(),
  time: z.string(),
}).refine((data) => {
  if (data.contactMethod === 'email' && !data.email) {
    return false;
  }
  if (data.contactMethod === 'phone' && !data.phone) {
    return false;
  }
  return true;
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = consultationSchema.parse(body);
    
    // Render the email HTML
    const emailHtml = await render(ConsultationRequestEmail({
      name: validatedData.name,
      age: validatedData.age,
      contactMethod: validatedData.contactMethod,
      email: validatedData.email,
      phone: validatedData.phone,
      services: validatedData.services,
      date: validatedData.date,
      time: validatedData.time,
    }));
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'consultations@your-actual-domain.com',
      to: [process.env.CONSULTATION_EMAIL || 'your-email@example.com'], // Your email where you want to receive consultations
      subject: `New Consultation Request from ${validatedData.name}`,
      html: emailHtml,
      replyTo: validatedData.contactMethod === 'email' ? validatedData.email : undefined,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Failed to send consultation request' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Consultation request sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing consultation request:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 