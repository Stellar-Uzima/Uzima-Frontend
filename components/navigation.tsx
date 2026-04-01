"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { InstallButton } from "@/components/pwa/InstallPrompt";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { ThemeToggle } from "./theme-toggle";

function WalletConnectModalSkeleton() {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40"
      aria-busy="true"
      aria-label="Loading wallet options"
    >
      <div className="h-[280px] w-full max-w-md rounded-lg border border-terra/10 bg-cream shadow-lg animate-pulse" />
    </div>
  );
}

const WalletConnectModal = dynamic(
  () => import("@/components/wallet/WalletConnectModal"),
  {
    loading: () => <WalletConnectModalSkeleton />,
    ssr: false,
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

interface ServiceLink extends NavLink {}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "How it Works", href: "#how" },
  { label: "Earn", href: "#earn" },
  { label: "Community", href: "#community" },
  { label: "Blockchain", href: "#blockchain" },
];

const SERVICE_LINKS: ServiceLink[] = [
  { label: "Knowledge Sharing", href: "/services/knowledge-sharing" },
  { label: "Consultations", href: "/services/consultations" },
  { label: "XLM Rewards", href: "/services/xlm-rewards" },
];

// ─── Mock wallet hook — replace with real context when available ──────────────

function useWallet() {
  const [isLoggedIn] = useState(false);
  const [xlmBalance] = useState<number | null>(null);
  return { isLoggedIn, xlmBalance };
}

// ─── XLM Balance Widget ───────────────────────────────────────────────────────

function XLMBalanceWidget({ balance }: { balance: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-terra/10 border border-terra/20">
      <span className="text-terra text-xs font-semibold">★</span>
      <span className="text-foreground text-sm font-medium tabular-nums">
        {balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        XLM
      </span>
    </div>
  );
}

// ─── Hamburger Button ─────────────────────────────────────────────────────────

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-drawer"
<<<<<<< HEAD
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terra/30 lg:hidden"
=======
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terra/30"
>>>>>>> main
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <span className="flex flex-col gap-1.5 w-5">
        <span
          className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${
            isOpen ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </span>
    </button>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({
  isOpen,
  onClose,
  pathname,
  isLoggedIn,
  xlmBalance,
  activeSection,
  onOpenWallet,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isLoggedIn: boolean;
  xlmBalance: number | null;
  activeSection: string;
  onOpenWallet: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { isInstalled, deferredPrompt, handleInstall } = usePwaInstall();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
<<<<<<< HEAD
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen
=======
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
>>>>>>> main
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
<<<<<<< HEAD
        className={`fixed inset-0 z-50 flex flex-col bg-cream transition-transform duration-300 ease-in-out lg:hidden overflow-hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
=======
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[280px] bg-background border-r border-border transition-transform duration-300 ease-in-out md:hidden overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
>>>>>>> main
      >
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-terra/10">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 no-underline"
          >
            <div className="w-8 h-8 rounded-full bg-terra flex items-center justify-center text-gold text-xs font-semibold">
              ★
            </div>
            <span className="font-serif font-bold text-foreground text-lg tracking-tight">
              Stellar Uzima
            </span>
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
<<<<<<< HEAD
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terra/30"
=======
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terra/30"
>>>>>>> main
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {isLoggedIn && xlmBalance !== null && (
            <div className="mb-4 px-2">
              <XLMBalanceWidget balance={xlmBalance} />
            </div>
          )}

          {NAV_LINKS.map((link) => {
            const isActive = link.href.startsWith("#")
              ? `#${activeSection}` === link.href
              : pathname === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-terra/10 text-terra font-semibold"
                      : "text-foreground hover:bg-terra/5 hover:text-terra"
                  }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="mt-4">
            <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Services
            </p>
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors
                  ${
                    pathname === link.href
                      ? "bg-terra/10 text-terra"
                      : "text-foreground hover:bg-terra/5 hover:text-terra"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="shrink-0 px-6 py-6 border-t border-terra/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Appearance
            </span>
            <ThemeToggle />
          </div>

          {!isInstalled && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="flex items-center gap-2 text-terra text-sm font-medium hover:opacity-80 transition-opacity w-fit"
            >
              <Download className="w-4 h-4" />
              Install App
            </button>
          )}

          <LanguageSelector />

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                onOpenWallet();
                onClose();
              }}
              className="w-full text-center text-terra font-medium text-sm px-5 py-2 border border-terra/30 rounded-full hover:bg-terra/5 transition-colors"
            >
              Connect wallet
            </button>
            {!isLoggedIn && (
              <Link
                href="/signin"
                onClick={onClose}
                className="w-full text-center text-foreground font-medium text-sm hover:text-terra transition-colors px-5 py-2.5 border border-border rounded-full"
              >
                Sign In
              </Link>
            )}
            <a
              href="/signup"
              onClick={onClose}
              className="w-full text-center bg-terra text-white px-5 py-3 rounded-full text-sm font-medium transition-all hover:bg-earth hover:shadow-lg hover:shadow-terra/30"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { isLoggedIn, xlmBalance } = useWallet();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "#how, #earn, #community, #blockchain",
    );
    if (sections.length === 0) return;

<<<<<<< HEAD
    // Mobile-optimized detection settings
    const isMobile = window.innerWidth < 1024;
    const topOffset = isMobile ? "80px" : "100px"; // Account for navbar height
    const bottomOffset = isMobile ? "35%" : "50%"; // Less aggressive on mobile
    const visibilityThreshold = isMobile ? 0.15 : 0.3; // Lower threshold for mobile
=======
    const isMobile = window.innerWidth < 768;
    const topOffset = isMobile ? "80px" : "100px";
    const bottomOffset = isMobile ? "35%" : "50%";
    const visibilityThreshold = isMobile ? 0.15 : 0.3;
>>>>>>> main

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let dominantSection = "";
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            dominantSection = entry.target.id;
          }
        });
        if (maxRatio > visibilityThreshold) {
          setActiveSection(dominantSection);
        }
      },
      {
        threshold: [0, 0.1, 0.15, 0.2, 0.3, 0.5, 0.7, 1.0],
        rootMargin: `-${topOffset} 0px -${bottomOffset} 0px`,
      },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 80);
        rafId = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Measure navbar height and set CSS variable
  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      }
    };

    updateNavbarHeight();

    const observer = new ResizeObserver(() => {
      updateNavbarHeight();
    });

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 bg-cream/94 backdrop-blur-md border-b border-terra/10 transition-all duration-300 ease-out ${
          isScrolled
            ? "py-[0.95rem] md:py-[0.7rem] shadow-lg shadow-terra/5"
            : "py-[1.1rem] shadow-sm shadow-terra/0"
        }`}
        style={{ top: 'var(--update-banner-height, 0px)' }}
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-full bg-terra flex items-center justify-center text-gold text-sm font-semibold">
            ★
          </div>
          <span className="font-serif font-bold text-foreground text-xl tracking-tight">
            Stellar Uzima
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {NAV_LINKS.map((link) => {
            const active = link.href.startsWith("#")
              ? `#${activeSection}` === link.href
              : pathname === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative no-underline text-sm font-medium transition-all duration-200
                    ${active ? "text-terra" : "text-muted-foreground hover:text-terra"}`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terra rounded-full" />
                  )}
                </a>
              </li>
            );
          })}

          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="no-underline text-muted-foreground text-sm font-medium hover:text-terra transition-colors cursor-pointer flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-terra/30 rounded">
                  Services
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-card border border-border rounded-lg shadow-lg"
              >
                {SERVICE_LINKS.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm cursor-pointer
                        ${pathname === link.href ? "text-terra font-medium" : "text-foreground hover:bg-accent"}`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>

        {/* ── Desktop right side ── */}
