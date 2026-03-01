"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSelector from "@/components/ui/LanguageSelector";

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
  // Replace this with your real auth/wallet context
  const [isLoggedIn] = useState(false);
  const [xlmBalance] = useState<number | null>(null);
  return { isLoggedIn, xlmBalance };
}

// ─── XLM Balance Widget ───────────────────────────────────────────────────────

function XLMBalanceWidget({ balance }: { balance: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-terra/10 border border-terra/20">
      <span className="text-terra text-xs font-semibold">★</span>
      <span className="text-earth text-sm font-medium tabular-nums">
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
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terra/30 md:hidden"
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      {/* Animated bars */}
      <span className="flex flex-col gap-1.5 w-5">
        <span
          className={`block h-0.5 bg-black rounded-full transition-all duration-300 origin-center ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${
            isOpen ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 bg-black rounded-full transition-all duration-300 origin-center ${
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
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isLoggedIn: boolean;
  xlmBalance: number | null;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap — keep focus inside drawer when open
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Escape closes drawer
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Tab traps focus inside drawer
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

  // Attach/detach keyboard listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Move focus to close button when drawer opens
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      // Prevent background scroll
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
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-50 flex flex-col bg-cream transition-transform duration-300 ease-in-out md:hidden overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-terra/10">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 no-underline"
          >
            <div className="w-9 h-9 rounded-full bg-terra flex items-center justify-center text-gold text-sm font-semibold">
              ★
            </div>
            <span className="font-serif font-bold text-earth text-xl tracking-tight">
              Stellar Uzima
            </span>
          </Link>

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terra/30"
          >
            <svg
              width="20"
              height="20"
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

        {/* Drawer body */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
          {/* XLM balance if logged in */}
          {isLoggedIn && xlmBalance !== null && (
            <div className="mb-4">
              <XLMBalanceWidget balance={xlmBalance} />
            </div>
          )}

          {/* Main links */}
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors
                ${
                  pathname === link.href
                    ? "bg-terra/10 text-terra"
                    : "text-earth hover:bg-terra/5 hover:text-terra"
                }`}
            >
              {link.label}
            </a>
          ))}

          {/* Services section */}
          <div className="mt-2">
            <p className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted">
              Services
            </p>
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors
                  ${
                    pathname === link.href
                      ? "bg-terra/10 text-terra"
                      : "text-earth hover:bg-terra/5 hover:text-terra"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Drawer footer */}
        <div className="shrink-0 px-6 py-6 border-t border-terra/10 flex flex-col gap-4">
          {/* Language selector */}
          <LanguageSelector />

          {/* CTA */}
          <div className="flex flex-col gap-3">
            {!isLoggedIn && (
              <Link
                href="/signin"
                onClick={onClose}
                className="w-full text-center text-earth font-medium text-sm hover:text-terra transition-colors px-5 py-2 border border-earth/20 rounded-full"
              >
                Sign In
              </Link>
            )}
            <a
              href="#"
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
  const { isLoggedIn, xlmBalance } = useWallet();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-4 bg-cream/94 backdrop-blur-md border-b border-terra/10">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-full bg-terra flex items-center justify-center text-gold text-sm font-semibold">
            ★
          </div>
          <span className="font-serif font-bold text-earth text-xl tracking-tight">
            Stellar Uzima
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`no-underline text-sm font-medium transition-colors
                  ${
                    pathname === link.href
                      ? "text-terra border-b-2 border-terra pb-0.5"
                      : "text-muted hover:text-terra"
                  }`}
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* Services dropdown */}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="no-underline text-muted text-sm font-medium hover:text-terra transition-colors cursor-pointer flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-terra/30 rounded">
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
                className="w-48 bg-white border border-terra/10 rounded-lg shadow-lg"
              >
                {SERVICE_LINKS.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm cursor-pointer
                        ${pathname === link.href ? "text-terra font-medium" : "text-earth hover:bg-terra/10"}`}
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
        <div className="hidden md:flex items-center gap-4">
          {/* XLM balance widget — only when logged in */}
          {isLoggedIn && xlmBalance !== null && (
            <XLMBalanceWidget balance={xlmBalance} />
          )}

          <LanguageSelector />

          {!isLoggedIn && (
            <Link
              href="/signin"
              className="text-earth font-medium text-sm hover:text-terra transition-colors px-2"
            >
              Sign In
            </Link>
          )}

          <a
            href="#"
            className="bg-terra text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-earth hover:shadow-lg hover:shadow-terra/30"
          >
            Join Now
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <HamburgerButton isOpen={drawerOpen} onClick={toggleDrawer} />
      </nav>

      {/* ── Mobile drawer ── */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        xlmBalance={xlmBalance}
      />
    </>
  );
}
