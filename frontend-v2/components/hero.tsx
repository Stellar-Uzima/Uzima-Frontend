"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react" 

const heroImages = [
  {
    src: "/images/hero-doctor.jpg",
    alt: "African doctor using tablet",
  },
  {
    src: "/images/hero-nurse.jpg",
    alt: "African nurse with clipboard",
  },
  {
    src: "/images/hero-patient.jpg",
    alt: "African patient using health app",
  },
]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPending) {
      timer = setTimeout(() => setShowSpinner(true), 500)
    } else {
      setShowSpinner(false)
    }
    return () => clearTimeout(timer)
  }, [isPending])

  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.25_0.03_250)] leading-tight text-balance">
              Healthcare Knowledge That{" "}
              <span className="text-[oklch(0.65_0.15_175)]">Empowers</span> &{" "}
              <span className="text-[oklch(0.75_0.15_85)]">Rewards</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Stellar Uzima connects medical professionals and patients to share knowledge, earn XLM
              tokens, and access quality healthcare information affordably.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" scroll={false} className="w-full sm:w-auto">
                <Button aria-label="Get started with Stellar Uzima" onClick={() => {
                  setIsPending(true)
                  console.log("Analytics: Get Started clicked")
                  }}
                  className="w-full sm:w-auto bg-[oklch(0.65_0.15_175)] hover:bg-teal-700 transition-colors duration-200 text-white rounded-full px-8 py-6 text-lg cursor-pointer"
                >
                  <span className="flex items-center justify-center">
                    {showSpinner && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Get Started
                  </span>
                </Button>
              </Link>

              <Button
                variant="outline"
                className="border-[oklch(0.25_0.03_250)] text-[oklch(0.25_0.03_250)] rounded-full px-8 py-6 text-lg hover:bg-[oklch(0.25_0.03_250)] hover:text-white bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Image with Animation */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              {heroImages.map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-all duration-1000 ease-in-out ${
                    index === currentImage
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                  priority={index === 0}
                />
              ))}
            </div>
            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? "bg-[oklch(0.65_0.15_175)] w-6"
                      : "bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[oklch(0.75_0.15_85)]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[oklch(0.65_0.15_175)]/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}