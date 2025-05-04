import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Initialize Resend with the environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = validation.data;

    // Ensure email receiver is available in environment variables
    if (!process.env.EMAIL_RECEIVER) {
      return NextResponse.json({ message: 'Email receiver is not configured' }, { status: 500 });
    }

    // Send email via Resend
    const response = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use a verified sender email
      to: process.env.EMAIL_RECEIVER!,  // Your email address to receive the contact form message
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        Message:
        ${message}
      `,
    });

    // Check if the email was sent successfully
    if (response.error) {
      console.error('Failed to send email:', response);
      return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
