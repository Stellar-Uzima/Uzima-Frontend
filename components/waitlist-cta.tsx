"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WaitlistCTA() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle waitlist signup
    console.log("Waitlist signup:", email)
    setEmail("")
  }

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.65_0.15_175)] to-[oklch(0.75_0.12_195)]" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute left-0 top-0 h-full w-1/3" viewBox="0 0 200 400" fill="none">
          <path d="M-50,100 Q50,200 -50,300" stroke="white" strokeWidth="2" fill="none" />
          <path d="M0,50 Q100,150 0,250" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="150" cy="350" r="30" stroke="white" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute right-0 top-0 h-full w-1/3" viewBox="0 0 200 400" fill="none">
          <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="2" fill="none" />
          <path d="M50,300 Q150,350 250,300" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-balance">
              Join our waiting list & Get Early Access to Stellar Uzima
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="flex w-full max-w-md">
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-l-full rounded-r-none border-0 bg-white px-6 py-6 text-foreground placeholder:text-muted-foreground"
              required
            />
            <Button
              type="submit"
              className="rounded-l-none rounded-r-full bg-[oklch(0.25_0.03_250)] hover:bg-[oklch(0.2_0.03_250)] text-white px-8 py-6"
            >
              Get Started
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
