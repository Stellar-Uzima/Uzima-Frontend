'use client';

import React from 'react';
import { Bell, BellOff, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export function PushNotificationSetup() {
  const { status, isSupported, subscribe, unsubscribe } = usePushNotifications();

  if (!isSupported) return null;

  if (status === 'denied') {
    return (
      <Card className="p-4 flex items-center gap-3 bg-muted/50">
        <BellOff className="w-5 h-5 text-muted-foreground shrink-0" />
        <div>
          <p className="font-semibold text-sm">Notifications Blocked</p>
          <p className="text-xs text-muted-foreground">
            Enable notifications in your browser settings to receive reminders
          </p>
        </div>
      </Card>
    );
  }

  if (status === 'subscribed') {
    return (
      <Card className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BellRing className="w-5 h-5 text-[#B84E20] shrink-0" />
          <div>
            <p className="font-semibold text-sm">Push Notifications Enabled</p>
            <p className="text-xs text-muted-foreground">
              You&apos;ll receive task reminders and streak alerts
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={unsubscribe}
          className="border-[#B84E20]/20 hover:bg-[#B84E20]/5 rounded-xl shrink-0"
        >
          <BellOff className="w-4 h-4 mr-2" />
          Disable
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Bell className="w-5 h-5 text-[#B84E20] mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-sm">Enable Push Notifications</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Get reminders for daily tasks, streak alerts, and XLM earnings — even when the app is closed
          </p>
        </div>
      </div>
      <Button
        onClick={subscribe}
        disabled={status === 'loading'}
        className="w-full bg-[#B84E20] hover:bg-[#A04020] text-white font-semibold rounded-xl"
      >
        <Bell className="w-4 h-4 mr-2" />
        {status === 'loading' ? 'Setting up...' : 'Enable Notifications'}
      </Button>
    </Card>
  );
}
