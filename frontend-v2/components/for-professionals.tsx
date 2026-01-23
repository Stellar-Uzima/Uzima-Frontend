"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

const features = [
  {
    color: "teal",
    title: "Earn XLM Tokens",
    description: "Get rewarded with Stellar Lumens for sharing quality healthcare knowledge",
  },
  {
    color: "gold",
    title: "Global Collaboration",
    description: "Connect with healthcare professionals worldwide and share expertise",
  },
  {
    color: "pink",
    title: "Quality Content",
    description: "Create and curate high-quality medical content that helps patients",
  },
  {
    color: "red",
    title: "Peer Reviews",
    description: "Build reputation through peer validation and community feedback",
  },
  {
    color: "amber",
    title: "Convert to USDT",
    description: "Easily convert your XLM earnings to USDT or other currencies",
  },
  {
    color: "emerald",
    title: "Online Consultations",
    description: "Offer paid consultations and expand your patient reach globally",
  },
]

const colorMap: Record<string, string> = {
  teal: "bg-[oklch(0.65_0.15_175)]",
  gold: "bg-[oklch(0.75_0.15_85)]",
  pink: "bg-pink-400",
  red: "bg-red-400",
  amber: "bg-amber-400",
  emerald: "bg-emerald-400",
}

const professionalImages = [
  {
    src: "/images/professional-telehealth.jpg",
    alt: "Healthcare professional on telehealth call",
  },
  {
    src: "/images/hero-doctor.jpg",
    alt: "African doctor with tablet",
  },
  {
    src: "/images/hero-nurse.jpg",
    alt: "African nurse professional",
  },
]

export function ForProfessionals() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % professionalImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-[oklch(0.25_0.03_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
              For Medical Professionals
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="space-y-3 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-4 h-4 rounded ${colorMap[feature.color]}`} />
                  <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
            <Button className="mt-10 bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full px-8 py-6">
              Get Started
            </Button>
          </div>

          {/* Right Image with Animation */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] relative">
              {professionalImages.map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-all duration-1000 ease-in-out ${index === currentImage
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                    }`}
                />
              ))}
            </div>
            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {professionalImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImage
                    ? "bg-[oklch(0.65_0.15_175)] w-6"
                    : "bg-white/60 hover:bg-white"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            {/* Decorative dots pattern */}
            <div className="absolute -left-8 top-1/4 grid grid-cols-6 gap-2">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[oklch(0.65_0.15_175)]/30" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
