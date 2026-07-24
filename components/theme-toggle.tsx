'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        "relative p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-all duration-300 outline-none border-none",
        "bg-amber-800 text-cream overflow-hidden"
      )}
      aria-label="Toggle Theme"
    >
      {/* SUN ICON: Spins in/out */}
      <Sun 
        className={cn(
          "h-5 w-5 transition-all duration-300 transform",
          // When light: centered, scale 1. When dark: rotated -90deg and shrunk to 0
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        )} 
      />
      
      {/* MOON ICON: Spins in/out */}
      <Moon 
        className={cn(
          "absolute h-5 w-5 transition-all duration-300 transform",
          // When dark: centered, scale 1. When light: rotated 90deg and shrunk to 0
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        )} 
      />
      
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
}