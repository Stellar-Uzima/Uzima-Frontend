'use client';

import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useNotificationPreferences } from '@/hooks/useNotificationPreferences';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Bell, Flame, Award, Calendar, CheckSquare, Radio } from 'lucide-react';

export const NotificationsPanel: React.FC = () => {
    const { preferences, toggleCategory, toggleChannel } = useNotificationPreferences();
    const { status, isSupported, subscribe, unsubscribe } = usePushNotifications();

    const handlePushToggle = async (checked: boolean) => {
        toggleChannel('push');
        if (checked) {
            await subscribe();
        } else {
            await unsubscribe();
        }
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h3 className="text-lg font-semibold tracking-tight">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">
                    Choose which notifications you receive and how they are delivered.
                </p>
            </div>

            {/* Category Toggles */}
            <div className="rounded-xl border bg-card p-5 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 border-b pb-3">
                    <Bell className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-sm">In-App Notification Categories</h4>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label htmlFor="toggle-task" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                                <CheckSquare className="h-4 w-4 text-muted-foreground" />
                                Task Reminders
                            </label>
                            <p className="text-xs text-muted-foreground">Alerts for pending tasks and deadlines</p>
                        </div>
                        <Switch
                            id="toggle-task"
                            checked={preferences.categories.task}
                            onCheckedChange={() => toggleCategory('task')}
                            aria-label="Toggle Task Reminders"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label htmlFor="toggle-streak" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                                <Flame className="h-4 w-4 text-amber-500" />
                                Streak Alerts
                            </label>
                            <p className="text-xs text-muted-foreground">Updates on daily streak milestones and risk warnings</p>
                        </div>
                        <Switch
                            id="toggle-streak"
                            checked={preferences.categories.streak}
                            onCheckedChange={() => toggleCategory('streak')}
                            aria-label="Toggle Streak Alerts"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label htmlFor="toggle-badge" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                                <Award className="h-4 w-4 text-yellow-500" />
                                Badge Awards
                            </label>
                            <p className="text-xs text-muted-foreground">Notifications when unlocking new profile badges</p>
                        </div>
                        <Switch
                            id="toggle-badge"
                            checked={preferences.categories.badge}
                            onCheckedChange={() => toggleCategory('badge')}
                            aria-label="Toggle Badge Awards"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label htmlFor="toggle-appointment" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                                <Calendar className="h-4 w-4 text-blue-500" />
                                Appointment Reminders
                            </label>
                            <p className="text-xs text-muted-foreground">Reminders for scheduled appointments and calls</p>
                        </div>
                        <Switch
                            id="toggle-appointment"
                            checked={preferences.categories.appointment}
                            onCheckedChange={() => toggleCategory('appointment')}
                            aria-label="Toggle Appointment Reminders"
                        />
                    </div>
                </div>
            </div>

            {/* Push Notifications Integration */}
            <div className="rounded-xl border bg-card p-5 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 border-b pb-3">
                    <Radio className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-sm">Browser Push Notifications</h4>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <label htmlFor="toggle-push" className="text-sm font-medium cursor-pointer">
                            Push Notifications Channel
                        </label>
                        <p className="text-xs text-muted-foreground">
                            {!isSupported
                                ? 'Push notifications are not supported by your browser.'
                                : status === 'denied'
                                    ? 'Push permission blocked in browser settings.'
                                    : 'Receive direct desktop/device push alerts.'}
                        </p>
                    </div>
                    <Switch
                        id="toggle-push"
                        checked={status === 'subscribed'}
                        disabled={!isSupported || status === 'denied' || status === 'loading'}
                        onCheckedChange={handlePushToggle}
                        aria-label="Toggle Push Notifications Channel"
                    />
                </div>
            </div>
        </div>
    );
};