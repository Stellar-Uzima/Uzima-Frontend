export const locales = ["en", "fr", "sw"] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = "en";