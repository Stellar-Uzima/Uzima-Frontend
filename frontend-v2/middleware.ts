import createMiddleware from 'next-intl/middleware';
import { routing } from './src/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(fr|en)/:path*']
};
