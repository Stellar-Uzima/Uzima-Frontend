'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Dumbbell, Salad, HeartPulse, Brain, Bed, Droplets } from 'lucide-react';

const GOALS: { key: string; label: string; icon: React.ComponentType<any> }[] = [
	{ key: 'nutrition', label: 'Nutrition', icon: Salad },
	{ key: 'exercise', label: 'Exercise', icon: Dumbbell },
	{ key: 'mental_health', label: 'Mental Health', icon: Brain },
	{ key: 'sleep', label: 'Sleep', icon: Bed },
	{ key: 'hydration', label: 'Hydration', icon: Droplets },
	{ key: 'heart_health', label: 'Heart Health', icon: HeartPulse },
];

export function HealthGoals({
	value,
	onChange,
}: {
	value: string[];
	onChange: (v: string[]) => void;
}) {
	function toggle(key: string) {
		const set = new Set(value);
		if (set.has(key)) set.delete(key);
		else set.add(key);
		onChange(Array.from(set));
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
			{GOALS.map(({ key, label, icon: Icon }) => {
				const active = value.includes(key);
				return (
					<button
						type="button"
						key={key}
						onClick={() => toggle(key)}
						className={cn(
							'border rounded-lg p-3 flex flex-col items-center gap-2 transition',
							active ? 'border-primary bg-primary/10' : 'hover:bg-muted'
						)}
						aria-pressed={active}
					>
						<Icon className={cn('h-5 w-5', active ? 'text-primary' : 'text-muted-foreground')} />
						<span className="text-xs font-medium text-center">{label}</span>
					</button>
				);
			})}
		</div>
	);
}

