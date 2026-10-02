import { useState } from 'react'
import { motion } from 'motion/react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'

type FooterLink = { label: string; href: string }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Examples', href: '#examples' },
      { label: 'Gallery', href: '#examples' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Store-ready checklist', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Analytics preferences', href: '#' },
    ],
  },
]

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: "O'zbekcha" },
] as const

type LanguageCode = (typeof LANGUAGES)[number]['code']

function LanguageSwitcher() {
  const [lang, setLang] = useState<LanguageCode>('en')

  return (
    <div role="radiogroup" aria-label="Language" className="flex gap-1 rounded-full bg-stone p-1">
      {LANGUAGES.map(({ code, label }) => {
        const selected = code === lang
        return (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={selected}
            lang={code}
            onClick={() => setLang(code)}
            className={cn(
              'relative cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-200',
              selected ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
            )}
          >
            {selected && (
              <motion.span
                layoutId="footer-lang-pill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_#1A140A14]"
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-ivory px-5 pt-14 pb-9 sm:px-8 md:pt-16 md:pb-10 lg:px-12 lg:pt-[72px] xl:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 md:gap-12 lg:gap-14">
        <div className="flex flex-col gap-9 md:gap-12 lg:flex-row lg:justify-between lg:gap-8">
          <div className="flex flex-col items-start gap-3.5 lg:w-[320px]">
            <Logo />
            <p className="text-[15px] leading-[normal] text-ink-2 md:leading-normal">
              Chat your app onto your phone.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-3 gap-2 leading-[normal] md:gap-x-8 md:gap-y-10 md:leading-normal lg:flex lg:gap-24"
          >
            {COLUMNS.map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-3">
                <h2 className="text-[14px] font-semibold text-ink">{title}</h2>
                <ul className="flex flex-col gap-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-[14px] text-ink-2 transition-colors duration-200 hover:text-ink active:text-ink md:text-[15px]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col-reverse items-start gap-[18px] border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-ink-3">
            © 2026 · A product by <span className="text-ink-2">AppX Tech Group</span>
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}
