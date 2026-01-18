"use client"

import { useState } from "react"

const professionalSteps = [
  {
    color: "bg-[oklch(0.65_0.15_175)]",
    title: "Register:",
    description: "Sign up and verify your medical credentials on Stellar Uzima's platform.",
  },
  {
    color: "bg-[oklch(0.75_0.15_85)]",
    title: "Share Knowledge:",
    description: "Create quality healthcare content, answer questions, and provide consultations.",
  },
  {
    color: "bg-pink-400",
    title: "Earn XLM Tokens:",
    description: "Get rewarded with Stellar Lumens based on content quality and engagement.",
  },
]

const patientSteps = [
  {
    color: "bg-[oklch(0.65_0.15_175)]",
    title: "Sign Up:",
    description: "Register on the Stellar Uzima app or website to create your account.",
  },
  {
    color: "bg-[oklch(0.75_0.15_85)]",
    title: "Learn & Engage:",
    description: "Access quality healthcare content and engage with the community.",
  },
  {
    color: "bg-pink-400",
    title: "Earn & Connect:",
    description: "Earn tokens for engagement and connect with specialists for consultations.",
  },
]

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"professionals" | "patients">("professionals")

  const steps = activeTab === "professionals" ? professionalSteps : patientSteps

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.03_250)] mb-8">
          How It Works
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab("professionals")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "professionals"
                ? "bg-[oklch(0.65_0.15_175)] text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            For Health Professionals
          </button>
          <button
            onClick={() => setActiveTab("patients")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "patients"
                ? "bg-[oklch(0.65_0.15_175)] text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            For Patients
          </button>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="space-y-4">
              <div className={`w-4 h-4 rounded ${step.color}`} />
              <h3 className="text-[oklch(0.25_0.03_250)] font-semibold text-xl">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
