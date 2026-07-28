import dynamic from "next/dynamic";
import type { Metadata } from "next";

import SignUpLeftPanel from "@/components/signup/SignUpLeftPanel";
import { REFERRAL_QUERY_PARAM, normalizeReferralCode } from "@/lib/referral";

const SignUpForm = dynamic(() => import("@/components/signup/SignUpForm"), {
  loading: () => <div className="h-[560px] w-full max-w-lg rounded-2xl bg-white/70" aria-hidden="true" />,
});

export const metadata: Metadata = {
  title: "Create Account — Stellar Uzima",
  description:
    "Join 25,000+ Africans earning XLM rewards for health, wealth, and community. Sign up free today.",
};

type SignUpPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  // Referral attribution arrives as ?ref=CODE on the shared link.
  const params = await searchParams;
  const rawRef = params?.[REFERRAL_QUERY_PARAM];
  const referralCode = normalizeReferralCode(Array.isArray(rawRef) ? rawRef[0] : rawRef);

  return (
    <main className="min-h-screen bg-white flex items-stretch">
      <div className="w-full lg:grid lg:grid-cols-[40%_60%]">
        <aside
          aria-label="Stellar Uzima brand information"
          className="hidden lg:block lg:sticky lg:top-0 lg:h-screen"
        >
          <SignUpLeftPanel />
        </aside>

        <section
          aria-label="Sign up form"
          className="flex items-center justify-center min-h-screen bg-cream px-6 py-12 sm:px-10 lg:px-16"
        >
          <SignUpForm initialReferralCode={referralCode} />
        </section>
      </div>
    </main>
  );
}
