'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const services = [
  { value: 'term-life', label: 'Term Life Insurance', description: 'Affordable protection for your family' },
  { value: 'annuity', label: 'Annuities', description: 'Secure retirement income planning' },
  { value: 'iul', label: 'IUL (Indexed Universal Life)', description: 'Life insurance with growth potential' },
] as const;

type ServiceType = typeof services[number]['value'];

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  age: z.string().refine((age) => {
    const num = parseInt(age);
    return num >= 18 && num <= 100;
  }, {
    message: 'Age must be between 18 and 100.',
  }),
  contactMethod: z.enum(['email', 'phone'], {
    required_error: 'Please select a contact method.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }).optional(),
  phone: z.string().optional(),
  services: z.array(z.enum(['term-life', 'annuity', 'iul'])).min(1, {
    message: 'Please select at least one service.',
  }),
  date: z.date({
    required_error: 'A date is required.',
  }),
  time: z.string().min(1, {
    message: 'Please select a time.',
  }),
}).refine((data) => {
  if (data.contactMethod === 'email' && !data.email) {
    return false;
  }
  if (data.contactMethod === 'phone' && !data.phone) {
    return false;
  }
  return true;
}, {
  message: 'Please provide your contact information based on the selected method.',
  path: ['contactMethod'],
});

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM'
];

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '',
      contactMethod: 'email',
      email: '',
      phone: '',
      services: [],
      date: undefined,
      time: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const formattedValues = {
      ...values,
      date: format(values.date, 'yyyy-MM-dd'),
    };
    
    console.log('Form submitted:', formattedValues);
    alert('Consultation request submitted successfully! We will contact you soon.');
    
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-xl p-8 sm:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 35" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setContactMethod(value as 'email' | 'phone');
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {contactMethod === 'email' ? (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="services"
            render={() => (
              <FormItem>
                <FormLabel>Services of Interest <span className="text-muted-foreground text-sm">(select all that apply)</span></FormLabel>
                <div className="space-y-3">
                  {services.map((service) => (
                    <FormField
                      key={service.value}
                      control={form.control}
                      name="services"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={service.value}
                            className="flex flex-row items-start space-x-3 space-y-0 border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                          >
                            <FormControl>
                              <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-primary"
                                checked={field.value?.includes(service.value)}
                                onChange={(checked) => {
                                  return checked.target.checked
                                    ? field.onChange([...field.value, service.value])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== service.value
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <div className="flex-1">
                              <FormLabel className="text-base font-medium cursor-pointer">
                                {service.label}
                              </FormLabel>
                              <p className="text-sm text-muted-foreground">
                                {service.description}
                              </p>
                            </div>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full text-lg"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </Form>
    </div>
  );
} 