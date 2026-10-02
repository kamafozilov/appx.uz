import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  ChartColumn,
  Check,
  CircleCheckBig,
  Droplet,
  Footprints,
  PenLine,
  Plus,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { PhoneFrame } from '../PhoneFrame'
import { Ring } from '../Ring'

/** Ring progress per day, in degrees (360 = complete). */
const week = [
  { label: 'M', date: 21, progress: 360 },
  { label: 'T', date: 22, progress: 180, today: true },
  { label: 'W', date: 23, progress: 0 },
  { label: 'T', date: 24, progress: 0 },
  { label: 'F', date: 25, progress: 0 },
  { label: 'S', date: 26, progress: 0 },
  { label: 'S', date: 27, progress: 0 },
]

type Habit = {
  name: string
  days: number
  icon: LucideIcon
  text: string
  fill: string
  ring: string
  tint: string
  done: boolean
}

const habits: Habit[] = [
  {
    name: 'Morning water',
    days: 12,
    icon: Droplet,
    text: 'text-[#2F80ED]',
    fill: 'bg-[#2F80ED]',
    ring: 'border-[#2F80ED]',
    tint: 'bg-[#D6E8FB]',
    done: true,
  },
  {
    name: 'Read 20 pages',
    days: 7,
    icon: BookOpen,
    text: 'text-[#7C5CE0]',
    fill: 'bg-[#7C5CE0]',
    ring: 'border-[#7C5CE0]',
    tint: 'bg-[#E7E0FA]',
    done: false,
  },
  {
    name: 'Evening walk',
    days: 4,
    icon: Footprints,
    text: 'text-[#E08A1E]',
    fill: 'bg-[#E08A1E]',
    ring: 'border-[#E08A1E]',
    tint: 'bg-[#FCE4CB]',
    done: false,
  },
  {
    name: 'Daily journal',
    days: 18,
    icon: PenLine,
    text: 'text-[#2E9B5F]',
    fill: 'bg-[#2E9B5F]',
    ring: 'border-[#2E9B5F]',
    tint: 'bg-[#D9F0DF]',
    done: true,
  },
]

/** September heatmap: one string per week column, one digit (intensity 0–3) per cell. */
const month = [
  '203',
  '101',
  '003',
  '030',
  '112',
  '023',
  '133',
  '320',
  '312',
  '031',
  '010',
  '030',
  '301',
  '120',
]
const heat = ['bg-[#1C1B170F]', 'bg-[#2E9B5F55]', 'bg-[#2E9B5FAA]', 'bg-[#2E9B5F]']

const tabs: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: 'Today', icon: CircleCheckBig, active: true },
  { label: 'Stats', icon: ChartColumn },
  { label: 'Settings', icon: Settings },
]

function Week() {
  return (
    <ul className="flex w-full justify-between">
      {week.map(({ label, date, progress, today }) => (
        <li key={date} className="flex flex-col items-center gap-[4.2px]">
          <span className="text-[7.2px] font-semibold text-[#7E7A70]">{label}</span>
          <Ring
            size={25.3}
            stroke={2.024}
            track="#1C1B1712"
            segments={progress ? [{ from: 0, to: progress, color: '#1C1B17' }] : []}
          >
            <span
              className={cn(
                'text-[8.4px]',
                today ? 'font-extrabold text-[#1C1B17]' : 'font-semibold text-[#7E7A70]',
              )}
            >
              {date}
            </span>
          </Ring>
        </li>
      ))}
    </ul>
  )
}

function HabitCard({ name, days, icon: Icon, text, fill, ring, tint, done }: Habit) {
  return (
    <li className={cn('flex flex-col gap-[11.8px] rounded-[18.5px] p-[11px]', tint)}>
      <div className="flex items-center justify-between">
        <span className="flex size-[25.3px] items-center justify-center rounded-full bg-[#FFFFFFB3]">
          <Icon className={cn('size-[11.8px]', text)} />
        </span>
        {done ? (
          <span className={cn('flex size-[20.2px] items-center justify-center rounded-full', fill)}>
            <Check className="size-[11px] text-white" />
          </span>
        ) : (
          <span className={cn('size-[20.2px] rounded-full border-[1.3px]', ring)} />
        )}
      </div>
      <div className="flex flex-col gap-[1.7px]">
        <span className="flex items-end gap-[2.5px]">
          <span className="text-[21.9px]/[22px] font-extrabold tracking-[-0.8px] text-[#1C1B17]">
            {days}
          </span>
          <span className="text-[7.6px] font-semibold text-[#7E7A70]">days</span>
        </span>
        <span className="text-[8.4px] font-semibold text-[#1C1B17]">{name}</span>
      </div>
    </li>
  )
}

function MonthCard() {
  return (
    <div className="flex w-full flex-col gap-[8.4px] rounded-[18.5px] bg-white p-[11.8px]">
      <div className="flex justify-between">
        <p className="text-[9.3px] font-bold text-[#1C1B17]">September</p>
        <p className="text-[7.6px] font-medium text-[#7E7A70]">86% complete</p>
      </div>
      <div className="flex justify-between">
        {month.map((col, i) => (
          <div key={i} className="flex flex-col gap-[2.5px]">
            {[...col].map((level, j) => (
              <span key={j} className={cn('size-[9.3px] rounded-[2.5px]', heat[Number(level)])} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function StreaksPhone({ width, className }: { width?: number; className?: string }) {
  return (
    <PhoneFrame
      width={width}
      className={className}
      label="Streaks app preview"
      screenClassName="bg-[#F4F1EA]"
      statusTone="dark"
    >
      <div className="relative flex min-h-0 w-full flex-1 flex-col gap-[13.5px] overflow-hidden p-[5.1px_13.5px_0px_13.5px]">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-[1.7px]">
            <p className="text-[8.4px] font-medium text-[#7E7A70]">2 of 4 done today</p>
            <p className="text-[25.3px] font-extrabold tracking-[-0.9px] text-[#1C1B17]">Streaks</p>
          </div>
          <span className="flex size-[30.3px] items-center justify-center rounded-full bg-[#1C1B17]">
            <Plus className="size-[13.5px] text-white" />
          </span>
        </div>
        <Week />
        <ul className="grid grid-cols-2 gap-[8.4px]">
          {habits.map((habit) => (
            <HabitCard key={habit.name} {...habit} />
          ))}
        </ul>
        <MonthCard />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20 flex h-[55.6px] items-start justify-between border-t-[0.8px] border-[#1C1B1712] bg-[#F4F1EAF2] p-[8.4px_28.7px_18.5px_28.7px]">
        {tabs.map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            className={cn(
              'flex flex-col items-center gap-[2.5px]',
              active ? 'text-[#1C1B17]' : 'text-[#7E7A70]',
            )}
          >
            <Icon className="size-[14.3px]" />
            <span className={cn('text-[6.7px]', active ? 'font-bold' : 'font-medium')}>
              {label}
            </span>
          </span>
        ))}
      </div>
    </PhoneFrame>
  )
}
