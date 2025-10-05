This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# 🏥 Stellar Uzima Frontend

> **Ubuntu Healthcare for Africa** - Bridging traditional healing with modern medicine through blockchain technology

## 🌍 Overview

Stellar Uzima is a comprehensive healthcare platform designed specifically for African communities. It combines the wisdom of traditional healing practices with modern medical knowledge, powered by blockchain technology for transparency and accessibility.

### Key Features

- **🩺 Telemedicine**: Connect with healthcare professionals across Africa
- **🌿 Traditional Medicine Integration**: Respectful integration of ancestral healing wisdom
- **📱 Offline-First Design**: Works even with limited internet connectivity
- **🏥 Medical Records**: Secure, portable health records that work offline
- **📚 Health Education**: Culturally relevant courses from African experts
- **💰 Blockchain Rewards**: Earn Stellar (XLM) tokens for sharing knowledge
- **🗣️ Multilingual Support**: Available in major African languages
- **🤝 Community-Driven**: Built with Ubuntu philosophy - "I am because we are"

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/stellar-uzima-frontend.git
cd stellar-uzima-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Environment Setup

Environment variables are used to configure various aspects of the application.
Sensitive variables (without the `NEXT_PUBLIC_` prefix) are only accessible on the server, while variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

To set up your environment variables, create a `.env.local` file in the root of the project.
You can use the `.env.example` file as a reference for the required variables:

```bash
cp .env.example .env.local
```

Then, open `.env.local` and fill in the appropriate values.

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **State Management**: React Query + Context
- **Offline Support**: Service Workers + IndexedDB
- **Icons**: Lucide React

### Project Structure

```
stellar-uzima-frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── telemedicine/      # Video consultation features
│   ├── traditional-medicine/ # Traditional healing integration
│   ├── medical-records/   # Offline-first health records
│   ├── education/         # Health education platform
│   └── create/           # Content creation tools
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Navigation, footer, etc.
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🌟 Features Deep Dive

### 1. Telemedicine Platform

- **Video Consultations**: High-quality video calls optimized for low bandwidth
- **Multi-language Support**: Consultations in local African languages
- **Offline Scheduling**: Book appointments even when offline
- **Emergency Services**: Quick access to emergency medical help

### 2. Traditional Medicine Integration

- **Cultural Respect**: Honors traditional healing practices and protocols
- **Knowledge Sharing**: Platform for traditional healers to share wisdom
- **Modern Integration**: Bridges traditional and modern medical approaches
- **Safety Guidelines**: Evidence-based safety information for traditional remedies

### 3. Offline-First Medical Records

- **Sync When Available**: Automatically syncs when internet is available
- **Local Storage**: Secure local storage using IndexedDB
- **Data Portability**: Export/import medical records
- **Privacy First**: End-to-end encryption for sensitive data

### 4. Health Education

- **African Experts**: Courses taught by African healthcare professionals
- **Cultural Context**: Education that respects local customs and practices
- **Offline Learning**: Download courses for offline access
- **Certification**: Earn certificates for completed courses

### 5. Blockchain Integration

- **Stellar Network**: Built on Stellar blockchain for fast, low-cost transactions
- **XLM Rewards**: Earn Stellar Lumens for contributing quality content
- **Transparent Governance**: Community-driven platform decisions
- **Micropayments**: Support for small payments to healthcare providers

## 🎨 Design Philosophy

### Ubuntu Principles

The platform is built on the African philosophy of Ubuntu - "I am because we are":

- **Community First**: Features designed to strengthen healthcare communities
- **Collective Knowledge**: Shared wisdom benefits everyone
- **Inclusive Design**: Accessible to users with varying technical skills
- **Cultural Sensitivity**: Respects diverse African cultures and traditions

### Accessibility

- **WCAG 2.1 AA Compliance**: Meets international accessibility standards
- **Screen Reader Support**: Full compatibility with assistive technologies
- **Keyboard Navigation**: Complete keyboard accessibility
- **High Contrast Mode**: Support for users with visual impairments
- **Reduced Motion**: Respects user preferences for reduced animations

### Responsive Design

- **Mobile First**: Optimized for mobile devices common in Africa
- **Progressive Enhancement**: Works on older devices and browsers
- **Bandwidth Optimization**: Efficient loading for slow connections
- **Offline Capability**: Core features work without internet

## 🌐 Internationalization

### Supported Languages

- **English**: Primary language
- **French**: West and Central Africa
- **Arabic**: North Africa
- **Swahili**: East Africa
- **Hausa**: West Africa
- **Yoruba**: Nigeria
- **Igbo**: Nigeria
- **Amharic**: Ethiopia
- **Zulu**: Southern Africa
- **Xhosa**: Southern Africa
- **Bambara**: Mali
- **Twi**: Ghana

### Cultural Adaptations

- **Regional Content**: Localized health information
- **Cultural Protocols**: Respects traditional healing customs
- **Local Expertise**: Features local healthcare professionals
- **Community Guidelines**: Culturally appropriate interaction guidelines

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Code Quality

- **ESLint**: Enforces code quality and consistency
- **Prettier**: Automatic code formatting
- **TypeScript**: Type safety and better developer experience
- **Husky**: Git hooks for pre-commit checks
- **Conventional Commits**: Standardized commit messages

### Performance Optimization

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Analysis**: Regular bundle size monitoring
- **Lighthouse Scores**: Maintains high performance scores
- **Core Web Vitals**: Optimized for Google's Core Web Vitals

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npm run build
vercel --prod
```

### Docker

```bash
# Build Docker image
docker build -t stellar-uzima-frontend .

# Run container
docker run -p 3000:3000 stellar-uzima-frontend
```

### Environment Variables

Production environment variables should be configured directly in your deployment environment (e.g., Vercel, Docker). Refer to `.env.example` for a list of required variables.

## 🤝 Contributing

We welcome contributions from the African tech community and global supporters of African healthcare!

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow our coding standards
4. **Test thoroughly**: Ensure all tests pass
5. **Submit a pull request**: Describe your changes clearly

### Contribution Guidelines

- **Cultural Sensitivity**: Ensure contributions respect African cultures
- **Accessibility**: Maintain accessibility standards
- **Performance**: Consider users with limited bandwidth
- **Documentation**: Update documentation for new features
- **Testing**: Include tests for new functionality

### Code of Conduct

We follow the Ubuntu Code of Conduct:
- **Respect**: Treat all community members with respect
- **Inclusion**: Welcome contributors from all backgrounds
- **Collaboration**: Work together for the common good
- **Integrity**: Be honest and transparent in all interactions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **African Healthcare Workers**: For their dedication and inspiration
- **Traditional Healers**: For sharing their ancestral wisdom
- **Open Source Community**: For the tools and libraries that make this possible
- **Stellar Development Foundation**: For blockchain infrastructure
- **African Tech Communities**: For feedback and support

## 📞 Support

- **Documentation**: [docs.stellaruzima.com](https://docs.stellaruzima.com)
- **Community Forum**: [community.stellaruzima.com](https://community.stellaruzima.com)
- **Email**: support@stellaruzima.com
- **Twitter**: [@StellarUzima](https://twitter.com/StellarUzima)

---

**Ubuntu** - *"I am because we are"* 🌍

Built with ❤️ for African healthcare communities