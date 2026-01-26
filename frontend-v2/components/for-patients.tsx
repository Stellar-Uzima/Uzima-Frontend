"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

const features = [
  {
    color: "teal",
    title: "Access Knowledge",
    description: "Get reliable healthcare information from verified medical professionals, 24/7.",
  },
  {
    color: "gold",
    title: "Earn by Learning",
    description: "Earn XLM tokens by engaging with quality content and helping others",
  },
  {
    color: "pink",
    title: "Connect with Specialists",
    description: "Access a global pool of healthcare specialists for consultations",
  },
  {
    color: "red",
    title: "Manage Conditions",
    description: "Get support for managing chronic conditions like diabetes and hypertension",
  },
  {
    color: "amber",
    title: "Health Tracking",
    description: "Track your health journey and share progress with your care team",
  },
  {
    color: "emerald",
    title: "Portable Records",
    description: "Access your health records and consultation history anytime, anywhere",
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

const patientImages = [
  {
    src: "/images/father-child.jpg",
    alt: "African father with child",
  },
  {
    src: "/images/hero-patient.jpg",
    alt: "African patient using health app",
  },
  {
    src: "/images/health-tech.jpg",
    alt: "Person using health tracking device",
  },
]

export function ForPatients() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % patientImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image with Animation */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] relative">
              {patientImages.map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-all duration-1000 ease-in-out ${index === currentImage
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                    }`}
                />
              ))}
            </div>
            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {patientImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImage
                    ? "bg-[oklch(0.65_0.15_175)] w-6"
                    : "bg-gray-400/60 hover:bg-gray-600"
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

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.03_250)] mb-12">
              For Patients
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="space-y-3 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-4 h-4 rounded ${colorMap[feature.color]}`} />
                  <h3 className="text-[oklch(0.25_0.03_250)] font-semibold text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            <Button className="mt-10 bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full px-8 py-6">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
