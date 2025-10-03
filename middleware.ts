import createIntlMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n';

export default createIntlMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};