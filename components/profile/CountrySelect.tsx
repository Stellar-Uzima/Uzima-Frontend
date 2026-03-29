'use client';

import * as React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { africanCountries } from './countries';

export function CountrySelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger>
				<SelectValue placeholder="Select country" />
			</SelectTrigger>
			<SelectContent className="max-h-72">
				{africanCountries.map((c) => (
					<SelectItem key={c} value={c}>
						{c}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

