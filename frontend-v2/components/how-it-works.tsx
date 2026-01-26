"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  UserPlus,
  BookOpen,
  Coins,
  UserCheck,
  MessageCircleQuestion,
  Heart,
  X,
  type LucideIcon,
} from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import clsx from "clsx"

export interface HowItWorksStep {
  id: string
  title: string
  description: string
  details?: string
  iconColor: "teal" | "yellow" | "pink"
  icon: LucideIcon
}

export interface HowItWorksView {
  id: "professionals" | "patients"
  label: string
  steps: HowItWorksStep[]
}

const ICON_COLORS = {
  teal: "bg-[#14B8A6]",
  yellow: "bg-[#F59E0B]",
  pink: "bg-[#EC4899]",
}

const views: HowItWorksView[] = [
  {
    id: "professionals",
    label: "For Health Professionals",
    steps: [
      {
        id: "register",
        title: "Register:",
        description:
          "Sign up and verify your medical credentials on Stellar Uzima's platform.",
        details:
          "Upload your certifications, verify identity, and complete your professional profile to gain access to the platform’s publishing and consultation features.",
        iconColor: "teal",
        icon: UserPlus,
      },
      {
        id: "share",
        title: "Share Knowledge:",
        description:
          "Create quality healthcare content, answer questions, and provide consultations.",
        details:
          "Publish articles, answer patient questions, host sessions, and grow trust with the community while earning rewards.",
        iconColor: "yellow",
        icon: BookOpen,
      },
      {
        id: "earn",
        title: "Earn XLM Tokens:",
        description:
          "Get rewarded with Stellar Lumens based on content quality and engagement.",
        details:
          "High-quality content, consultations, and engagement metrics determine your token rewards distributed on Stellar.",
        iconColor: "pink",
        icon: Coins,
      },
    ],
  },
  {
    id: "patients",
    label: "For Patients",
    steps: [
      {
        id: "signup",
        title: "Create Account:",
        description: "Sign up for free and complete your health profile.",
        details:
          "Create a secure account, provide basic health information, and customize preferences for better recommendations.",
        iconColor: "teal",
        icon: UserCheck,
      },
      {
        id: "questions",
        title: "Ask Questions:",
        description:
          "Post health questions and get answers from verified professionals.",
        details:
          "Submit questions publicly or privately and receive evidence-based responses from licensed clinicians.",
        iconColor: "yellow",
        icon: MessageCircleQuestion,
      },
      {
        id: "care",
        title: "Access Care:",
        description:
          "Book consultations and access quality healthcare resources.",
        details:
          "Schedule virtual visits, message specialists, and explore curated educational resources.",
        iconColor: "pink",
        icon: Heart,
      },
    ],
  },
]

const easing: [number, number, number, number] = [0.4, 0, 0.2, 1]

const panelVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easing } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: easing } },
}

const listVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easing } },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: easing } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: easing } },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: easing } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3, ease: easing } },
}

const colorMap: Record<string, string> = {
  teal: "bg-[oklch(0.65_0.15_175)]",
  gold: "bg-[oklch(0.75_0.15_85)]",
  pink: "bg-pink-400",
}

export function HowItWorks() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabsRef = useRef<HTMLButtonElement[]>([])
  const modalRef = useRef<HTMLDivElement | null>(null)
  
  const [activeTab, setActiveTab] = useState<HowItWorksView["id"]>("professionals")
  const [activeStep, setActiveStep] = useState<HowItWorksStep | null>(null)
  const [hasClickedTab, setHasClickedTab] = useState(false)

  useEffect(() => {
    if (hasClickedTab) return
    const param = searchParams.get("view")
    if (param === "professionals" || param === "patients") {
      setActiveTab(param)
    }
  }, [searchParams, hasClickedTab])

  useEffect(() => {
    if (!activeStep) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveStep(null)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [activeStep])

  useEffect(() => modalRef.current?.focus(), [activeStep])

  const activeView = views.find((v) => v.id === activeTab)!

  const onTabClick = (tab: HowItWorksView["id"], index: number) => {
    setActiveTab(tab)
    setHasClickedTab(true)
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", tab)
    router.replace(`?${params.toString()}`, { scroll: false })
    tabsRef.current[index]?.focus()
  }

  const onKeyDownTabs = (e: React.KeyboardEvent) => {
    const index = views.findIndex((v) => v.id === activeTab)
    if (e.key === "ArrowRight") {
      const next = (index + 1) % views.length
      onTabClick(views[next].id, next)
    }
    if (e.key === "ArrowLeft") {
      const prev = (index - 1 + views.length) % views.length
      onTabClick(views[prev].id, prev)
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">How It Works</h2>

        <div
          role="tablist"
          aria-label="How it works tabs"
          onKeyDown={onKeyDownTabs}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          {views.map((view, i) => (
            <button
              key={view.id}
              ref={(el) => {
                if (el) tabsRef.current[i] = el
              }}
              role="tab"
              aria-selected={activeTab === view.id}
              tabIndex={activeTab === view.id ? 0 : -1}
              onClick={() => onTabClick(view.id, i)}
              className={clsx(
                "px-6 py-3 rounded-full font-medium transition-all duration-300  focus-visible:outline-2 focus-visible:outline-teal-600",
                activeTab === view.id ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {view.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView.id}
            role="tabpanel"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
          >
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-3 gap-8 sm:grid-cols-1 relative"
            >
              {activeView.steps.map((step) => (
                <motion.button
                  key={step.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveStep(step)}
                  className="relative z-10 text-left bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300  focus-visible:outline-2 focus-visible:outline-teal-600 w-full"
                >
                  <div
                    className={clsx(
                      "w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-5",
                      ICON_COLORS[step.iconColor]
                    )}
                  >
                    <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {activeStep && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="how-it-works-modal-title"
              onClick={() => setActiveStep(null)}
            >
              <motion.div
                ref={modalRef}
                tabIndex={-1}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl outline-none"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 id="how-it-works-modal-title" className="text-2xl font-semibold">
                    {activeStep.title}
                  </h3>

                  <button
                    onClick={() => setActiveStep(null)}
                    className="p-2 rounded-md hover:bg-gray-100  focus-visible:outline-2 focus-visible:outline-teal-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{activeStep.details}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
