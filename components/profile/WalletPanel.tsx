'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Link as LinkIcon, Unplug } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';

function truncate(addr: string, left = 6, right = 6) {
	if (!addr) return '';
	if (addr.length <= left + right + 3) return addr;
	return `${addr.slice(0, left)}...${addr.slice(-right)}`;
}

export function WalletPanel({
	address,
	totalXlm,
	onConnect,
	onDisconnectSuccess,
}: {
	address: string | null;
	totalXlm: number;
	onConnect: () => void;
	onDisconnectSuccess?: () => void;
}) {
	async function copy() {
		if (!address) return;
		await navigator.clipboard.writeText(address);
		toast?.({ title: 'Copied', description: 'Wallet address copied' });
	}

	async function disconnect() {
		try {
			const res = await fetch('/api/wallet/disconnect', { method: 'POST' });
			if (!res.ok) throw new Error('');
			toast?.({ title: 'Wallet disconnected' });
			onDisconnectSuccess?.();
		} catch {
			toast?.({ title: 'Error', description: 'Could not disconnect', variant: 'error' });
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Stellar Wallet</CardTitle>
				<CardDescription>Manage your connected wallet and rewards</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{address ? (
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
						<div className="space-y-1">
							<div className="text-sm text-muted-foreground">Connected Address</div>
							<div className="font-mono text-base">{truncate(address)}</div>
						</div>
						<div className="flex gap-2">
							<Button type="button" variant="outline" onClick={copy}>
								<Copy className="h-4 w-4 mr-2" /> Copy
							</Button>
							<Button type="button" variant="destructive" onClick={disconnect}>
								<Unplug className="h-4 w-4 mr-2" /> Disconnect
							</Button>
						</div>
					</div>
				) : (
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
						<div>
							<div className="text-sm text-muted-foreground">No wallet connected</div>
							<div className="text-sm">Connect to start earning and redeeming rewards.</div>
						</div>
						<Button type="button" onClick={onConnect}>
							<LinkIcon className="h-4 w-4 mr-2" /> Connect Wallet
						</Button>
					</div>
				)}

				<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
					<div className="rounded-lg border p-3">
						<div className="text-sm text-muted-foreground">Total XLM Earned</div>
						<div className="text-2xl font-semibold">{totalXlm.toFixed(2)} XLM</div>
					</div>
					<div className="rounded-lg border p-3">
						<div className="text-sm text-muted-foreground">Reward History</div>
						<Link href="/rewards" className="text-primary underline underline-offset-4 text-sm">
							View history
						</Link>
					</div>
				</div>
			</CardContent>
			<CardFooter />
		</Card>
	);
}

