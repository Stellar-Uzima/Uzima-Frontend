# 🚀 Quick Start - PWA Implementation

## What I've Built

✅ Complete PWA support for Stellar Uzima
✅ Offline task submission with IndexedDB queue
✅ Auto-sync when connection restored
✅ Install prompts for mobile and desktop
✅ Offline banner notifications
✅ Fallback offline page

## Immediate Next Steps

### 1️⃣ Install Dependencies (REQUIRED)

Your PowerShell has script execution disabled. Use one of these methods:

**Option A: Run as Administrator**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
npm install
```

**Option B: Use npx**
```powershell
npx npm install
```

**Option C: Use Node directly**
```powershell
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install
```

This will install `@ducanh2912/next-pwa` which is required for PWA functionality.

### 2️⃣ Replace Icon Placeholders (REQUIRED)

I've created placeholder icons, but you need actual PNG files:

**Create these files in `/public`:**
- `icon-192x192.png` (192×192 pixels)
- `icon-512x512.png` (512×512 pixels)
- `apple-icon.png` (180×180 pixels)

**Quick way:** Use [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- Upload your logo
- Download all sizes
- Place in `/public` folder

### 3️⃣ Test the Build

```bash
npm run build
npm start
```

Visit `http://localhost:3000` and check:
- ✅ No build errors
- ✅ Service worker registers (check DevTools → Application)
- ✅ Manifest loads (check DevTools → Application → Manifest)

### 4️⃣ Test Offline Mode

1. Open `http://localhost:3000/contribute/task`
2. Open DevTools (F12)
3. Go to Network tab → Throttling → Offline
4. Try submitting a task
5. You should see yellow "offline" banner
6. Re-enable network
7. Task should auto-sync (check console)

### 5️⃣ Test Install Prompt

**Desktop:**
1. Visit site twice (clear cookies between visits)
2. Install prompt should appear bottom-right
3. OR click "Install App" in navbar

**Mobile:**
1. Open in Chrome (Android) or Safari (iOS)
2. Install banner should appear
3. Follow prompts to install

## Files You Can Customize

### Manifest (`public/manifest.json`)
- Change app name, description
- Update theme colors
- Add more shortcuts

### Offline Page (`app/offline/page.tsx`)
- Customize messaging
- Add your branding
- Modify layout

### Install Prompt (`components/pwa/InstallPrompt.tsx`)
- Change prompt timing (currently 2+ visits)
- Customize appearance
- Modify messaging

## Common Issues & Fixes

### "npm" not recognized
- Use full path: `"C:\Program Files\nodejs\npm.cmd" install`
- Or restart terminal after Node.js install

### Service worker not registering
- Must use HTTPS (or localhost)
- Clear browser cache (Ctrl+Shift+Delete)
- Check for JavaScript errors in console

### Install prompt not showing
- Clear site data (DevTools → Application → Clear Storage)
- Visit site 2+ times
- Wait 3 seconds after page load

### Icons not loading
- Check files exist in `/public`
- Must be PNG format (not HTML placeholders)
- Check browser console for 404 errors

## Testing Checklist

Before submitting PR:
- [ ] Dependencies installed (`npm install` succeeded)
- [ ] Real PNG icons created
- [ ] Build completes without errors
- [ ] App installable on mobile/desktop
- [ ] Offline banner works
- [ ] Tasks queue when offline
- [ ] Tasks sync when back online
- [ ] Lighthouse PWA score 90+

## Where to Get Help

📖 **Full Documentation:** See `PWA_SETUP.md`
📋 **Implementation Details:** See `PWA_IMPLEMENTATION_SUMMARY.md`
🔧 **Troubleshooting:** Check browser console for errors

## API Integration (Later)

When your backend is ready, update these two files:

1. `lib/offline-queue.ts` (line ~118)
2. `app/contribute/task/page.tsx` (line ~83)

Replace `/api/tasks/submit` with your actual endpoint.

---

## Current Status

✅ **All code implemented**
⏳ **Waiting for:** npm install + real icons
🎯 **Goal:** Lighthouse 90+ PWA score

**Time to complete remaining steps:** ~15 minutes

Need help? Check the errors in your terminal and browser console!
