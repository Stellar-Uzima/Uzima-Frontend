const config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    safelist: [
        // Colors used in features and steps
        "bg-[oklch(0.65_0.15_175)]",
        "bg-[oklch(0.75_0.15_85)]",
        "bg-pink-400",
        "bg-red-400",
        "bg-amber-400",
        "bg-emerald-400",
        "bg-cyan-400",
        "bg-blue-400",
        "bg-indigo-400",
        "bg-violet-400",
        "bg-purple-400",
        "bg-fuchsia-400",
        "bg-rose-400",
        "bg-orange-400",
        // Indicator focus states
        "bg-white",
        "bg-white/50",
        "bg-white/60",
        "bg-gray-400/60",
        "bg-gray-600",
        // Transition classes
        "transition-all",
        "duration-300",
        "duration-700",
        "duration-1000",
        "ease-in-out",
    ],
    plugins: [],
}

export default config
