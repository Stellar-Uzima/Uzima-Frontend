'use client';

import * as React from 'react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const EMOJIS = ['🙂','😀','🧑🏾','🧑🏽‍⚕️','🧘🏿','🏃🏽‍♀️','🥗','💧','🧠','💪','💤','❤️'];

export function AvatarEmojiPicker({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex items-center gap-3">
			<div className="h-16 w-16 rounded-full border flex items-center justify-center text-3xl bg-card">
				<span aria-label="avatar">{value}</span>
			</div>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button type="button" variant="outline">Change Avatar</Button>
				</PopoverTrigger>
				<PopoverContent className="w-60">
					<div className="grid grid-cols-6 gap-2">
						{EMOJIS.map((e) => (
							<button
								type="button"
								key={e}
								className="h-10 w-10 rounded-md border text-2xl hover:bg-muted"
								onClick={() => {
									onChange(e);
									setOpen(false);
								}}
								aria-label={`Select ${e}`}
							>
								{e}
							</button>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}

