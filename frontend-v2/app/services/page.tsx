"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WaitlistCTA } from "@/components/waitlist-cta"
import Image from "next/image"
import { useState, useEffect } from "react"

const services = [
  {
    title: "Share & Earn with Healthcare Knowledge",
    description:
      "Stay rewarded for sharing quality healthcare knowledge with Stellar Uzima's blockchain-powered platform. Create articles, answer questions, and provide consultations to earn XLM tokens. Our peer review system ensures quality content gets better rewards.",
    images: ["/images/hero-doctor.jpg", "/images/professional-telehealth.jpg"],
    align: "right",
  },
  {
    title: "Access Verified Healthcare Information",
    description:
      "Your trusted source for reliable healthcare knowledge is here! Access peer-reviewed articles, expert insights, and evidence-based health information. All content is verified by qualified medical professionals to ensure accuracy and safety.",
    images: ["/images/hero-nurse.jpg", "/images/news-2.jpg"],
    align: "left",
  },
  {
    title: "Connect with Healthcare Professionals",
    description:
      "Grow your practice or connect with healthcare providers. Schedule consultations, access expert advice, and manage your healthcare journey effortlessly - all through Stellar Uzima's secure and user-friendly blockchain platform.",
    images: ["/images/father-child.jpg", "/images/hero-patient.jpg"],
    align: "right",
  },
  {
    title: "Convert XLM to USDT Seamlessly",
    description:
      "Turn your earned XLM tokens into USDT or other currencies. Stellar Uzima offers integrated exchange features with competitive rates, making it easy to monetize your healthcare knowledge contributions.",
    images: ["/images/blockchain-rewards.jpg", "/images/health-tech.jpg"],
    align: "left",
  },
  {
    title: "White-Label Healthcare Platform",
    description:
      "Build your own healthcare knowledge platform with Stellar Uzima's white-label solution. Whether you're a provider, hospital, or healthcare organization, our customizable solutions give you the tools to deliver your own branded healthcare experience.",
    images: ["/images/news-3.jpg", "/images/news-1.jpg"],
    align: "right",
  },
]

function AnimatedServiceImage({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[3/2]">
      {images.map((image, index) => (
        <Image
          key={image}
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-all duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentImage ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.25_0.03_250)] mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            Our <span className="text-[oklch(0.65_0.15_175)]">Services</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            Discover how Stellar Uzima empowers African healthcare knowledge sharing while
            rewarding quality contributions with XLM tokens.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  service.align === "left" ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className={service.align === "left" ? "lg:order-2" : "lg:order-1"}>
                  <AnimatedServiceImage images={service.images} title={service.title} />
                </div>

                {/* Content */}
                <div className={`space-y-6 ${service.align === "left" ? "lg:order-1" : "lg:order-2"}`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-[oklch(0.25_0.03_250)]">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaitlistCTA />
      <Footer />
    </main>
  )
}
