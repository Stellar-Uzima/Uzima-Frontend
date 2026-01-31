
"use client"

import { Leaf, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TraditionalTreatment } from "@/app/traditional-medicine/data"

interface TreatmentCardProps {
    treatment: TraditionalTreatment
    onClick: () => void
    isSelected: boolean
}

export function TreatmentCard({ treatment, onClick, isSelected }: TreatmentCardProps) {
    const getEvidenceColor = (evidence: string) => {
        switch (evidence) {
            case "high":
                return "bg-emerald-100 text-emerald-800 border-emerald-200"
            case "moderate":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "low":
                return "bg-orange-100 text-orange-800 border-orange-200"
            case "none":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getCulturalColor = (significance: string) => {
        switch (significance) {
            case "sacred":
                return "bg-purple-100 text-purple-800 border-purple-200"
            case "traditional":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "common":
                return "bg-green-100 text-green-800 border-green-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="cursor-pointer h-full"
        >
            <Card
                className={`h-full transition-all duration-300 border-2 ${isSelected
                        ? "border-emerald-500 shadow-md bg-emerald-50/50"
                        : "border-transparent hover:border-emerald-200 hover:shadow-lg bg-white/80 backdrop-blur-sm"
                    }`}
            >
                <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl flex-shrink-0 ${isSelected ? "bg-emerald-200" : "bg-emerald-100"
                            }`}>
                            <Leaf className={`w-6 h-6 ${isSelected ? "text-emerald-800" : "text-emerald-600"
                                }`} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                                <div>
                                    <h3 className="font-bold text-gray-900 truncate">{treatment.name}</h3>
                                    <p className="text-sm text-emerald-700 font-medium truncate">{treatment.localName}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs font-bold text-yellow-700">{treatment.safetyRating}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3 mt-2">
                                <Badge variant="outline" className={`text-xs ${getEvidenceColor(treatment.scientificEvidence)}`}>
                                    {treatment.scientificEvidence} evidence
                                </Badge>
                                <Badge variant="outline" className={`text-xs ${getCulturalColor(treatment.culturalSignificance)}`}>
                                    {treatment.culturalSignificance}
                                </Badge>
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {treatment.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                                {treatment.uses.slice(0, 2).map((use, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                    >
                                        {use}
                                    </span>
                                ))}
                                {treatment.uses.length > 2 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500">
                                        +{treatment.uses.length - 2}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
