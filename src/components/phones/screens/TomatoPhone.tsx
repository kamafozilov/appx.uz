import { Flame, Play, RotateCcw, SkipForward } from 'lucide-react'
import { cn } from '@/lib/cn'
import { PhoneFrame } from '../PhoneFrame'

const modes = ['Focus', 'Short break', 'Long break']

/** Today's sessions: true = completed (long pill), false = remaining (short pill). */
const sessions = [true, true, true, false, false]

const DIAL = 180.4
const TICK_RADIUS = 85.1
/** 60 dots around the dial; every 5th is a larger, brighter major tick. */
const ticks = Array.from({ length: 60 }, (_, i) => {
  const angle = (i / 60) * 2 * Math.PI
  return {
    cx: DIAL / 2 + TICK_RADIUS * Math.sin(angle),
    cy: DIAL / 2 - TICK_RADIUS * Math.cos(angle),
    major: i % 5 === 0,
  }
})

function Dial() {
  return (
    <div className="relative size-[180.4px] shrink-0">
      <svg viewBox={`0 0 ${DIAL} ${DIAL}`} className="absolute inset-0 size-full">
        {ticks.map(({ cx, cy, major }, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={major ? 2.1 : 1.1}
            fill={major ? '#FFFFFF' : '#FFFFFF8C'}
          />
        ))}
      </svg>
      <div className="absolute inset-[19.4px] rounded-full bg-[#FFFFFF1F]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[1.7px]">
        <span className="text-[42.1px]/[42px] font-extrabold tracking-[-1.9px] text-white">
          25:00
        </span>
        <span className="text-[8.4px] font-semibold text-[#FFFFFFCC]">Focus session</span>
      </div>
    </div>
  )
}

function Controls() {
  return (
    <div className="flex items-center gap-[18.5px] text-white">
      <span className="flex size-[38.8px] items-center justify-center rounded-full bg-[#FFFFFF2E]">
        <RotateCcw className="size-[14.3px]" />
      </span>
      <span className="flex size-[64.1px] items-center justify-center rounded-full bg-white shadow-[0_10.1px_20.2px_#7A140840]">
        <Play className="size-[21.9px] text-[#E8452F]" />
      </span>
      <span className="flex size-[38.8px] items-center justify-center rounded-full bg-[#FFFFFF2E]">
        <SkipForward className="size-[14.3px]" />
      </span>
    </div>
  )
}

export function TomatoPhone({ width, className }: { width?: number; className?: string }) {
  return (
    <PhoneFrame
      width={width}
      className={className}
      label="Tomato app preview"
      screenClassName="bg-linear-to-b from-[#F2604A] to-[#D93A26]"
    >
      <div className="relative flex min-h-0 w-full flex-1 flex-col items-center gap-[18.5px] overflow-hidden p-[6.7px_15.2px_25.3px_15.2px]">
        <div className="flex w-full items-center justify-between text-white">
          <p className="text-[16.9px] font-extrabold tracking-[-0.5px]">Tomato</p>
          <span className="flex items-center gap-[4.2px] rounded-full bg-[#FFFFFF2E] p-[4.2px_8.4px]">
            <Flame className="size-[9.3px]" />
            <span className="text-[7.6px] font-bold">3 of 5</span>
          </span>
        </div>
        <ul className="flex rounded-full bg-[#0000001F] p-[2.5px]">
          {modes.map((mode, i) => (
            <li
              key={mode}
              className={cn(
                'rounded-full p-[5.9px_10.1px] text-[7.6px] font-bold',
                i === 0 ? 'bg-white text-[#E8452F]' : 'text-[#FFFFFFCC]',
              )}
            >
              {mode}
            </li>
          ))}
        </ul>
        <Dial />
        <ul className="flex gap-[5.9px]">
          {sessions.map((done, i) => (
            <li
              key={i}
              className={cn(
                'h-[5.1px] rounded-[2.5px]',
                done ? 'w-[15.2px] bg-white' : 'w-[6.7px] bg-[#FFFFFF59]',
              )}
            />
          ))}
        </ul>
        <div className="flex-1" />
        <Controls />
        <p className="text-[8px] font-medium text-[#FFFFFFCC]">Next up: 5 min break</p>
      </div>
    </PhoneFrame>
  )
}
