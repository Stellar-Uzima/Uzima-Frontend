
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // 1. Get total count
        const { count: total, error: countError } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact', head: true })

        if (countError) throw countError

        // 2. Get verified count
        const { count: verified, error: verifiedError } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact', head: true })
            .eq('verified', true)

        if (verifiedError) throw verifiedError

        // 3. Get recent signups for trend (last 7 days)
        const { data: recent, error: recentError } = await supabase
            .from('waitlist')
            .select('created_at')
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
            .order('created_at', { ascending: true })

        if (recentError) throw recentError

        // 4. Get all data for CSV export (limit to 1000 for safety in this demo)
        const { data: allData, error: dataError } = await supabase
            .from('waitlist')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1000)

        if (dataError) throw dataError

        return NextResponse.json({
            total,
            verified,
            recent,
            allData
        })

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
