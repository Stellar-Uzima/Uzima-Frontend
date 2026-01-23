import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrustedBy } from "@/components/trusted-by"
import { ForProfessionals } from "@/components/for-professionals"
import { ForPatients } from "@/components/for-patients"
import { HowItWorks } from "@/components/how-it-works"
import WaitlistSection from "@/components/sections/WaitlistSection"
import { ProductSections } from "@/components/product-sections"
import { SafeSecure } from "@/components/safe-secure"
import { WhyStellarUzima } from "@/components/why-stellar-uzima"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { LatestNews } from "@/components/latest-news"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustedBy />
      <ForProfessionals />
      <ForPatients />
      <HowItWorks />
      <WaitlistSection />
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
