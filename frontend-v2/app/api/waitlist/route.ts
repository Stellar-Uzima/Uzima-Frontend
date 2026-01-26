
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
    email: z.string().email(),
    source: z.string().optional()
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, source } = schema.parse(body)

        // 0. Rate Limiting (Max 3 per hour per IP)
        const ip = req.headers.get('x-forwarded-for') || 'unknown'
        if (ip !== 'unknown') {
            const { count: requests } = await supabase
                .from('waitlist')
                .select('*', { count: 'exact', head: true })
                .eq('ip_address', ip)
                .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())

            if ((requests || 0) >= 3) {
                return NextResponse.json(
                    { error: 'Too many requests. Please try again later.' },
                    { status: 429 }
                )
            }
        }

        // 1. Check for duplicates
        const { data: existing } = await supabase
            .from('waitlist')
            .select('position')
            .eq('email', email)
            .single()

        if (existing) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            )
        }

        // 2. Insert into Supabase
        // Get current count for position (naive approach, better use a sequence or count)
        const { count } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact', head: true })

        const position = (count || 0) + 1
        const token = crypto.randomUUID()

        const { error: insertError } = await supabase
            .from('waitlist')
            .insert({
                email,
                position,
                verification_token: token,
                source: source || 'web',
                ip_address: req.headers.get('x-forwarded-for') || 'unknown',
                user_agent: req.headers.get('user-agent') || 'unknown'
            })

        if (insertError) {
            console.error('Supabase error:', insertError)
            return NextResponse.json(
                { error: 'Failed to join waitlist' },
                { status: 500 }
            )
        }

        // 3. Send Email
        try {
            await resend.emails.send({
                from: 'Stellar Uzima <onboarding@resend.dev>', // Update with verify domain later
                to: email,
                subject: 'Welcome to the Stellar Uzima Waitlist! 🎉',
                html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #0d9488;">Welcome to Stellar Uzima!</h1>
                    <p>You've secured your spot on our waitlist.</p>
                    <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                        <p style="margin: 0; font-size: 14px; color: #666;">Current Position</p>
                        <p style="margin: 5px 0 0 0; font-size: 32px; font-weight: bold; color: #0f172a;">#${position.toLocaleString()}</p>
                    </div>
                    <p>Please verify your email to secure your spot:</p>
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}" style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Email</a>
                    <p style="margin-top: 20px; font-size: 12px; color: #888;">If you didn't sign up, please ignore this email.</p>
                </div>
            `
            })
        } catch (emailError) {
            console.error('Email sending failed:', emailError)
            // Don't fail the request if email fails, but log it
        }

        return NextResponse.json({ success: true, position })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
