import type { LucideIcon } from 'lucide-react'
import { ChartColumn, Droplet, Flame, GlassWater, House, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { PhoneFrame } from '../PhoneFrame'

type DayState = 'done' | 'today' | 'upcoming'

const week: { label: string; state: DayState }[] = [
  { label: 'M', state: 'done' },
  { label: 'T', state: 'done' },
  { label: 'W', state: 'done' },
  { label: 'T', state: 'done' },
  { label: 'F', state: 'done' },
  { label: 'S', state: 'today' },
  { label: 'S', state: 'upcoming' },
]

const tabs: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: 'Home', icon: House, active: true },
  { label: 'History', icon: ChartColumn },
]

function Glass() {
  return (
    <div className="relative h-[148.3px] w-[91px] shrink-0 overflow-hidden rounded-[11.8px_11.8px_28.7px_28.7px] bg-[#FFFFFF1A] outline-[1.3px] outline-offset-[-0.65px] outline-[#FFFFFF59]">
      <div className="absolute inset-x-0 top-[55.3px] h-[93px] bg-linear-to-b from-[#8EDBFF] to-[#3AA0FF]" />
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute top-[47.7px] left-0 h-[8.4px] w-[91px] overflow-visible"
      >
        <path d="M0 6c12-6 25-6 37-1s25 6 38 0 17-5 25-1l0 6-100 0z" fill="#8EDBFF" />
      </svg>
      <div className="absolute top-[11.8px] left-[10.1px] h-[111.2px] w-[5.1px] rounded-[2.5px] bg-[#FFFFFF2E]" />
    </div>
  )
}

function StreakCard() {
  return (
    <div className="flex w-full flex-col gap-[7.6px] rounded-[15.2px] bg-[#FFFFFF1A] p-[10.1px] backdrop-blur-[6.75px]">
      <div className="flex justify-between">
        <p className="text-[8.4px] font-bold text-white">7-day streak</p>
        <p className="text-[7.2px] font-medium text-[#FFFFFFB3]">Best: 12</p>
      </div>
      <ul className="flex justify-between">
        {week.map(({ label, state }, i) => (
          <li key={i} className="flex flex-col items-center gap-[3.4px]">
            <span
              className={cn(
                'flex size-[18.5px] items-center justify-center rounded-full',
                state === 'done' ? 'bg-[#8EDBFF]' : 'bg-[#FFFFFF1F]',
                state === 'today' && 'outline-[1.3px] outline-offset-[-0.65px] outline-white',
              )}
            >
              {state === 'done' && <Droplet className="size-[9.3px] text-[#0B2C66]" />}
            </span>
            <span
              className={cn(
                'text-[6.7px] font-semibold',
                state === 'today' ? 'text-white' : 'text-[#FFFFFFB3]',
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SipDayPhone({ width, className }: { width?: number; className?: string }) {
  return (
    <PhoneFrame
      width={width}
      className={className}
      label="SipDay app preview"
      screenClassName="bg-linear-to-b from-[#0B2C66] via-[#0F4FA8] via-55% to-[#2B8BF2]"
    >
      <div className="relative flex min-h-0 w-full flex-1 flex-col gap-[15.2px] overflow-hidden p-[6.7px_15.2px_0px_15.2px]">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-[1.7px]">
            <p className="text-[8.4px] font-medium text-[#FFFFFFB3]">Good morning, Alex</p>
            <p className="text-[23.6px] font-extrabold tracking-[-0.8px] text-white">Hydration</p>
          </div>
          <span className="flex items-center gap-[3.4px] rounded-full bg-[#FFFFFF24] p-[5.1px_8.4px]">
            <Flame className="size-[9.3px] text-[#FFC861]" />
            <span className="text-[8px] font-bold text-white">7 days</span>
          </span>
        </div>
        <div className="flex items-center gap-[15.2px]">
          <Glass />
          <div className="flex flex-1 flex-col items-start gap-[3.4px]">
            <p className="text-[28.7px]/[29px] font-extrabold tracking-[-1.2px] text-white">
              1,250
            </p>
            <p className="text-[8px] font-medium text-[#FFFFFFB3]">of 2,000 ml today</p>
            <span className="rounded-full bg-[#8EDBFF] p-[3.4px_6.7px] text-[7.2px] font-extrabold text-[#0B2C66]">
              63% · 3 to go
            </span>
          </div>
        </div>
        <StreakCard />
        <div className="flex items-center gap-[8.4px] rounded-[16.9px] bg-white p-[12.6px_13.5px] shadow-[0_8.4px_20.2px_#04122D59]">
          <span className="flex size-[27px] items-center justify-center rounded-full bg-[#0F4FA8]">
            <Plus className="size-[13.5px] text-white" />
          </span>
          <span className="flex flex-1 flex-col gap-[0.8px]">
            <span className="text-[11px] font-extrabold text-[#0B2C66]">Add a glass</span>
            <span className="text-[7.2px] font-medium text-[#4A6A99]">Log 250 ml of water</span>
          </span>
          <GlassWater className="size-[15.2px] text-[#3AA0FF]" />
        </div>
      </div>
      <div className="relative flex w-full shrink-0 items-start justify-between p-[8.4px_50.6px_18.5px_50.6px]">
        {tabs.map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            className={cn(
              'flex flex-col items-center gap-[2.5px]',
              active ? 'text-white' : 'text-[#FFFFFF80]',
            )}
          >
            <Icon className="size-[13.5px]" />
            <span className={cn('text-[6.7px]', active ? 'font-bold' : 'font-medium')}>
              {label}
            </span>
          </span>
        ))}
      </div>
    </PhoneFrame>
  )
}
