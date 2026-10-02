import type { ReactNode } from 'react'
import { ArrowUpRight, CircleCheck, Mic, Plus, ShoppingBasket } from 'lucide-react'
import thumbHome from '@/assets/img/generated-3.webp'
import thumbRecipes from '@/assets/img/generated-4.webp'
import thumbFavorites from '@/assets/img/generated-5.webp'
import { cn } from '@/lib/cn'

const glassLabel = 'text-center text-white drop-shadow-[0_1px_3px_#00000052]'

/** Translucent frosted panel shared by the first two cards. */
function FrostedPanel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex w-[252px] flex-col gap-2 rounded-[22px] bg-white/[0.22] p-2 shadow-[0_20px_40px_#1A140A26] ring-1 ring-white/45 backdrop-blur-[14px] ring-inset">
      <p className={cn(glassLabel, 'text-[13px] font-medium')}>{label}</p>
      {children}
    </div>
  )
}

const PLAN = ['4 screens planned', 'Warm colors, serif titles'] as const

export function DescribeOverlay() {
  return (
    <FrostedPanel label="Your idea">
      <div className="flex flex-col gap-3.5 rounded-[15px] bg-white p-3.5">
        <p className="text-[13px] leading-5 text-ink">
          A recipe box with photos, favorites and a shopping list for the week
        </p>
        <div className="flex items-center justify-between">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#F2EEE7]">
            <Mic className="size-[14px] text-ink-2" />
          </span>
          <span className="flex items-center gap-[5px] rounded-full bg-ink px-3 py-[7px] text-[12px] font-semibold text-white">
            Build my app
            <ArrowUpRight className="size-3" />
          </span>
        </div>
      </div>
      <ul className="flex flex-col gap-1.5 px-2 pt-1.5 pb-2">
        {PLAN.map((item) => (
          <li key={item} className="flex items-center gap-[7px] text-[12px] font-medium text-white">
            <CircleCheck className="size-[13px] shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </FrostedPanel>
  )
}

type ScreenItem = { name: string; meta: string; thumb?: string }

const SCREENS: ScreenItem[] = [
  { name: 'Home', meta: 'Recipe of the day', thumb: thumbHome },
  { name: 'Recipes', meta: '24 saved', thumb: thumbRecipes },
  { name: 'Favorites', meta: '6 recipes', thumb: thumbFavorites },
  { name: 'Shopping list', meta: '6 items this week' },
]

export function PhoneOverlay() {
  return (
    <FrostedPanel label="Project screens">
      <ul className="flex flex-col gap-0.5 rounded-[15px] bg-white p-1.5">
        {SCREENS.map((screen) => (
          <li key={screen.name} className="flex items-center gap-2.5 p-2">
            <span className="flex size-[30px] shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-[#F2EEE7]">
              {screen.thumb ? (
                <img
                  src={screen.thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              ) : (
                <ShoppingBasket className="size-[15px] text-[#D9573B]" />
              )}
            </span>
            <span className="flex flex-col gap-px">
              <span className="text-[13px] font-semibold text-ink">{screen.name}</span>
              <span className="text-[11px] text-ink-3">{screen.meta}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className={cn(glassLabel, 'text-[12px] font-medium')}>Open in Expo Go</p>
    </FrostedPanel>
  )
}

export function ChangeOverlay() {
  return (
    <div className="w-[300px] overflow-hidden rounded-l-[18px] bg-white shadow-[0_20px_40px_#3A1A0A40]">
      <p className="bg-[#D9773F] px-3.5 py-2.5 text-[13px] font-semibold text-white">
        What should change?
      </p>
      <div className="flex flex-col gap-3.5 p-3.5">
        <p className="text-[13px] leading-5 text-ink-2">
          Make the recipe cards bigger and add a dark mode…
        </p>
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full ring-1 ring-line ring-inset">
            <Plus className="size-3 text-ink-2" />
          </span>
          <span className="rounded-full bg-[#F2EEE7] px-2.5 py-[5px] text-[12px] font-medium text-ink-2">
            Apply changes
          </span>
        </div>
      </div>
    </div>
  )
}
