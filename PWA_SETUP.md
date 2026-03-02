# PWA Implementation Guide for Stellar Uzima

## Overview
This document provides instructions for completing the PWA setup for Stellar Uzima.

## What Has Been Implemented

### 1. **Core PWA Infrastructure**
- ✅ `next-pwa` integration in `next.config.mjs`
- ✅ App manifest at `public/manifest.json`
- ✅ PWA meta tags in `app/layout.tsx`
- ✅ Offline fallback page at `app/offline/page.tsx`

### 2. **Offline Support Components**
- ✅ `OfflineBanner` - Shows connection status
- ✅ `InstallPrompt` - Prompts users to install the app
- ✅ Offline task queue using IndexedDB
- ✅ Background sync manager

### 3. **Task Submission Integration**
- ✅ Offline queueing in `/contribute/task` page
- ✅ Automatic sync when connection restored
- ✅ Status indicators for offline mode

## Remaining Setup Steps

### Step 1: Install Dependencies
Run the following command to install the PWA package:

\`\`\`bash
npm install @ducanh2912/next-pwa
\`\`\`

OR if using pnpm:

\`\`\`bash
pnpm add @ducanh2912/next-pwa
\`\`\`

### Step 2: Generate App Icons
You need to create actual PNG icons. The current placeholders need to be replaced:

1. **Create a 512x512 source icon** with your Uzima logo
2. **Generate required sizes:**
   - `icon-192x192.png` (192x192)
   - `icon-512x512.png` (512x512)
   - `apple-icon.png` (180x180 for iOS)
   - `icon-light-32x32.png` (32x32 for favicon)
   - `icon-dark-32x32.png` (32x32 for dark mode favicon)

**Tools to generate icons:**
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

### Step 3: Add Screenshots (Optional but Recommended)
For better PWA install experience, add screenshots:
- `public/screenshot-mobile.png` (540x720)
- `public/screenshot-desktop.png` (1280x720)

### Step 4: Build and Test
Run the production build:

\`\`\`bash
npm run build
npm start
\`\`\`

### Step 5: Verify PWA Configuration

#### Using Chrome DevTools:
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App" category
4. Click "Generate report"
5. **Target score: 90+**

#### Check Manifest:
1. DevTools → Application → Manifest
2. Verify all fields are correct
3. Check icons are loading

#### Test Service Worker:
1. DevTools → Application → Service Workers
2. Verify service worker is registered
3. Test offline mode (Network tab → Offline)

### Step 6: Test Offline Functionality

1. **Go to `/contribute/task`**
2. **Enable offline mode** in DevTools
3. **Submit a task** - should show offline indicator
4. **Re-enable network** - task should auto-sync
5. **Check console** for sync logs

### Step 7: Test Install Prompt

**On Desktop (Chrome/Edge):**
1. Visit site 2+ times
2. Install prompt should appear in bottom right
3. Click "Install App"
4. App should install and open in standalone window

**On Mobile (Android):**
1. Visit site in Chrome
2. "Add to Home Screen" banner should appear
3. Install the app
4. Test offline functionality

**On iOS:**
1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Test app in standalone mode

## Testing Checklist

- [ ] Dependencies installed successfully
- [ ] App icons generated and placed in `/public`
- [ ] Build completes without errors
- [ ] Lighthouse PWA score is 90+
- [ ] Manifest is valid and loads correctly
- [ ] Service worker registers successfully
- [ ] Offline fallback page displays when uncached route is requested offline
- [ ] Task page loads offline (with cached data)
- [ ] Tasks submitted offline are queued in IndexedDB
- [ ] Tasks sync automatically when connection restored
- [ ] Offline banner appears/disappears correctly
- [ ] Install prompt appears after 2+ visits
- [ ] App installs successfully on Android/Chrome
- [ ] App installs successfully on iOS/Safari
- [ ] App works in standalone mode

## API Integration (Future Step)

The offline queue is ready but needs API endpoint integration. Update:

\`\`\`typescript
// In lib/offline-queue.ts, line ~118
const syncResponse = await fetch('/api/tasks/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(task.data),
});
\`\`\`

Replace `/api/tasks/submit` with your actual task submission endpoint.

Similarly in `app/contribute/task/page.tsx`, uncomment and configure the actual API call.

## Troubleshooting

### Service Worker Not Registering
- Check console for errors
- Ensure HTTPS (required for PWA, localhost is exempt)
- Clear cache and hard reload (Ctrl+Shift+R)

### Install Prompt Not Showing
- Clear site data (DevTools → Application → Clear storage)
- Visit site multiple times (2+ required)
- Check `beforeinstallprompt` event fires in console

### Offline Mode Not Working
- Verify service worker is active
- Check Network tab shows service worker handling requests
- Ensure pages were visited while online first (for caching)

### Icons Not Loading
- Check icon paths in manifest.json
- Verify files exist in `/public` directory
- Check browser console for 404 errors

## Performance Optimization

The current configuration includes:
- **Cache-first** strategy for images and static assets
- **Network-first** strategy for API calls and pages
- Automatic cache expiration
- Background sync for offline tasks

## Browser Support

- ✅ Chrome/Edge (Android & Desktop) - Full support
- ✅ Safari (iOS 16.4+) - Full support
- ✅ Firefox (Desktop) - Partial support (no install prompt)
- ⚠️ Safari (iOS < 16.4) - Limited support

## Resources

- [Next PWA Documentation](https://ducanh-next-pwa.vercel.app/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

## Support

For issues or questions about the PWA implementation, check:
1. Browser console for errors
2. Next.js build output
3. Lighthouse audit results
