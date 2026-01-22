import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";
import nextPwa from "next-pwa";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const withPWA = nextPwa({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development", // Disable PWA in development
});

const nextConfig: NextConfig = {
	images: {
		domains: ["yourdomain.com", "res.cloudinary.com"],
	},
};

export default withPWA(withNextIntl(nextConfig) as Parameters<typeof withPWA>[0]);
