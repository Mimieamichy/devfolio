// src/app/api/contact/route.ts
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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

    // **Dummy Handler:** In a real application, you would:
    // 1. Send an email (using a service like SendGrid, Resend, Nodemailer)
    // 2. Save the message to a database
    // 3. Notify yourself via Slack, etc.
    console.log('--- Contact Form Submission ---');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('-----------------------------');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return a success response
    return NextResponse.json({ message: 'Message received successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
