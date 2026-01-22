"use client"

import Image from "next/image"
import Link from "next/link"

const articles = [
  {
    title: "Understanding Stellar Blockchain in African Healthcare",
    excerpt:
      "Learn how Stellar's fast and low-cost transactions are revolutionizing healthcare knowledge sharing across Africa and enabling global access to medical information...",
    image: "/images/news-1.jpg",
    slug: "stellar-blockchain-healthcare",
  },
  {
    title: "How Quality Content Earns More XLM Rewards",
    excerpt:
      "Discover the peer review system that determines content quality and how African healthcare professionals can maximize XLM earnings by creating valuable content...",
    image: "/images/news-2.jpg",
    slug: "quality-content-xlm-rewards",
  },
  {
    title: "The Future of Decentralized Healthcare in Africa",
    excerpt:
      "Explore how blockchain technology is democratizing healthcare information and creating new opportunities for medical professionals across the African continent...",
    image: "/images/news-3.jpg",
    slug: "decentralized-healthcare-knowledge",
  },
]

export function LatestNews() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-[oklch(0.65_0.15_175)] mb-8">Latest News</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[oklch(0.25_0.03_250)] mb-3 group-hover:text-[oklch(0.65_0.15_175)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <span className="text-[oklch(0.65_0.15_175)] text-sm font-medium group-hover:underline">
                  read more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
