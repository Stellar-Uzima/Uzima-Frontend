'use client';

import * as React from 'react';
import { ThemeProvider, useTheme } from 'next-themes';




export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}