'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export type NotificationsState = {
	taskReminders: boolean;
	streakAlerts: boolean;
	newCoupons: boolean;
	consultationReminders: boolean;
	quietStart: string; // "HH:mm"
	quietEnd: string;   // "HH:mm"
};

export function NotificationsPanel({
	value,
	onChange,
	onSave,
	saving,
}: {
	value: NotificationsState;
	onChange: (v: NotificationsState) => void;
	onSave?: (e?: React.FormEvent) => void;
	saving?: boolean;
}) {
	function set<K extends keyof NotificationsState>(key: K, v: NotificationsState[K]) {
		onChange({ ...value, [key]: v });
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>Choose what you want to be notified about</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid gap-4">
					<Row
						label="Task reminders"
						checked={value.taskReminders}
						onCheckedChange={(c) => set('taskReminders', c)}
					/>
					<Row
						label="Streak alerts"
						checked={value.streakAlerts}
						onCheckedChange={(c) => set('streakAlerts', c)}
					/>
					<Row
						label="New coupons"
						checked={value.newCoupons}
						onCheckedChange={(c) => set('newCoupons', c)}
					/>
					<Row
						label="Consultation reminders"
						checked={value.consultationReminders}
						onCheckedChange={(c) => set('consultationReminders', c)}
					/>
				</div>

				<div className="grid sm:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="quietStart">Quiet hours start</Label>
						<input
							id="quietStart"
							type="time"
							className="w-full h-10 border rounded-md px-3 bg-background"
							value={value.quietStart}
							onChange={(e) => set('quietStart', e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="quietEnd">Quiet hours end</Label>
						<input
							id="quietEnd"
							type="time"
							className="w-full h-10 border rounded-md px-3 bg-background"
							value={value.quietEnd}
							onChange={(e) => set('quietEnd', e.target.value)}
						/>
					</div>
				</div>

				<div className="flex justify-end">
					<Button type="button" onClick={onSave} disabled={!!saving}>
						{saving ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

function Row({
	label,
	checked,
	onCheckedChange,
}: {
	label: string;
	checked: boolean;
	onCheckedChange: (c: boolean) => void;
}) {
	return (
		<div className="flex items-center justify-between gap-3">
			<div className="space-y-0.5">
				<div className="font-medium">{label}</div>
				<div className="text-sm text-muted-foreground">Enable or disable {label.toLowerCase()}</div>
			</div>
			<Switch checked={checked} onCheckedChange={onCheckedChange} />
		</div>
	);
}

