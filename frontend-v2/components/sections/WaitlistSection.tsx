'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import { Loader2, CheckCircle2 } from 'lucide-react'

const waitlistSchema = z.object({
    email: z.string()
        .email("Please enter a valid email")
        .min(5, "Email too short")
        .max(100, "Email too long")
        .refine(
            (email) => !email.includes('+'),
            "Disposable emails not allowed"
        )
})

type WaitlistFormValues = z.infer<typeof waitlistSchema>

export default function WaitlistSection() {
    const [isLoading, setIsLoading] = useState(false)
    const [successData, setSuccessData] = useState<{ position: number } | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<WaitlistFormValues>({
        resolver: zodResolver(waitlistSchema)
    })

    const onSubmit = async (data: WaitlistFormValues) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                if (response.status === 429) {
                    toast.error("Too many attempts. Please try again later.")
                    return;
                }
                throw new Error(result.error || "Something went wrong")
            }

            setSuccessData({ position: result.position })
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            })
            toast.success("You're on the list!")
            reset()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (successData) {
        return (
            <section className="relative w-full py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-teal-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto text-center text-white space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        You're on the list! Check your email.
                    </h2>
                    <p className="text-xl md:text-2xl text-teal-50 font-medium">
                        You're #{successData.position.toLocaleString()} in line to experience Stellar Uzima.
                    </p>
                    <p className="text-sm text-teal-100 max-w-md mx-auto">
                        We've sent a verification link to your inbox. Please click it to secure your spot.
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="relative w-full py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-teal-500 to-teal-600 overflow-hidden">
            {/* Background texture/noise if needed, or just pure gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_-50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Column: Content */}
                <div className="text-left space-y-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        Join our waiting list & <br className="hidden md:block" />
                        <span className="text-teal-100">Get Early Access to Stellar Uzima</span>
                    </h2>
                    <p className="text-lg text-teal-50 max-w-xl leading-relaxed">
                        Be the first to experience the future of decentralized healthcare.
                        Secure your username and get exclusive perks when we launch.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-teal-100 font-medium pt-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-teal-500 bg-teal-800 flex items-center justify-center text-xs overflow-hidden">
                                    <span className="opacity-50">User</span>
                                </div>
                            ))}
                        </div>
                        <p>Join 2,000+ others waiting</p>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="w-full max-w-lg lg:ml-auto bg-white/5 backdrop-blur-sm p-1 rounded-2xl border border-white/10 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="relative group">
                        <div className="relative flex items-center">
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="Enter Your Email"
                                className={`w-full h-16 pl-6 pr-40 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-300/50 transition-all font-medium text-lg shadow-inner ${errors.email ? 'ring-2 ring-red-400 focus:ring-red-400' : ''}`}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-2 top-2 bottom-2 bg-gray-900 hover:bg-gray-800 text-white px-8 rounded-lg font-semibold transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl translate-y-0 active:translate-y-0.5"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Joining...</span>
                                    </>
                                ) : (
                                    <span>Get Started</span>
                                )}
                            </button>
                        </div>
                    </form>
                    {errors.email && (
                        <p className="absolute -bottom-8 left-4 text-red-100 font-medium animate-in slide-in-from-top-1 bg-red-500/20 px-3 py-1 rounded-full text-sm backdrop-blur-md">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}
