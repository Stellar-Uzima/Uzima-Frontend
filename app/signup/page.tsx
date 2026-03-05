import type { Metadata } from "next";
import SignUpLeftPanel from "@/components/signup/SignUpLeftPanel";
import SignUpForm from "@/components/signup/SignUpForm";

export const metadata: Metadata = {
  title: "Create Account — Stellar Uzima",
  description:
    "Join 25,000+ Africans earning XLM rewards for health, wealth, and community. Sign up free today.",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-white flex items-stretch">
      <div className="w-full lg:grid lg:grid-cols-[40%_60%]">
        {/* ── LEFT PANEL — desktop only */}

        <aside
          aria-label="Stellar Uzima brand information"
          className="hidden lg:block lg:sticky lg:top-0 lg:h-screen"
        >
          <SignUpLeftPanel />
        </aside>

        {/* ── FORM PANEL — full screen on mobile, right 60% on desktop  */}
        <section
          aria-label="Sign up form"
          className="flex items-center justify-center min-h-screen bg-cream  px-6 py-12 sm:px-10 lg:px-16"
        >
          <SignUpForm />
        </section>
      </div>
    </main>
  );
}
