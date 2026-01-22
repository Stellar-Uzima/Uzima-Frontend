import { Button } from "@/components/ui/button"

const stats = [
  { value: "10K+", label: "Healthcare knowledge articles shared" },
  { value: "50+", label: "Countries with active users" },
  { value: "100K+", label: "XLM tokens distributed" },
  { value: "500+", label: "Verified medical professionals" },
]

export function WhyStellarUzima() {
  return (
    <section className="py-20 bg-[oklch(0.25_0.03_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Stellar Uzima
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              We digitally empower you to access and share healthcare knowledge while earning 
              cryptocurrency rewards. Our comprehensive, blockchain-powered platform enables 
              quality healthcare information sharing at scale, anytime and any place - a 
              knowledge experience so seamless that it becomes simply healthcare.
            </p>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-[oklch(0.65_0.15_175)]">
                  {stat.value}
                </div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <Button className="mt-10 bg-transparent border-2 border-[oklch(0.65_0.15_175)] text-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.65_0.15_175)] hover:text-white rounded-full px-8 py-6">
          Learn More
        </Button>
      </div>
    </section>
  )
}
