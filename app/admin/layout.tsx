
import React from 'react';
import Navigation from '@/components/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navigation />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
