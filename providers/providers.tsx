'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

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
            {/* Notification state now stays closer to the navbar to reduce shared client work. */}
            {children}
        </ThemeProvider>
    );
}
