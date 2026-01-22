"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

const healthKnowledgeImages = [
  { src: "/images/health-products.jpg", alt: "African woman with health products" },
  { src: "/images/hero-patient.jpg", alt: "Patient using health app" },
]

const blockchainImages = [
  { src: "/images/blockchain-rewards.jpg", alt: "Person viewing crypto wallet" },
  { src: "/images/health-tech.jpg", alt: "Health tracking technology" },
]

const whitelabelImages = [
  { src: "/images/professional-telehealth.jpg", alt: "Telehealth professional" },
  { src: "/images/hero-doctor.jpg", alt: "Doctor using technology" },
]

function AnimatedImageSection({
  images,
  className = "",
}: {
  images: { src: string; alt: string }[]
  className?: string
}) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${className}`}>
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className={`object-cover transition-all duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}
      {/* Subtle indicator */}
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

export function ProductSections() {
  return (
    <>
      {/* Health Products Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <AnimatedImageSection images={healthKnowledgeImages} />

            {/* Right Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.03_250)]">
                Variety of <span className="text-[oklch(0.65_0.15_175)]">healthcare</span>{" "}
                <span className="text-[oklch(0.75_0.15_85)]">knowledge</span> at your fingertips
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Access various healthcare articles, guides, and resources for health management and
                wellness including expert consultations.
              </p>
              <Button className="bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full px-8 py-6">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Health Tech Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.03_250)]">
                Access to top quality <span className="text-[oklch(0.65_0.15_175)]">blockchain-</span>
                <span className="text-[oklch(0.75_0.15_85)]">powered</span> healthcare
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Healthcare knowledge sharing powered by Stellar blockchain - earn XLM tokens for
                quality contributions and access verified healthcare information from professionals
                worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full px-8 py-6">
                  Earn XLM
                </Button>
                <Button className="bg-[oklch(0.25_0.03_250)] hover:bg-[oklch(0.2_0.03_250)] text-white rounded-full px-8 py-6">
                  See Doctors
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <AnimatedImageSection images={blockchainImages} className="order-1 lg:order-2" />
          </div>
        </div>
      </section>

      {/* White Label Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <AnimatedImageSection images={whitelabelImages} />

            {/* Right Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.03_250)]">
                We also offer <span className="text-[oklch(0.65_0.15_175)]">white-label</span> for
                our platform
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Contact us if you are interested in using our blockchain-powered healthcare knowledge
                sharing solution for your clinic or organization.
              </p>
              <Button className="bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full px-8 py-6">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
