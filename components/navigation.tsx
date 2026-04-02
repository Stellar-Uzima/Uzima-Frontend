"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";

import { NotificationProvider } from "@/context/NotificationContext";
import LanguageSelector from "@/components/ui/LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { ThemeToggle } from "./theme-toggle";

function WalletConnectModalSkeleton() {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4"
      aria-busy="true"
      aria-label="Loading wallet options"
    >
      <div className="h-[280px] w-full max-w-md animate-pulse rounded-lg border border-terra/10 bg-cream shadow-lg" />
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

const InstallButton = dynamic(
  () => import("@/components/pwa/InstallPrompt").then((mod) => mod.InstallButton),
  {
    loading: () => null,
    ssr: false,
  },
);

const NotificationPanel = dynamic(
  () =>
    import("@/components/notifications/NotificationPanel").then(
      (mod) => mod.NotificationPanel,
    ),
  {
    loading: () => null,
    ssr: false,
  },
);

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "How it Works", href: "#how" },
  { label: "Earn", href: "#earn" },
  { label: "Community", href: "#community" },
  { label: "Blockchain", href: "#blockchain" },
];

const SERVICE_LINKS: NavLink[] = [
  { label: "Knowledge Sharing", href: "/services/knowledge-sharing" },
  { label: "Consultations", href: "/services/consultations" },
  { label: "XLM Rewards", href: "/services/xlm-rewards" },
];

function useWallet() {
  const [isLoggedIn] = useState(false);
  const [xlmBalance] = useState<number | null>(null);
  return { isLoggedIn, xlmBalance };
}

function XLMBalanceWidget({ balance }: { balance: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-terra/20 bg-terra/10 px-3 py-1.5">
      <span className="text-xs font-semibold text-terra">★</span>
      <span className="text-sm font-medium tabular-nums text-foreground">
        {balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        XLM
      </span>
    </div>
  );
}

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
      className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-terra/30"
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <span className="flex w-5 flex-col gap-1.5">
        <span
          className={`block h-0.5 rounded-full bg-foreground transition-all duration-300 origin-center ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 rounded-full bg-foreground transition-all duration-300 ${
            isOpen ? "scale-x-0 opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 rounded-full bg-foreground transition-all duration-300 origin-center ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}

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
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
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
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col overflow-hidden border-r border-border bg-background transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-terra/10 px-6 py-4">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5 no-underline">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terra text-xs font-semibold text-gold">
              ★
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-foreground">
              Stellar Uzima
            </span>
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-terra/30"
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

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
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
                className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-terra/10 font-semibold text-terra"
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
                className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors ${
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

        <div className="flex shrink-0 flex-col gap-4 border-t border-terra/10 px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Appearance</span>
            <ThemeToggle />
          </div>

          {!isInstalled && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="flex w-fit items-center gap-2 text-sm font-medium text-terra transition-opacity hover:opacity-80"
            >
              <Download className="h-4 w-4" />
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
              className="w-full rounded-full border border-terra/30 px-5 py-2 text-center text-sm font-medium text-terra transition-colors hover:bg-terra/5"
            >
              Connect wallet
            </button>
            {!isLoggedIn && (
              <Link
                href="/signin"
                onClick={onClose}
                className="w-full rounded-full border border-border px-5 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:text-terra"
              >
                Sign In
              </Link>
            )}
            <a
              href="/signup"
              onClick={onClose}
              className="w-full rounded-full bg-terra px-5 py-3 text-center text-sm font-medium text-white transition-all hover:bg-earth hover:shadow-lg hover:shadow-terra/30"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { isLoggedIn, xlmBalance } = useWallet();
  const [activeSection, setActiveSection] = useState("");
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

    const isMobile = window.innerWidth < 768;
    const topOffset = isMobile ? "80px" : "100px";
    const bottomOffset = isMobile ? "35%" : "50%";
    const visibilityThreshold = isMobile ? 0.15 : 0.3;

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
        threshold: [0, 0.1, 0.15, 0.2, 0.3, 0.5, 0.7, 1],
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

  useEffect(() => {
    const root = document.documentElement;

    const updateNavbarHeight = () => {
      const height = navRef.current?.offsetHeight;
      if (height) {
        root.style.setProperty("--navbar-height", `${height}px`);
      }
    };

    updateNavbarHeight();

    const observer =
      typeof ResizeObserver !== "undefined" && navRef.current
        ? new ResizeObserver(updateNavbarHeight)
        : null;

    if (observer && navRef.current) {
      observer.observe(navRef.current);
    } else {
      window.addEventListener("resize", updateNavbarHeight);
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, [isScrolled]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);

  return (
    <NotificationProvider>
      <>
        <nav
          ref={navRef}
          className={`fixed left-0 right-0 z-30 flex items-center justify-between border-b border-terra/10 bg-cream/94 px-6 backdrop-blur-md transition-all duration-300 ease-out md:px-12 ${
            isScrolled
              ? "py-[0.95rem] shadow-lg shadow-terra/5 md:py-[0.7rem]"
              : "py-[1.1rem] shadow-sm shadow-terra/0"
          }`}
          style={{ top: "var(--update-banner-height, 0px)" }}
        >
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terra text-sm font-semibold text-gold">
              ★
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              Stellar Uzima
            </span>
          </Link>

          <ul className="hidden list-none items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const active = link.href.startsWith("#")
                ? `#${activeSection}` === link.href
                : pathname === link.href;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative text-sm font-medium transition-all duration-200 ${
                      active ? "text-terra" : "text-muted-foreground hover:text-terra"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-terra" />
                    )}
                  </a>
                </li>
              );
            })}

            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex cursor-pointer items-center gap-1 rounded text-sm font-medium text-muted-foreground transition-colors hover:text-terra focus:outline-none focus:ring-2 focus:ring-terra/30">
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
                  className="w-48 rounded-lg border border-border bg-card shadow-lg"
                >
                  {SERVICE_LINKS.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-2 px-4 py-2 text-sm ${
                          pathname === link.href
                            ? "font-medium text-terra"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>

          <div className="hidden items-center gap-4 md:flex">
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
              className="px-2 text-sm font-medium text-terra transition-opacity hover:opacity-80"
            >
              Connect wallet
            </button>
            {!isLoggedIn && (
              <Link
                href="/signin"
                className="px-2 text-sm font-medium text-foreground transition-colors hover:text-terra"
              >
                Sign In
              </Link>
            )}
            <a
              href="/signup"
              className="rounded-full bg-terra px-5 py-2 text-sm font-medium text-white transition-all hover:bg-earth hover:shadow-lg hover:shadow-terra/30"
            >
              Join Now
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <NotificationPanel />
            <HamburgerButton isOpen={drawerOpen} onClick={toggleDrawer} />
          </div>
        </nav>

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
    </NotificationProvider>
  );
}
