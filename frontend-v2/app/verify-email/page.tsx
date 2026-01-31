'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShieldCheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function VerifyEmailPage() {
    const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error' | null>(null);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();

    useEffect(() => {
        if (token) {
            setVerificationStatus('verifying');
            fetch('/api/waitlist/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setVerificationStatus('success');
                        setTimeout(() => router.push('/'), 3000);
                    } else {
                        setVerificationStatus('error');
                    }
                })
                .catch(() => setVerificationStatus('error'));
        }
    }, [token, router]);

    if (!token) {
        return null; // Or some fallback UI
    }

    return (
        <main className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-4">
                {verificationStatus === 'verifying' && <Spinner className="size-8 mx-auto" />}
                {verificationStatus === 'success' && (
                    <>
                        <div className="mx-auto bg-green-100 p-3 rounded-full w-fit">
                            <ShieldCheckIcon className="size-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold">Email Verified!</h1>
                        <p>Redirecting you to the home page...</p>
                    </>
                )}
                {verificationStatus === 'error' && (
                    <>
                        <h1 className="text-2xl font-bold text-red-500">Verification Failed</h1>
                        <p>The token may be invalid or expired.</p>
                        <Link href="/">
                            <Button>Return Home</Button>
                        </Link>
                    </>
                )}
            </div>
        </main>
    );
}
