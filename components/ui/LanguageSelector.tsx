'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

type Language = {
  code: string
  name: string
  flag: string
  dir?: 'ltr' | 'rtl'
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: 'us' },
  { code: 'fr', name: 'Français', flag: 'fr' },
  { code: 'ar', name: 'العربية', flag: 'sa', dir: 'rtl' },
  { code: 'sw', name: 'Kiswahili', flag: 'ke' },
  { code: 'ha', name: 'Hausa', flag: 'ng' },
  { code: 'yo', name: 'Yorùbá', flag: 'ng' },
]

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Load saved language on mount
  useEffect(() => {
    const savedCode = localStorage.getItem('uzima-lang')
    if (savedCode) {
      const found = LANGUAGES.find((l) => l.code === savedCode)
      if (found) setSelectedLang(found)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (lang: Language) => {
    setSelectedLang(lang)
    setIsOpen(false)
    localStorage.setItem('uzima-lang', lang.code)
    // Here you would typically also trigger your i18n library's changeLanguage function
    // For now we just persist the selection
    document.documentElement.dir = lang.dir || 'ltr'
    document.documentElement.lang = lang.code
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-terra/20 min-h-[44px]"
      >
        <div className="relative w-6 h-4 shadow-sm rounded-sm overflow-hidden">
          <Image
            src={`https://flagcdn.com/${selectedLang.flag}.svg`}
            alt={`${selectedLang.name} flag`}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-earth hidden sm:block">
          {selectedLang.name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute top-full right-0 mt-2 w-48 bg-cream border border-terra/10 rounded-xl shadow-lg shadow-terra/10 py-1 z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={selectedLang.code === lang.code}>
              <button
                onClick={() => handleSelect(lang)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-terra/5 transition-colors text-sm
                  ${selectedLang.code === lang.code ? 'text-terra font-medium bg-terra/5' : 'text-earth'}
                `}
              >
                <div className="relative w-6 h-4 shadow-sm rounded-sm overflow-hidden flex-shrink-0">
                  <Image
                    src={`https://flagcdn.com/${lang.flag}.svg`}
                    alt={`${lang.name} flag`}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{lang.name}</span>
                {selectedLang.code === lang.code && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-auto"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
