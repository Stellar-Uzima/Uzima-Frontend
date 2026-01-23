import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Users, Heart, Shield, Globe, Award, Coins, Zap } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    { name: "Team Member 1", role: "Medical Director" },
    { name: "Team Member 2", role: "Software Architect" },
    { name: "Team Member 3", role: "Community Lead" },
    { name: "Team Member 4", role: "Product Manager" },
  ];

  const missions = [
    {
      title: "Knowledge Exchange",
      desc: "A platform where medical professionals and patients share verified expertise seamlessly.",
      icon: <Globe className="w-6 h-6 text-[#0d9488]" />,
    },
    {
      title: "Quality Incentives",
      desc: "Higher quality content receives better rewards, ensuring a gold standard for health info.",
      icon: <Award className="w-6 h-6 text-[#0d9488]" />,
    },
    {
      title: "Scalable Architecture",
      desc: "A modular, secure system designed to grow alongside our global healthcare community.",
      icon: <Zap className="w-6 h-6 text-[#0d9488]" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section: prose class + specific mission info */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[oklch(0.25_0.03_250)] mb-6">
            About Stellar Uzima
          </h1>
          <div className="prose prose-slate max-w-none text-lg text-muted-foreground">
            <p>
              Stellar Uzima is a decentralized healthcare platform delivering verified medical knowledge 
              while rewarding professionals with XLM. We bridge the gap between expertise and 
              patient needs using high-speed blockchain technology.
            </p>
            <p className="mt-4">
              Our ecosystem ensures that quality contributions are recognized through a transparent 
              Stellar-based reward system, accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mission Section: Using @/components/ui/card */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((m, i) => (
            <Card key={i} className="border-t-4 border-t-[#0d9488] shadow-sm">
              <CardHeader>
                <div className="mb-2">{m.icon}</div>
                <CardTitle>{m.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{m.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Ubuntu Philosophy: Blockquote + Explanation */}
      <section className="bg-[#0d9488]/5 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <blockquote className="border-l-4 border-[#0d9488] pl-6 italic">
            <p className="text-2xl font-bold text-[oklch(0.25_0.03_250)]">
              "I am because we are."
            </p>
          </blockquote>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            At Stellar Uzima, the Ubuntu philosophy dictates that our collective health is 
            our greatest wealth. By incentivizing the sharing of verified medical knowledge, 
            we create a community where the success of one professional contributes to the 
            well-being of all members.
          </p>
        </div>
      </section>

      {/* 4. Team Grid: Responsive breakpoints */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
          <Users className="text-[#0d9488]" /> The Core Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-card p-6 border rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4" />
              <h3 className="font-bold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Stellar Integration: XLM to USDT conversion focus */}
      <section className="py-16 px-6 text-center border-t">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-4 mb-4">
             <Coins className="w-10 h-10 text-[#0d9488]" />
             <Shield className="w-10 h-10 text-[#0d9488]" />
          </div>
          <p className="text-lg">
            Powered by the <strong>Stellar Network</strong>, our platform provides 
            secure authentication and rapid rate limiting. Contributors earn 
            <strong> XLM tokens</strong> which can be seamlessly converted to 
            <strong> USDT</strong>, ensuring real-world value for medical expertise.
          </p>
        </div>
      </section>
    </div>
  );
}