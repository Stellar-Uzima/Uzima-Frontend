
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
    try {
        const { token } = await req.json()

        if (!token) {
            return NextResponse.json({ error: 'Token required' }, { status: 400 })
        }

        // Update verified status
        const { data, error } = await supabase
            .from('waitlist')
            .update({
                verified: true,
                verified_at: new Date().toISOString()
            })
            .eq('verification_token', token)
            .select()
            .single()

        if (error || !data) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
        }

        return NextResponse.json({ success: true })

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
