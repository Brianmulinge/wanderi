import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface ConsultationRequestEmailProps {
  name: string;
  age: string;
  contactMethod: 'email' | 'phone';
  email?: string;
  phone?: string;
  services: string[];
  date: string;
  time: string;
}

const serviceLabels: Record<string, string> = {
  'term-life': 'Term Life Insurance',
  'annuity': 'Annuities',
  'iul': 'IUL (Indexed Universal Life)',
};

export const ConsultationRequestEmail = ({
  name,
  age,
  contactMethod,
  email,
  phone,
  services,
  date,
  time,
}: ConsultationRequestEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New consultation request from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Consultation Request</Heading>
          
          <Section style={section}>
            <Heading style={h2}>Client Information</Heading>
            <Text style={text}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Age:</strong> {age}
            </Text>
            <Text style={text}>
              <strong>Preferred Contact Method:</strong> {contactMethod === 'email' ? 'Email' : 'Phone'}
            </Text>
            {contactMethod === 'email' && email && (
              <Text style={text}>
                <strong>Email:</strong> {email}
              </Text>
            )}
            {contactMethod === 'phone' && phone && (
              <Text style={text}>
                <strong>Phone:</strong> {phone}
              </Text>
            )}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Services of Interest</Heading>
            {services.map((service) => (
              <Text key={service} style={text}>
                • {serviceLabels[service] || service}
              </Text>
            ))}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Preferred Appointment</Heading>
            <Text style={text}>
              <strong>Date:</strong> {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text style={text}>
              <strong>Time:</strong> {time}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This consultation request was submitted through the Wanderi Insurance website.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'left' as const,
};

const h2 = {
  color: '#374151',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
};

const text = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const section = {
  margin: '24px 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
};

const footer = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '32px 0 0',
  textAlign: 'center' as const,
};

export default ConsultationRequestEmail; 