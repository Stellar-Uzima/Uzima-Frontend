"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Bell,
  Globe,
  Wifi,
  WifiOff,
  Star,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export function Navigation() {
  const isOnline = useNetworkStatus();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname || "/";
    const prefix = `/${locale}`;
    let rest = currentPath.startsWith(prefix)
      ? currentPath.slice(prefix.length)
      : currentPath;
    if (rest === "") rest = "/";
    const target = `/${newLocale}${rest === "/" ? "" : rest}`;
    router.push(target); 
  };

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/telemedicine`, label: t("telemedicine") },
    { href: `/${locale}/traditional-medicine`, label: t("traditional") },
    { href: `/${locale}/medical-records`, label: t("records") },
    { href: `/${locale}/education`, label: t("education") },
    { href: `/${locale}/community`, label: t("community") },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-emerald-200 sticky top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[60] bg-emerald-600 text-white px-4 py-2 rounded-md shadow-lg"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-2xl"
              role="img"
              aria-label="Stellar Uzima Health Heart Logo"
            >
              🏥
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Stellar Uzima
              </h1>
              <p className="text-xs text-emerald-600 hidden sm:block">
                Healthcare • Ubuntu • Innovation
              </p>
            </div>
          </Link>

          <nav
            className="hidden lg:flex items-center space-x-8"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors ${active
                    ? "text-emerald-700 border-b-2 border-emerald-500 pb-1"
                    : "text-gray-600 hover:text-emerald-600"
                    }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div
              className={`hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full ${isOnline
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
                }`}
              role="status"
              aria-label={`Network status: ${isOnline ? t("online") : t("offline")}`}
            >
              {isOnline ? (
                <Wifi className="w-4 h-4" aria-hidden="true" />
              ) : (
                <WifiOff className="w-4 h-4" aria-hidden="true" />
              )}
              <span className="text-sm font-medium">
                {isOnline ? t("online") : t("offline")}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex"
                  aria-label="Switch Language"
                >
                  <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
                  {locale.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => switchLocale("en")}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("fr")}>
                  🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("sw")}>
                  🇰🇪 Kiswahili
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="relative"
              aria-label="View Notifications"
            >
              <Bell className="w-5 h-5" aria-hidden="true" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>

            <div
              className="hidden sm:flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full"
              aria-label={`Wallet balance: 2,847 XLM`}
              role="status"
            >
              <Star className="w-4 h-4 text-yellow-600" aria-hidden="true" />
              <span className="text-sm font-medium text-yellow-700">
                2,847 XLM
              </span>
            </div>

            <Link href={`/${locale}/create`}>
              <Button className="hidden sm:flex bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <Plus className="w-4 h-4 mr-2" />
                {t("create")}
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                  aria-label="User Account Menu"
                >
                  <Avatar className="h-8 w-8">
                    <Image
                      src="/placeholder.svg"
                      alt="Profile picture"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Dr. Amina Hassan
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      amina@stellaruzima.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-emerald-200 py-4"
            >
              <nav
                className="flex flex-col space-y-4"
                aria-label="Mobile Navigation"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2 py-1 font-medium ${pathname === item.href
                      ? "text-emerald-700 border-l-4 border-emerald-500 pl-2"
                      : "text-gray-600 hover:text-emerald-600"
                      }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