<<<<<<< HEAD
        <div className="hidden lg:flex items-center gap-4">
          {/* XLM balance widget — only when logged in */}
=======
        <div className="hidden md:flex items-center gap-4">
>>>>>>> main
          {isLoggedIn && xlmBalance !== null && (
            <XLMBalanceWidget balance={xlmBalance} />
          )}
          <ThemeToggle />
          <LanguageSelector />
          <NotificationPanel />
          <InstallButton />
          <button
            type="button"
            onClick={() => setWalletModalOpen(true)}
            className="text-terra font-medium text-sm hover:opacity-80 transition-opacity px-2"
          >
            Connect wallet
          </button>
          {!isLoggedIn && (
            <Link
              href="/signin"
              className="text-foreground font-medium text-sm hover:text-terra transition-colors px-2"
            >
              Sign In
            </Link>
          )}
          <a
            href="/signup"
            className="bg-terra text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-earth hover:shadow-lg hover:shadow-terra/30"
          >
            Join Now
          </a>
        </div>

        {/* ── Mobile Actions (Bell + Hamburger) ── */}
        <div className="flex items-center gap-2 md:hidden">
          <NotificationPanel />
          <HamburgerButton isOpen={drawerOpen} onClick={toggleDrawer} />
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        xlmBalance={xlmBalance}
        activeSection={activeSection}
        onOpenWallet={() => setWalletModalOpen(true)}
      />

      {walletModalOpen && (
        <WalletConnectModal
          open={walletModalOpen}
          onOpenChange={setWalletModalOpen}
        />
      )}
    </>
  );
}