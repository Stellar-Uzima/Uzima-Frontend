import { useTranslations } from "next-intl"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrustedBy } from "@/components/trusted-by"
import { ForProfessionals } from "@/components/for-professionals"
import { ForPatients } from "@/components/for-patients"
import { HowItWorks } from "@/components/how-it-works"
import { WaitlistCTA } from "@/components/waitlist-cta"
import { ProductSections } from "@/components/product-sections"
import { SafeSecure } from "@/components/safe-secure"
import { WhyStellarUzima } from "@/components/why-stellar-uzima"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { LatestNews } from "@/components/latest-news"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"


export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      {/* 
        Ideally we would pass props like:
        <Hero title={t('title')} description={t('description')} /> 
        But for now just keeping it rendering to ensure i18n context works.
        I will need to refactor Hero to accept these props or useTranslations inside it.
        Given "Wrap with NextIntlClientProvider" in the prompt, using useTranslations inside components is cleaner.
      */}
      <TrustedBy />
      <ForProfessionals />
      <ForPatients />
      <HowItWorks />
      <WaitlistCTA />
      <ProductSections />
      <SafeSecure />
      <WhyStellarUzima />
      <Testimonials />
      <FAQ />
      <LatestNews />
      <ContactForm />
      <Footer />
    </main>
  )
}
