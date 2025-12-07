import {defineRouting} from "next-intl/routing";
import { getRequestConfig } from 'next-intl/server';

export const locales = ["en", "fr", "sw"] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = "en";

export type Messages = Record<string, unknown>;

export function isSupportedLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const routing = defineRouting({
  locales,
  defaultLocale,
});

export default getRequestConfig(async ({ locale }) => {
    locale = locale || defaultLocale;

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});