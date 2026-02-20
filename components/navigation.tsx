'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import LanguageSelector from '@/components/ui/LanguageSelector'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-12 py-4 bg-cream/94 backdrop-blur-md border-b border-terra/10">
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <div className="w-9 h-9 rounded-full bg-terra flex items-center justify-center text-gold text-sm font-semibold">
          ★
        </div>
        <span className="font-serif font-bold text-earth text-xl tracking-tight">
          Stellar Uzima
        </span>
      </a>

      <ul className="flex items-center gap-8 list-none">
        <li>
          <a href="#how" className="no-underline text-muted text-sm font-medium hover:text-terra transition-colors">
            How it Works
          </a>
        </li>
        <li>
          <a href="#earn" className="no-underline text-muted text-sm font-medium hover:text-terra transition-colors">
            Earn
          </a>
        </li>
        <li>
          <a href="#community" className="no-underline text-muted text-sm font-medium hover:text-terra transition-colors">
            Community
          </a>
        </li>
        <li>
          <a href="#blockchain" className="no-underline text-muted text-sm font-medium hover:text-terra transition-colors">
            Blockchain
          </a>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="no-underline text-muted text-sm font-medium hover:text-terra transition-colors cursor-pointer flex items-center gap-1">
                Services
                <span className="text-xs">▼</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-terra/10 rounded-lg shadow-lg">
              <DropdownMenuItem asChild>
                <Link href="/services/knowledge-sharing" className="flex items-center gap-2 px-4 py-2 text-sm text-earth hover:bg-terra/10 cursor-pointer">
                  Knowledge Sharing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/consultations" className="flex items-center gap-2 px-4 py-2 text-sm text-earth hover:bg-terra/10 cursor-pointer">
                  Consultations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/xlm-rewards" className="flex items-center gap-2 px-4 py-2 text-sm text-earth hover:bg-terra/10 cursor-pointer">
                  XLM Rewards
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <LanguageSelector />
        <a
          href="#"
          className="bg-terra text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-earth hover:shadow-lg hover:shadow-terra/30"
        >
          Join Now
        </a>
      </div>
    </nav>
  )
}
