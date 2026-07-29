'use client';

import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { CountrySelect } from '@/components/profile/CountrySelect';
import { LanguageMultiSelect } from '@/components/profile/LanguageMultiSelect';
import { HealthGoals } from '@/components/profile/HealthGoals';
import { WalletPanel } from '@/components/profile/WalletPanel';
import { NotificationsPanel, NotificationsState } from '@/components/profile/NotificationsPanel';
import { ReminderScheduler } from '@/components/profile/ReminderScheduler';
import { AvatarEmojiPicker } from '@/components/profile/AvatarEmojiPicker';
import { ReferralPanel } from '@/components/profile/ReferralPanel';
import { ReferralStats } from '@/components/profile/ReferralStats';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { generateReferralCode, normalizeReferralCode } from '@/lib/referral';
import { mockReferralSummary, ReferralSummary } from '@/lib/mock/referrals';

type ProfileData = {
	avatarEmoji: string | null;
	name: string;
	country: string;
	phone: string;
	languages: string[];
	healthGoals: string[];
	walletAddress?: string | null;
	totalXlmEarned?: number;
	notifications?: NotificationsState;
	referralCode?: string | null;
};

export default function ProfilePage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const [avatarEmoji, setAvatarEmoji] = useState<string>('🙂');
	const [name, setName] = useState('');
	const [country, setCountry] = useState('');
	const [phone, setPhone] = useState('');
	const [languages, setLanguages] = useState<string[]>([]);
	const [healthGoals, setHealthGoals] = useState<string[]>([]);

	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [totalXlmEarned, setTotalXlmEarned] = useState<number>(0);

	const [referralCode, setReferralCode] = useState<string | null>(null);
	// Mock until the referrals endpoint lands — rewards are issued backend-side.
	// Swap for `emptyReferralSummary` to preview the zero-referral state.
	const referralSummary: ReferralSummary = mockReferralSummary;

	const [notifications, setNotifications] = useState<NotificationsState>({
		taskReminders: true,
		streakAlerts: true,
		newCoupons: true,
		consultationReminders: false,
		quietStart: '21:00',
		quietEnd: '07:00',
	});

	// Initial load of profile
	useEffect(() => {
		let isMounted = true;
		(async () => {
			try {
				const res = await fetch('/api/users/profile', { method: 'GET' });
				if (!res.ok) throw new Error('Failed to load profile');
				const data: ProfileData = await res.json();

				if (!isMounted) return;
				setAvatarEmoji(data.avatarEmoji || '🙂');
				setName(data.name || '');
				setCountry(data.country || '');
				setPhone(data.phone || '');
				setLanguages(data.languages || []);
				setHealthGoals(data.healthGoals || []);
				setWalletAddress(data.walletAddress ?? null);
				setTotalXlmEarned(data.totalXlmEarned ?? 0);
				setReferralCode(normalizeReferralCode(data.referralCode));
				if (data.notifications) setNotifications(data.notifications);
			} catch (e) {
				// Optional: show a toast
			} finally {
				if (isMounted) setLoading(false);
			}
		})();
		return () => {
			isMounted = false;
		};
	}, []);

	const canSave = useMemo(() => {
		return name.trim().length > 1 && country.trim().length > 0;
	}, [name, country]);

	// Fall back to a code derived from the account so the link is always shareable,
	// even before the backend issues one.
	const effectiveReferralCode = useMemo(
		() => referralCode ?? generateReferralCode(walletAddress || name || 'uzima-member'),
		[referralCode, walletAddress, name],
	);

	function focusReferralLink() {
		const input = document.getElementById('referral-link') as HTMLInputElement | null;
		input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		input?.focus();
	}

	async function onSaveProfile(e?: React.FormEvent) {
		e?.preventDefault();
		if (!canSave || saving) return;
		setSaving(true);
		try {
			const body: ProfileData = {
				avatarEmoji,
				name: name.trim(),
				country,
				phone: phone.trim(),
				languages,
				healthGoals,
				notifications,
			};
			const res = await fetch('/api/users/profile', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			if (!res.ok) throw new Error('Save failed');
			toast?.({ title: 'Profile saved' });
			router.refresh?.();
		} catch (err) {
			toast?.({ title: 'Error', description: 'Could not save profile', variant: 'error' });
		} finally {
			setSaving(false);
		}
	}

	if (loading) {
		return (
			<div className="max-w-5xl mx-auto p-4 sm:p-6">
				<div className="animate-pulse space-y-4">
					<div className="h-8 bg-muted rounded w-40" />
					<div className="h-20 bg-muted rounded" />
				</div>
			</div>
		);
	}

	return (
		<ErrorBoundary componentName="ProfilePage" variant="page">
			<div className="max-w-5xl mx-auto p-4 sm:p-6">
				<h1 className="text-2xl font-semibold tracking-tight mb-4">Your Profile</h1>
				<Tabs defaultValue="profile" className="w-full">
					<TabsList className="w-full sm:w-auto">
						<TabsTrigger value="profile" className="flex-1 sm:flex-none">Profile</TabsTrigger>
						<TabsTrigger value="wallet" className="flex-1 sm:flex-none">Wallet</TabsTrigger>
						<TabsTrigger value="referrals" className="flex-1 sm:flex-none">Referrals</TabsTrigger>
						<TabsTrigger value="notifications" className="flex-1 sm:flex-none">Notifications</TabsTrigger>
					</TabsList>

					<TabsContent value="profile" className="mt-6">
						<form onSubmit={onSaveProfile} className="grid grid-cols-1 gap-6">
							<div className="flex items-start gap-4">
								<AvatarEmojiPicker value={avatarEmoji} onChange={setAvatarEmoji} />
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
									<div className="space-y-2">
										<Label htmlFor="name">Name</Label>
										<Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="phone">Phone</Label>
										<Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 700 000 000" />
									</div>
									<div className="space-y-2">
										<Label>Country</Label>
										<CountrySelect value={country} onChange={setCountry} />
									</div>
									<div className="space-y-2">
										<Label>Languages</Label>
										<LanguageMultiSelect value={languages} onChange={setLanguages} />
									</div>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<Label>Health goals</Label>
								<HealthGoals value={healthGoals} onChange={setHealthGoals} />
							</div>

							<div className="flex justify-end gap-3 pt-2">
								<Button type="button" variant="outline" onClick={() => router.refresh?.()}>Cancel</Button>
								<Button type="submit" disabled={!canSave || saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
							</div>
						</form>
					</TabsContent>

					<TabsContent value="wallet" className="mt-6">
						<WalletPanel
							address={walletAddress}
							totalXlm={totalXlmEarned}
							onConnect={() => {
								// Navigate to connect flow if present
								window.location.href = '/wallet/connect';
							}}
							onDisconnectSuccess={() => {
								setWalletAddress(null);
							}}
						/>
					</TabsContent>

					<TabsContent value="referrals" className="mt-6">
						<div className="space-y-6">
							<ReferralPanel code={effectiveReferralCode} />
							<ReferralStats summary={referralSummary} onShare={focusReferralLink} />
						</div>
					</TabsContent>

					<TabsContent value="notifications" className="mt-6">
						<NotificationsPanel
							value={notifications}
							onChange={(next) => setNotifications(next)}
							onSave={onSaveProfile}
							saving={saving}
						/>
						<ReminderScheduler
							categoryEnabled={notifications.taskReminders}
							onEnableCategory={() => setNotifications({ ...notifications, taskReminders: true })}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</ErrorBoundary>
	);
}

