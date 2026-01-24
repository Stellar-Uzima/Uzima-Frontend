"use client"

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../src/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <label className="border-2 rounded border-gray-300">
            <p className="sr-only">Change language</p>
            <select
                defaultValue={locale}
                className="bg-transparent py-2 pl-2 pr-6"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="en">🇺🇸 English</option>
                <option value="fr">🇫🇷 Français</option>
            </select>
        </label>
    );
}
