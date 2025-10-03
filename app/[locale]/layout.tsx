import type React from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const {locale} = params;
  if (!locales.includes(locale as any)) notFound();

  let messages: Record<string, any> | undefined;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (e) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}