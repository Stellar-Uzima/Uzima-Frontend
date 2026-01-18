"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "As a healthcare professional in Kenya, earning XLM for sharing my knowledge has been amazing. The platform makes it easy to help patients across Africa while being rewarded for quality content. It's like having a pan-African practice!",
    name: "Dr. Amani Okonkwo",
    title: "Cardiologist, Lagos",
    image: "/images/testimonial-1.jpg",
  },
  {
    quote:
      "I found verified health information that helped me understand my condition better. The XLM rewards for engaging with content motivated me to learn more about my health. Stellar Uzima has been a game-changer for my wellness journey.",
    name: "Kwame Mensah",
    title: "Patient, Accra",
    image: "/images/testimonial-3.jpg",
  },
  {
    quote:
      "The peer review system ensures quality content. I've built my reputation on the platform and now earn a steady income from consultations and content creation. Converting XLM to USDT is seamless.",
    name: "Dr. Fatima Diallo",
    title: "General Practitioner, Dakar",
    image: "/images/testimonial-2.jpg",
  },
  {
    quote:
      "Being able to connect with specialists globally and access reliable health information has been invaluable. The blockchain-based reward system is transparent and fair for all Africans.",
    name: "Tendai Moyo",
    title: "Healthcare Seeker, Harare",
    image: "/images/testimonial-3.jpg",
  },
  {
    quote:
      "Stellar Uzima combines my passion for teaching with earning potential. The community is supportive, and the platform is intuitive. Highly recommend for any African healthcare professional!",
    name: "Dr. Ngozi Adeyemi",
    title: "Pediatrician, Nairobi",
    image: "/images/testimonial-2.jpg",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[oklch(0.65_0.15_175)] font-medium mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.03_250)]">
            Trusted by Patients and Professionals Across Africa
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`transition-all duration-700 ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 absolute inset-0 translate-x-8 pointer-events-none"
                }`}
              >
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[oklch(0.25_0.03_250)]">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-[oklch(0.65_0.15_175)] w-6" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
