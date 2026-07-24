"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNotificationContext } from '../../context/NotificationContext';
import { NotificationItem } from './NotificationItem';
import { PushNotificationSetup } from './PushNotificationSetup';
import { X } from 'lucide-react'; 
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { EmptyState } from '../ui/EmptyState';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const NotificationPanelContent: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotificationContext();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on the client to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button aria-label="Notifications" className="relative">
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 max-h-[400px] overflow-auto bg-white shadow-lg rounded-md p-2">
        <div className="flex justify-between items-center px-2 py-1 font-semibold">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-blue-500 text-sm">Mark all as read</button>
          )}
        </div>
        <div>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-400">No notifications yet</div>
          ) : (
            notifications.slice(0, 10).map(n => (
              <NotificationItem
                key={n.id}
                notification={n}
                onClick={() => markAsRead(n.id)}
                onDelete={() => deleteNotification(n.id)}
              />
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div className="p-2 text-center">
            <Link href="/notifications" className="text-blue-500 text-sm">View all</Link>
          </div>
        )}
      </PopoverContent>

      {/* PORTAL: Teleports the overlay and panel to document.body to escape Navbar clipping */}
      {mounted && createPortal(
        <>
          {/* 1. BACKDROP OVERLAY: z-[70] to cover Navbar (z-30) and Mobile Drawer (z-50) */}
          <div 
            className={`fixed inset-0 bg-black/50 z-[70] transition-opacity duration-300 ${
              open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setOpen(false)}
          />

          {/* 2. NOTIFICATION PANEL: z-[70] matching backdrop */}
          <div className={`
            fixed z-[70] bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col
            
            /* MOBILE: Bottom Sheet (Slides up from bottom) */
            bottom-0 left-0 right-0 h-[75vh] rounded-t-3xl 
            ${open ? 'translate-y-0' : 'translate-y-full'}
            
            /* DESKTOP: Side Panel (Slides in from right at 'md' breakpoint) */
            md:top-0 md:right-0 md:left-auto md:bottom-0 md:h-full md:w-[400px] md:rounded-none
            ${open ? 'md:translate-x-0' : 'md:translate-x-full md:translate-y-0'}
          `}>
            
            {/* 3. STICKY HEADER: High contrast text and visible Close button */}
            <div className="sticky top-0 flex justify-between items-center px-6 py-5 border-b bg-white z-10 rounded-t-3xl md:rounded-none">
              <span className="font-serif font-bold text-earth text-xl">Notifications</span>
              <div className="flex items-center gap-4">
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead} 
                    className="text-terra text-sm font-semibold hover:underline transition-all"
                  >
                    Mark all as read
                  </button>
                )}
                <button 
                  onClick={() => setOpen(false)} 
                  className="p-2 text-earth/60 hover:text-earth hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Close notifications"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* 4. SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {notifications.length === 0 ? (
                <EmptyState
                  icon="📭"
                  title="Clear for now!"
                  description="You're all caught up. New health alerts and rewards will appear here."
                  className="bg-transparent border-none py-12"
                />
              ) : (
                <div className="space-y-1">
                  {notifications.slice(0, 10).map(n => (
                    <NotificationItem
                      key={n.id}
                      notification={n}
                      onClick={() => markAsRead(n.id)}
                      onDelete={() => deleteNotification(n.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 5. FOOTER */}
            <div className="p-6 border-t bg-cream/30">
              {notifications.length > 0 && (
                <div className="text-center mb-6">
                  <Link 
                    href="/notifications" 
                    onClick={() => setOpen(false)}
                    className="text-terra font-bold text-sm hover:text-earth transition-colors"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
              <PushNotificationSetup />
            </div>
          </div>
        </>,
        document.body
      )}
    </Popover>
  );
};

export const NotificationPanel: React.FC = () => (
  <ErrorBoundary componentName="NotificationPanel">
    <NotificationPanelContent />
  </ErrorBoundary>
);
