import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// In-memory storage for verification codes (use Redis in production)
const verificationCodes: Map<string, {
  code: string;
  expiresAt: Date;
  attempts: number;
}> = new Map();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({
        success: false,
        error: 'Email is required',
      }, { status: 400 });
    }
    
    // Generate 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();
    
    // Set expiration to 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
    // Store code
    verificationCodes.set(email, {
      code,
      expiresAt,
      attempts: 0,
    });
    
    // Send email with code
    await sendVerificationEmail(email, code);
    
    return NextResponse.json({
      success: true,
      message: 'Verification code sent',
    });
    
  } catch (error) {
    console.error('Send verification error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send verification code',
    }, { status: 500 });
  }
}

async function sendVerificationEmail(email: string, code: string) {
  console.log(`Sending verification code ${code} to ${email}`);
  
  // Implement actual email sending
  // Example using nodemailer or email service:
  /*
  await emailService.send({
    to: email,
    subject: 'Email Verification Code',
    html: `
      <h1>Verify Your Email</h1>
      <p>Your verification code is: <strong>${code}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this code, please ignore this email.</p>
    `,
  });
  */
}

// app/api/professional/verify-code/route.ts

export async function POST_VERIFY(req: NextRequest) {
  try {
    const { email, code } = await req.json();
    
    if (!email || !code) {
      return NextResponse.json({
        success: false,
        error: 'Email and code are required',
      }, { status: 400 });
    }
    
    const stored = verificationCodes.get(email);
    
    if (!stored) {
      return NextResponse.json({
        success: false,
        error: 'No verification code found for this email',
      }, { status: 404 });
    }
    
    // Check if expired
    if (new Date() > stored.expiresAt) {
      verificationCodes.delete(email);
      return NextResponse.json({
        success: false,
        error: 'Verification code has expired',
      }, { status: 400 });
    }
    
    // Check attempts
    if (stored.attempts >= 3) {
      verificationCodes.delete(email);
      return NextResponse.json({
        success: false,
        error: 'Too many attempts. Please request a new code.',
      }, { status: 429 });
    }
    
    // Verify code
    if (stored.code !== code) {
      stored.attempts += 1;
      return NextResponse.json({
        success: false,
        error: 'Invalid verification code',
        attemptsRemaining: 3 - stored.attempts,
      }, { status: 400 });
    }
    
    // Success - remove code
    verificationCodes.delete(email);
    
    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
    
  } catch (error) {
    console.error('Verify code error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to verify code',
    }, { status: 500 });
  }
}