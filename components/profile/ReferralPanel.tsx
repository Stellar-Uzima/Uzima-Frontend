'use client';

import * as React from 'react';
import { Check, Copy, MessageCircle, Send, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { buildReferralLink, buildShareTargets, getShareMessage } from '@/lib/referral';

interface ReferralPanelProps {
	code: string;
	/** Overrides the origin used to build the link — mainly useful for tests. */
	origin?: string;
}

export function ReferralPanel({ code, origin }: ReferralPanelProps) {
	const [copied, setCopied] = React.useState(false);
	const [canNativeShare, setCanNativeShare] = React.useState(false);

	// The link needs window.location.origin, which only exists after hydration.
	const [link, setLink] = React.useState(() => buildReferralLink(code, origin));

	React.useEffect(() => {
		setLink(buildReferralLink(code, origin));
		setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
	}, [code, origin]);

	React.useEffect(() => {
		if (!copied) return;
		const timeout = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(timeout);
	}, [copied]);

	const shareTargets = React.useMemo(() => buildShareTargets(link), [link]);

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
			toast?.({ title: 'Copied', description: 'Referral link copied to clipboard' });
		} catch {
			toast?.({ title: 'Error', description: 'Could not copy the link', variant: 'error' });
		}
	}

	async function nativeShare() {
		try {
			await navigator.share({
				title: 'Stellar Uzima',
				text: getShareMessage(),
				url: link,
			});
		} catch {
			// The user dismissing the share sheet throws too — nothing to report.
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Invite friends, earn XLM</CardTitle>
				<CardDescription>
					Share your link — you both earn XLM rewards once they join and complete their first
					health task.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="referral-code">Your referral code</Label>
					<div className="font-mono text-2xl font-semibold tracking-widest" id="referral-code">
						{code}
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="referral-link">Your referral link</Label>
					<div className="flex flex-col sm:flex-row gap-2">
						<Input
							id="referral-link"
							value={link}
							readOnly
							onFocus={(e) => e.currentTarget.select()}
							className="font-mono text-sm"
						/>
						<Button type="button" onClick={copyLink} className="sm:w-32 shrink-0">
							{copied ? (
								<>
									<Check className="h-4 w-4 mr-2" aria-hidden="true" /> Copied
								</>
							) : (
								<>
									<Copy className="h-4 w-4 mr-2" aria-hidden="true" /> Copy
								</>
							)}
						</Button>
					</div>
					<p className="text-sm text-muted-foreground">
						Anyone landing on the sign-up page through this link is attributed to you.
					</p>
				</div>

				<div className="flex flex-wrap gap-2 pt-2">
					<Button asChild type="button" variant="outline">
						<a
							href={shareTargets.whatsapp}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Share referral link on WhatsApp"
						>
							<MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" /> WhatsApp
						</a>
					</Button>
					<Button asChild type="button" variant="outline">
						<a
							href={shareTargets.telegram}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Share referral link on Telegram"
						>
							<Send className="h-4 w-4 mr-2" aria-hidden="true" /> Telegram
						</a>
					</Button>
					{canNativeShare && (
						<Button type="button" variant="outline" onClick={nativeShare}>
							<Share2 className="h-4 w-4 mr-2" aria-hidden="true" /> More
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
