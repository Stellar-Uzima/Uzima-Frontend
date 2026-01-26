Stellar Uzima Healthcare Platform
🚀 MIGRATION IN PROGRESS TO V2!

We're upgrading to a completely new architecture for Drip Open Source. See MIGRATION-V2.md for details.

🎯 About Stellar Uzima A healthcare knowledge-sharing platform that rewards users with Stellar (XLM) tokens for quality medical content.

🛠️ Tech Stack (V2)
Framework: Next.js 14+ (App Router)

Internationalization: next-intl

Language: TypeScript

Styling: Tailwind CSS

UI Components: shadcn/ui

Blockchain: Stellar SDK

Optimization: Bundle Analyzer included for performance tracking.

📂 Project Structure (V2 Highlights)
The V2 migration introduces several key architectural improvements:

i18n.ts: Centralized configuration for multi-language support.

Strict Security: Enhanced CSP and Permissions policies to protect medical data.

Performance: Optimized for African internet conditions with Gzip compression and standalone output.

🚀 Quick Start (V2)
Clone & Navigate

Bash

git clone https://github.com/Stellar-Uzima/Uzima-Frontend.git
cd Uzima-Frontend
git checkout v2-redesign
cd frontend-v2
Environment Setup

Bash

cp .env.example .env.local
Installation & Development

Bash

npm install
npm run dev
Open http://localhost:3000 to view the app.

Analyze Bundle (Optional) To check performance and bundle sizes:

Bash

ANALYZE=true npm run build
🔒 Security & Performance Features
We have implemented a "Security-First" configuration in the Next.js core:

Content Security Policy (CSP): Strict rules to prevent XSS and data injection.

HSTS: Enforced HTTPS for secure communication.

Privacy-Focused: Browser features like camera, microphone, and geolocation are disabled by default via Permissions-Policy.

Optimized Images: Support for remote medical imagery with built-in SVG protection.

🤝 Contributing & Support
Need Help?
If you're stuck on the V2 migration or setting up the internationalization (next-intl), here is how to get help:

Check the Docs: Review MIGRATION-V2.md.

i18n Setup: Ensure your locale files in messages/ match the configuration in i18n.ts.

Open an Issue: Tag it with v2-redesign for a quicker response from the core team.

Development Workflow
Fork the repository.

Create a feature branch from v2-redesign.

Make your changes in frontend-v2/.

Note: We currently ignore ESLint and TypeScript errors during builds to facilitate rapid migration development, but please try to fix errors locally!

Submit a pull request.

📊 Project Status
✅ V1 Completed (Hacktoberfest)

✅ V1 Archived

🔄 V2 In Development (Internationalization & Security focus) ⏳ V2 Testing Phase

⏳ Full Migration