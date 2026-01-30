'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { DownloadIcon, LayoutDashboardIcon, UsersIcon, CheckCircleIcon } from 'lucide-react'

// Simple type for our data
type Stats = {
    total: number;
    verified: number;
    recent: { created_at: string }[];
    allData: any[];
}

export default function AdminWaitlistPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/waitlist/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const downloadCSV = () => {
        if (!stats?.allData) return;

        const headers = ['ID', 'Email', 'Position', 'Verified', 'Source', 'Created At'];
        const csvContent = [
            headers.join(','),
            ...stats.allData.map(row => [
                row.id,
                row.email,
                row.position,
                row.verified,
                row.source,
                row.created_at
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'waitlist-export.csv';
        a.click();
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Spinner className="w-8 h-8" /></div>
    }

    if (!stats) {
        return <div className="p-8">Failed to load stats.</div>
    }

    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <LayoutDashboardIcon className="w-8 h-8" />
                    Waitlist Dashboard
                </h1>
                <Button onClick={downloadCSV} className="gap-2">
                    <DownloadIcon className="w-4 h-4" />
                    Export CSV
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Signups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{stats.total.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Verified Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-teal-600 flex items-center gap-2">
                            {stats.verified.toLocaleString()}
                            <CheckCircleIcon className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {((stats.verified / stats.total) * 100).toFixed(1)}% verification rate
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Recent (7 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-blue-600">
                            {stats.recent.length.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Signups</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-2 font-medium">Email</th>
                                    <th className="text-left p-2 font-medium">Position</th>
                                    <th className="text-left p-2 font-medium">Status</th>
                                    <th className="text-left p-2 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.allData.slice(0, 10).map((user) => (
                                    <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">#{user.position}</td>
                                        <td className="p-2">
                                            {user.verified ?
                                                <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded text-xs font-medium">Verified</span> :
                                                <span className="text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded text-xs font-medium">Pending</span>
                                            }
                                        </td>
                                        <td className="p-2 text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
