import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

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

    const response = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // You can change this after verifying a domain/sender
      to: process.env.EMAIL_RECEIVER!,
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        Message:
        ${message}
      `,
    });

    if (response.error) {
      console.error(response.error);
      return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
