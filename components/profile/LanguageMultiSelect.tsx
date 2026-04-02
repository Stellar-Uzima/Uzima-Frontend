'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LANGS = [
	'English','French','Arabic','Swahili','Hausa','Yoruba','Igbo','Amharic','Zulu','Shona','Somali','Berber','Akan','Wolof','Kinyarwanda','Kirundi','Tigrinya','Oromo','Portuguese'
];

export function LanguageMultiSelect({
	value,
	onChange,
}: {
	value: string[];
	onChange: (v: string[]) => void;
}) {
	const set = useMemo(() => new Set(value), [value]);

	function toggle(lang: string) {
		const next = new Set(set);
		if (next.has(lang)) next.delete(lang);
		else next.add(lang);
		onChange(Array.from(next));
	}

	return (
		<div className="flex flex-wrap gap-2">
			{LANGS.map((lang) => {
				const active = set.has(lang);
				return (
					<Button
						type="button"
						key={lang}
						variant={active ? 'default' : 'outline'}
						className={cn('h-9 rounded-full px-3', active && 'bg-primary text-primary-foreground')}
						onClick={() => toggle(lang)}
					>
						{lang}
					</Button>
				);
			})}
		</div>
	);
}

