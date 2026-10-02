import type { LucideIcon } from 'lucide-react'
import { BookOpen, ChevronRight, Heart, Search, ShoppingBasket, Sunrise } from 'lucide-react'
import { cn } from '@/lib/cn'
import pancakesImg from '@/assets/img/generated-3.webp'
import chickenImg from '@/assets/img/generated-4.webp'
import saladImg from '@/assets/img/generated-5.webp'
import { PhoneFrame } from '../PhoneFrame'

const recipes = [
  { name: 'Lemon Herb Chicken', meta: 'Dinner · 40 min', image: chickenImg },
  { name: 'Garden Pasta Salad', meta: 'Lunch · 15 min', image: saladImg },
]

const tabs: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: 'Recipes', icon: BookOpen, active: true },
  { label: 'Favorites', icon: Heart },
  { label: 'List', icon: ShoppingBasket },
]

const glass = 'flex items-center backdrop-blur-[5.05px] bg-[#FFFFFF33]'

function Hero() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-[268px]">
        <img
          src={pancakesImg}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#00000059_0%,#00000000_25%,#00000000_45%,#1A0F08CC_100%)]" />
      </div>
      <div className="absolute top-[38.8px] left-[13.5px] z-20 flex w-[199.8px] justify-between text-white">
        {[Search, Heart].map((Icon, i) => (
          <span key={i} className={cn(glass, 'size-[28.7px] justify-center rounded-full')}>
            <Icon className="size-[12.6px]" />
          </span>
        ))}
      </div>
      <div className="absolute top-[156.8px] left-[15.2px] z-20 flex w-[196.5px] flex-col items-start gap-[6.7px] text-white">
        <span className={cn(glass, 'gap-[4.2px] rounded-full p-[4.2px_8.4px]')}>
          <Sunrise className="size-[8.4px]" />
          <span className="text-[7.2px] font-semibold">Breakfast · 25 min</span>
        </span>
        <p className="font-fraunces text-[21.1px]/[22px] font-semibold tracking-[-0.5px]">
          Sunday Berry
          <br />
          Pancakes
        </p>
      </div>
    </>
  )
}

function Sheet() {
  return (
    <div className="absolute inset-x-0 top-[246.1px] bottom-0 z-20 flex flex-col gap-[11.8px] rounded-t-[21.9px] bg-[#FBF7F1] p-[8.4px_15.2px_0px_15.2px]">
      <span className="mx-auto h-[3.4px] w-[28.7px] rounded-[1.7px] bg-[#2A1D1522]" />
      <div className="flex items-end justify-between">
        <p className="font-fraunces text-[13.5px] font-semibold tracking-[-0.2px] text-[#2A1D15]">
          Saved recipes
        </p>
        <p className="text-[7.6px] font-medium text-[#9A8A7C]">24 total</p>
      </div>
      <ul className="flex gap-[8.4px]">
        {recipes.map(({ name, meta, image }) => (
          <li key={name} className="flex flex-1 flex-col gap-[5.9px]">
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-[77.5px] w-full rounded-[13.5px] object-cover"
            />
            <span className="text-[8.9px]/[11px] font-semibold whitespace-normal text-[#2A1D15]">
              {name}
            </span>
            <span className="text-[7.2px] font-medium text-[#9A8A7C]">{meta}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-[8.4px] rounded-[13.5px] bg-[#F3E9DD] p-[9.3px_10.1px]">
        <span className="flex size-[25.3px] items-center justify-center rounded-[8.4px] bg-[#D9573B]">
          <ShoppingBasket className="size-[11.8px] text-white" />
        </span>
        <span className="flex flex-1 flex-col gap-[1.7px]">
          <span className="text-[8.9px] font-semibold text-[#2A1D15]">Shopping list</span>
          <span className="text-[7.2px] font-medium text-[#9A8A7C]">6 items for this week</span>
        </span>
        <ChevronRight className="size-[11.8px] text-[#9A8A7C]" />
      </div>
    </div>
  )
}

function TabBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 flex h-[53.9px] items-start justify-between border-t-[0.8px] border-[#2A1D1512] bg-[#FFFFFFF2] p-[7.6px_27px_16.9px_27px]">
      {tabs.map(({ label, icon: Icon, active }) => (
        <span
          key={label}
          className={cn(
            'flex flex-col items-center gap-[2.5px]',
            active ? 'text-[#D9573B]' : 'text-[#9A8A7C]',
          )}
        >
          <Icon className="size-[14.3px]" />
          <span className={cn('text-[6.7px]', active ? 'font-bold' : 'font-medium')}>{label}</span>
        </span>
      ))}
    </div>
  )
}

export function CrumbsPhone({ width, className }: { width?: number; className?: string }) {
  return (
    <PhoneFrame
      width={width}
      className={className}
      label="Crumbs app preview"
      screenClassName="bg-[#FBF7F1]"
      statusOverlay
      indicatorTone="dark"
    >
      <Hero />
      <Sheet />
      <TabBar />
    </PhoneFrame>
  )
}
