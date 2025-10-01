import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'sw'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Prefix the default locale
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|sw|en)/:path*']
};