'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/EmptyState';
import type { ReferralRecord, ReferralSummary } from '@/lib/mock/referrals';

// Fixed locale + timezone so the server and client render the same string.
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC',
});

const statusLabels: Record<ReferralRecord['status'], string> = {
	pending: 'Invite sent',
	joined: 'Signed up',
	rewarded: 'Rewarded',
};

interface ReferralStatsProps {
	summary: ReferralSummary;
	isLoading?: boolean;
	/** Called from the empty-state CTA so the user can jump straight to sharing. */
	onShare?: () => void;
}

export function ReferralStats({ summary, isLoading = false, onShare }: ReferralStatsProps) {
	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Referral rewards</CardTitle>
					<CardDescription>Loading your referral activity...</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="animate-pulse grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="h-20 bg-muted rounded-lg" />
						<div className="h-20 bg-muted rounded-lg" />
						<div className="h-20 bg-muted rounded-lg" />
					</div>
				</CardContent>
			</Card>
		);
	}

	if (summary.totalSignups === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Referral rewards</CardTitle>
					<CardDescription>Track the signups and XLM your link has earned</CardDescription>
				</CardHeader>
				<CardContent>
					<EmptyState
						illustration="rewards"
						title="No referrals yet"
						description="Share your link with friends and family. You will see every signup here, along with the XLM it earns you."
						ctaLabel={onShare ? 'Share your link' : undefined}
						onCtaClick={onShare}
					/>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Referral rewards</CardTitle>
				<CardDescription>Track the signups and XLM your link has earned</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<Stat label="Referred signups" value={String(summary.totalSignups)} />
					<Stat label="XLM earned" value={`${summary.totalXlmEarned.toFixed(2)} XLM`} />
					<Stat label="Pending rewards" value={`${summary.pendingXlm.toFixed(2)} XLM`} />
				</div>

				<div className="space-y-3">
					<h3 className="text-sm font-medium text-muted-foreground">Recent referrals</h3>
					<ul className="divide-y rounded-lg border">
						{summary.referrals.map((referral) => (
							<li
								key={referral.id}
								className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3"
							>
								<div>
									<div className="font-medium">{referral.name}</div>
									<div className="text-sm text-muted-foreground">
										Joined {dateFormatter.format(new Date(referral.joinedAt))}
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant={referral.status === 'rewarded' ? 'default' : 'secondary'}>
										{statusLabels[referral.status]}
									</Badge>
									<span className="text-sm font-medium tabular-nums">
										{referral.rewardXlm > 0 ? `+${referral.rewardXlm.toFixed(2)} XLM` : '—'}
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>

				<p className="text-sm text-muted-foreground">
					Rewards are credited to your Stellar wallet once a referred friend completes their first
					health task.
				</p>
			</CardContent>
		</Card>
	);
}

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-lg border p-3">
			<div className="text-sm text-muted-foreground">{label}</div>
			<div className="text-2xl font-semibold">{value}</div>
		</div>
	);
}
