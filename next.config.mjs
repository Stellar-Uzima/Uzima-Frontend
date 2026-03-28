import withPWAInit from "@ducanh2912/next-pwa";

const isAnalyze = process.env.ANALYZE === "true";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: isAnalyze,
  customWorkerSrc: "worker",
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly use webpack for PWA compatibility
  turbopack: {},
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
    ],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default withPWA(nextConfig);
