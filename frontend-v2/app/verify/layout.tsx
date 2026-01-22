import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Verification - Stellar Uzima',
  description:
    'Apply for professional verification to unlock enhanced features and build trust with patients on Stellar Uzima healthcare platform.',
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
