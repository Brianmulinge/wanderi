# Email Integration Setup

This project now includes email functionality for consultation form submissions using Resend and React Email.

## Setup Instructions

### 1. Resend Account Setup

1. Go to [Resend](https://resend.com) and create an account
2. Verify your email address
3. Go to [API Keys](https://resend.com/api-keys) and create a new API key
4. Copy the API key (it starts with `re_`)

### 2. Domain Configuration (Optional but Recommended)

For production use, you should add and verify your domain in Resend:
1. Go to [Domains](https://resend.com/domains) in your Resend dashboard
2. Add your domain (e.g., `yourdomain.com`)
3. Follow the DNS verification steps
4. Once verified, update the `from` email in `app/api/consultation/route.ts` to use your domain (e.g., `consultations@yourdomain.com`)

For development, you can use Resend's testing domain, but emails will only be sent to verified email addresses.

### 3. Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables (see `env.example` for reference):

```env
# Your Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# Email address to send FROM (must be from your verified domain)
FROM_EMAIL=consultations@your-verified-domain.com

# Email where you want to receive consultation requests
CONSULTATION_EMAIL=your-email@example.com
```

### 4. Update Email Configuration

The API route now uses environment variables for configuration:

- `FROM_EMAIL`: Must be an email address from your verified domain (e.g., `consultations@your-domain.com`)
- `CONSULTATION_EMAIL`: Your email address where you want to receive consultation requests

## How It Works

1. User fills out the consultation form
2. Form data is sent to `/api/consultation` endpoint
3. The API validates the data and renders a beautiful HTML email using React Email
4. Email is sent via Resend to your specified email address
5. User receives confirmation of successful submission

## Email Template

The email template (`app/emails/consultation-request.tsx`) includes:
- Client information (name, age, contact details)
- Selected services
- Preferred appointment date and time
- Professional styling with proper formatting

## Testing

For development testing with unverified domains, Resend will only send emails to:
- Your verified Resend account email
- The email you used to sign up for Resend

Once you verify a domain, you can send to any email address.

## Troubleshooting

1. **Email not sending**: Check that your API key is correct and in the right environment file (`.env.local`)
2. **401 Unauthorized**: Your API key might be invalid or expired
3. **Domain not verified**: For production, make sure your domain is verified in Resend
4. **Form submission fails**: Check the browser console and server logs for error details 