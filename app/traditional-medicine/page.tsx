
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Brain, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import {
  traditionalTreatments,
  communityHealers,
  TraditionalTreatment
} from "./data"
import { TreatmentCard } from "@/components/traditional-medicine/treatment-card"
import { TreatmentDetails } from "@/components/traditional-medicine/treatment-details"
import { HealerCard } from "@/components/traditional-medicine/healer-card"
import { SafetyGuidelines } from "@/components/traditional-medicine/safety-guidelines"
import { AISuggestions } from "@/components/traditional-medicine/ai-suggestions"

export const dynamic = 'force-dynamic'

export default function TraditionalMedicinePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTreatment, setSelectedTreatment] = useState<TraditionalTreatment | null>(null)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  // Default to first treatment if none selected? Or null. Let's start with null for "Select One" state.
  // Actually, for better UX on desktop, selecting the first one is nice.
  useEffect(() => {
    // Only select first if nothing selected and filtered list is not empty
    if (!selectedTreatment && traditionalTreatments.length > 0) {
      // Optional: setSelectedTreatment(traditionalTreatments[0])
    }
  }, [selectedTreatment])

  useEffect(() => {
    if (selectedTreatment) {
      const suggestions = [
        `Consider monitoring ${selectedTreatment.name} alongside conventional ${selectedTreatment.modernEquivalent}`,
        `Cultural consultation recommended due to ${selectedTreatment.culturalSignificance} significance`,
        `Safety profile: ${selectedTreatment.safetyRating}/5 - Review contraindications`,
        `Scientific evidence level: ${selectedTreatment.scientificEvidence} - Consider additional research`,
      ]
      setAiSuggestions(suggestions)
    } else {
      setAiSuggestions([])
    }
  }, [selectedTreatment])

  const filteredTreatments = traditionalTreatments.filter(
    (treatment) =>
      treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.localName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.uses.some((use) => use.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
            >
              Traditional Medicine
            </motion.h1>
            <p className="text-gray-600 max-w-2xl text-lg">
              Bridging ancient healing wisdom with modern healthcare standards. Explore verified treatments, community healers, and integration guidelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center space-x-2 bg-emerald-100/50 px-3 py-1.5 rounded-full border border-emerald-200">
              <Brain className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">AI-Verified</span>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Submit Treatment
            </Button>
          </div>
        </div>

        {/* Content Refactor: Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6 lg:h-[calc(100vh-200px)] lg:min-h-[800px] h-auto">

          {/* Left Column: List & Search (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:overflow-hidden lg:max-h-full">

            {/* Search Bar */}
            <div className="relative z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search treatments, symptoms, or regions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-emerald-200 focus:border-emerald-500 bg-white/80 backdrop-blur-sm shadow-sm text-base"
                />
              </div>
            </div>

            {/* Scrollable Treatment List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-4 space-y-4">
              {filteredTreatments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No treatments found matching your search.
                </div>
              ) : (
                filteredTreatments.map((treatment) => (
                  <TreatmentCard
                    key={treatment.id}
                    treatment={treatment}
                    isSelected={selectedTreatment?.id === treatment.id}
                    onClick={() => setSelectedTreatment(treatment)}
                  />
                ))
              )}
            </div>

            {/* Bottom: Community Healers Preview (Mobile/Desktop split) */}
            <div className="hidden lg:block space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center">
                Verified Healers
                <span className="ml-2 bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full">{communityHealers.length}</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <HealerCard healer={communityHealers[0]} />
                {/* Only showing one for compact view or make carousel */}
              </div>
            </div>

          </div>

          {/* Right Column: Details & integration (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 h-full overflow-y-auto lg:overflow-visible">

            {/* Main Detail View */}
            <div className="flex-1 min-h-[500px]">
              <TreatmentDetails treatment={selectedTreatment} />
            </div>

            {/* Below Details: AI & Safety (Grid) */}
            {selectedTreatment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <AISuggestions suggestions={aiSuggestions} />
                <SafetyGuidelines />
              </motion.div>
            )}

            {/* Mobile-only Healers Section */}
            <div className="lg:hidden mt-8">
              <h3 className="font-bold text-xl text-gray-800 mb-4">Top Verified Healers</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {communityHealers.map(healer => (
                  <HealerCard key={healer.id} healer={healer} />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Full Healers Section (if not just sidebar) */}
        <section className="mt-16 mb-8 pt-8 border-t border-emerald-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Community Healer Network</h2>
            <Button variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">View All Providers</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityHealers.map(healer => (
              <HealerCard key={healer.id} healer={healer} />
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
