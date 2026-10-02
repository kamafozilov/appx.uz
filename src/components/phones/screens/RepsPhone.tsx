import type { LucideIcon } from 'lucide-react'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CalendarDays,
  ChartNoAxesColumn,
  Dumbbell,
  Flame,
  MoveHorizontal,
  Play,
  Timer,
  UserRound,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { PhoneFrame } from '../PhoneFrame'
import { Ring } from '../Ring'

type Exercise = {
  name: string
  detail: string
  icon: LucideIcon
  sets: number
  done: number
  accent?: boolean
}

const exercises: Exercise[] = [
  {
    name: 'Barbell Bench Press',
    detail: '4 × 8 · 60 kg',
    icon: Dumbbell,
    sets: 4,
    done: 4,
    accent: true,
  },
  { name: 'Seated Cable Row', detail: '4 × 10 · 45 kg', icon: MoveHorizontal, sets: 4, done: 2 },
  { name: 'Shoulder Press', detail: '3 × 10 · 16 kg', icon: ArrowUpFromLine, sets: 3, done: 0 },
  { name: 'Lat Pulldown', detail: '4 × 10 · 50 kg', icon: ArrowDownToLine, sets: 4, done: 0 },
]

const sessionMeta = [
  { icon: Timer, label: '45 min' },
  { icon: Dumbbell, label: '4 moves' },
]

const tabIcons = [CalendarDays, ChartNoAxesColumn, UserRound]

function SessionCard() {
  return (
    <div className="flex w-full flex-col gap-[11.8px] rounded-[20.2px] bg-[#D7FF3F] p-[13.5px_13.5px_11.8px_13.5px] text-[#0C0C0E]">
      <div className="flex items-center justify-between gap-[8.4px]">
        <div className="flex flex-1 flex-col gap-[4.2px]">
          <p className="text-[6.7px] font-bold tracking-[0.8px] text-[#0C0C0E99]">
            TODAY'S SESSION
          </p>
          <p className="text-[18.5px]/[18px] font-extrabold tracking-[-0.7px]">
            Upper body
            <br />
            strength
          </p>
        </div>
        <Ring
          size={38.8}
          stroke={3.5}
          track="#0C0C0E1F"
          segments={[{ from: 0, to: 76, color: '#0C0C0E' }]}
        >
          <span className="text-[8.9px] font-extrabold">21%</span>
        </Ring>
      </div>
      <div className="flex items-center justify-between border-t-[0.8px] border-[#0C0C0E1F] pt-[10.1px]">
        <ul className="flex items-center gap-[10.1px]">
          {sessionMeta.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-[3.4px]">
              <Icon className="size-[10.1px]" />
              <span className="text-[8.4px] font-bold">{label}</span>
            </li>
          ))}
        </ul>
        <span className="flex items-center gap-[4.2px] rounded-full bg-[#0C0C0E] p-[6.7px_10.1px_6.7px_11.8px] text-[#D7FF3F]">
          <span className="text-[8.4px] font-bold">Start</span>
          <Play className="size-[8.4px]" />
        </span>
      </div>
    </div>
  )
}

function ExerciseRow({ name, detail, icon: Icon, sets, done, accent }: Exercise) {
  return (
    <li className="flex w-full items-center gap-[10.1px]">
      <span className="flex size-[35.4px] shrink-0 items-center justify-center rounded-[11px] bg-[#1A1A1E]">
        <Icon className={cn('size-[14.3px]', accent ? 'text-[#D7FF3F]' : 'text-white')} />
      </span>
      <span className="flex flex-1 flex-col gap-[2.5px]">
        <span className="text-[10.1px] font-semibold tracking-[-0.1px] text-white">{name}</span>
        <span className="text-[8px] font-medium text-[#86868E]">{detail}</span>
      </span>
      <span className="flex gap-[2.5px]">
        {Array.from({ length: sets }, (_, i) => (
          <span
            key={i}
            className={cn(
              'size-[5.9px] rounded-full',
              i < done ? 'bg-[#D7FF3F]' : 'bg-[#FFFFFF24]',
            )}
          />
        ))}
      </span>
    </li>
  )
}

function TabBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 flex h-[72.5px] items-start bg-linear-to-b from-[#0C0C0E00] to-[#0C0C0E] to-40% p-[11.8px_15.2px_18.5px_15.2px]">
      <div className="flex flex-1 items-center justify-between rounded-full bg-[#1E1E23] p-[4.2px]">
        <span className="flex items-center gap-[5.1px] rounded-full bg-[#D7FF3F] p-[7.6px_12.6px] text-[#0C0C0E]">
          <Flame className="size-[11px]" />
          <span className="text-[8.4px] font-bold">Today</span>
        </span>
        {tabIcons.map((Icon, i) => (
          <span key={i} className="p-[7.6px_11px]">
            <Icon className="size-[13.5px] text-[#86868E]" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function RepsPhone({ width, className }: { width?: number; className?: string }) {
  return (
    <PhoneFrame
      width={width}
      className={className}
      label="Reps app preview"
      screenClassName="bg-[#0C0C0E]"
    >
      <div className="relative flex min-h-0 w-full flex-1 flex-col gap-[15.2px] overflow-hidden p-[5.1px_15.2px_0px_15.2px]">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-[1.7px]">
            <p className="text-[8.4px] font-medium text-[#86868E]">Tue, Sep 22</p>
            <p className="text-[25.3px] font-extrabold tracking-[-0.8px] text-white">Today</p>
          </div>
          <span className="flex size-[30.3px] items-center justify-center rounded-full bg-linear-135 from-[#D7FF3F] from-15% to-[#6EE7A8] to-85% text-[11px] font-extrabold text-[#0C0C0E]">
            A
          </span>
        </div>
        <SessionCard />
        <div className="flex items-end justify-between">
          <p className="text-[12.6px] font-bold tracking-[-0.3px] text-white">Up next</p>
          <p className="text-[8px] font-medium text-[#86868E]">1 of 4 done</p>
        </div>
        <ul className="flex flex-col gap-[15.2px]">
          {exercises.map((exercise) => (
            <ExerciseRow key={exercise.name} {...exercise} />
          ))}
        </ul>
      </div>
      <TabBar />
    </PhoneFrame>
  )
}
