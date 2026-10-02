import type { LucideIcon } from 'lucide-react'
import { History, House, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { PhoneFrame } from '../PhoneFrame'
import { Ring } from '../Ring'

// "Before" version of SipDay: the plain first draft. Authored at 268px in the design, converted to the 236px base.

const log = ['12:40', '10:15', '08:30', '07:05', '06:50']

const tabs: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: 'Home', icon: House, active: true },
  { label: 'History', icon: History },
]

function ProgressBox() {
  return (
    <div className="flex w-full flex-col items-center gap-[8.5px] rounded-[6.8px] border-[0.9px] border-[#E4E7EB] py-[13.5px]">
      <Ring
        size={87.6}
        stroke={4.4}
        track="#E4E7EB"
        segments={[{ from: 0, to: 225, color: '#2F80ED' }]}
      >
        <span className="text-[13.5px] font-semibold text-[#1F2933]">5 / 8</span>
      </Ring>
      <p className="text-[8px] text-[#7B8794]">glasses today</p>
      <span className="flex items-center gap-[4.2px] rounded-[5px] border-[0.9px] border-[#2F80ED] p-[5.9px_11.8px] text-[#2F80ED]">
        <Plus className="size-[9.2px]" />
        <span className="text-[8.5px] font-medium">Add a glass</span>
      </span>
    </div>
  )
}

export function SipDayBeforePhone({ width, className }: { width?: number; className?: string }) {
  return (
    <PhoneFrame
      width={width}
      className={className}
      label="SipDay app preview, before the edit"
      screenClassName="bg-white"
      statusTone="dark"
    >
      <div className="relative flex min-h-0 w-full flex-1 flex-col gap-[13.5px] overflow-hidden p-[6.8px_15.1px_0px_15.1px]">
        <div className="flex flex-col gap-[1.7px]">
          <p className="text-[16.8px] font-bold text-[#1F2933]">SipDay</p>
          <p className="text-[8px] text-[#7B8794]">Friday, September 25</p>
        </div>
        <ProgressBox />
        <p className="text-[10.1px] font-semibold text-[#1F2933]">Today</p>
        <ul className="flex flex-col gap-[13.5px]">
          {log.map((time) => (
            <li
              key={time}
              className="flex h-[18.6px] items-start justify-between border-b-[0.9px] border-[#EEF0F2] text-[8.5px]"
            >
              <span className="text-[#1F2933]">250 ml</span>
              <span className="text-[#7B8794]">{time}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative flex w-full shrink-0 items-start justify-between border-t-[0.9px] border-[#E4E7EB] p-[8.5px_50.5px_18.6px_50.5px]">
        {tabs.map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            className={cn(
              'flex flex-col items-center gap-[2.6px]',
              active ? 'text-[#2F80ED]' : 'text-[#7B8794]',
            )}
          >
            <Icon className="size-[13.5px]" />
            <span className="text-[6.8px] font-medium">{label}</span>
          </span>
        ))}
      </div>
    </PhoneFrame>
  )
}
