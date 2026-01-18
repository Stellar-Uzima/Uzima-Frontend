"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is Stellar Uzima?",
    answer: "Stellar Uzima is a blockchain-powered healthcare knowledge-sharing platform that rewards users with Stellar (XLM) tokens for quality content. We connect medical professionals and patients to share verified healthcare information, provide consultations, and earn cryptocurrency rewards.",
  },
  {
    question: "How do I sign up for Stellar Uzima?",
    answer: "You can sign up on our website or through our mobile app. Medical professionals need to verify their credentials, while patients can register with basic information. Once registered, you'll have access to our knowledge-sharing and reward features.",
  },
  {
    question: "How do I earn XLM tokens?",
    answer: "You can earn XLM tokens by creating quality healthcare content, answering questions, providing consultations (for verified professionals), and engaging constructively with the community. Higher quality content receives better rewards through our peer review system.",
  },
  {
    question: "How can I convert my XLM to USDT?",
    answer: "Stellar Uzima integrates with major cryptocurrency exchanges. You can transfer your earned XLM to your connected wallet and use our built-in exchange feature to convert to USDT or other currencies at competitive rates.",
  },
  {
    question: "Is the healthcare information verified?",
    answer: "Yes! All healthcare content goes through our peer review system where verified medical professionals validate the accuracy. We maintain strict quality standards to ensure reliable information for our community.",
  },
  {
    question: "How does Stellar Uzima ensure data security?",
    answer: "We use blockchain technology for transparent transactions, end-to-end encryption for user data, and implement rate limiting, authentication, and input validation. Our platform is built with security-first architecture to protect your health information.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-[oklch(0.65_0.15_175)] mb-8">
          Frequently asked questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold text-[oklch(0.25_0.03_250)] pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
