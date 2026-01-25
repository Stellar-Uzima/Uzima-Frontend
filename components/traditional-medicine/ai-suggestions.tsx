
"use client"

import { Brain, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AISuggestionsProps {
    suggestions: string[]
}

export function AISuggestions({ suggestions }: AISuggestionsProps) {
    if (suggestions.length === 0) return null

    return (
        <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-indigo-100 shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Brain className="w-24 h-24 text-indigo-900" />
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-indigo-900 text-lg">
                    <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
                    AI Integration Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 relative z-10">
                    {suggestions.map((suggestion, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-indigo-50 shadow-sm"
                        >
                            <Brain className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                            <p className="text-sm text-indigo-900/80 leading-snug">{suggestion}</p>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
