import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Traditional Healers Directory | Stellar Uzima",
  description:
    "Browse verified traditional healers across Africa. Filter by specialty, region, and language to find herbalists, spiritual healers, midwives, and more.",
};

export default function HealersLayout({ children }: { children: ReactNode }) {
  return children;
}
