'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import { NotificationProvider } from '@/context/NotificationContext';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        localStorage.setItem('uzima-last-sync', Date.now().toString());
    }, []);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NotificationProvider>
                {children}
                <Toaster />
            </NotificationProvider>
        </ThemeProvider>
    );
}
