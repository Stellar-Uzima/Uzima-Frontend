"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ fixed
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ reload route with locale messages
  const switchLocale = (newLocale: string) => {
    const currentPath = pathname || "/";
    const prefix = `/${locale}`;
    let rest = currentPath.startsWith(prefix)
      ? currentPath.slice(prefix.length)
      : currentPath;
    if (rest === "") rest = "/";
    const target = `/${newLocale}${rest === "/" ? "" : rest}`;
    router.push(target); // ✅ use push, not replace
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-2xl"
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div 
              role="status"
              aria-live="polite"
              className={`hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full ${
                isOnline
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
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

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex" aria-label="Select language">
                  <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
                  EN
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem role="menuitem">🇬🇧 English</DropdownMenuItem>
                <DropdownMenuItem role="menuitem">🇫🇷 Français</DropdownMenuItem>
                <DropdownMenuItem role="menuitem">🇰🇪 Kiswahili</DropdownMenuItem>
                <DropdownMenuItem role="menuitem">🇳🇬 Hausa</DropdownMenuItem>
                <DropdownMenuItem role="menuitem">🇿🇦 isiZulu</DropdownMenuItem>
                <DropdownMenuItem role="menuitem">🇲🇱 Bambara</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative" aria-label="View notifications">
              <Bell className="w-5 h-5" aria-hidden="true" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs" role="status">
                3
              </Badge>
            </Button>

            {/* Balance */}
            <div className="hidden sm:flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">
                2,847 XLM
              </span>
            </div>

            {/* Create Button */}
            <Link href={`/${locale}/create`}>
              <Button className="hidden sm:flex bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <Plus className="w-4 h-4 mr-2" />
                {t("create")}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                  aria-label="User account menu"
                >
                  <Avatar className="h-8 w-8">
                    <Image
                      src="/placeholder.svg"
                      alt="User"
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

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"

            >
              {isMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-emerald-200 py-4" 
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile primary"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-1 font-medium ${
                    pathname === item.href
                      ? "text-emerald-700 border-l-4 border-emerald-500 pl-2"
                      : "text-gray-600 hover:text-emerald-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
