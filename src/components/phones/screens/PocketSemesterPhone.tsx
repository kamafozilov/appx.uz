import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Bus,
  ChevronLeft,
  ChevronRight,
  House,
  Plus,
  ShoppingBag,
  Utensils,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { PhoneFrame } from '../PhoneFrame'
import { Ring, type RingSegment } from '../Ring'

type Category = {
  name: string
  amount: string
  icon: LucideIcon
  /** Donut arc, degrees clockwise from 12 o'clock. */
  arc: [number, number]
  /** Bar fill width in px. */
  fill: number
  color: string
  classes: { icon: string; tile: string; bar: string }
}

const categories: Category[] = [
  {
    name: 'Study',
    amount: '$46.75',
    icon: BookOpen,
    arc: [1, 55.1],
    fill: 109.6,
    color: '#8B5CF6',
    classes: { icon: 'text-[#8B5CF6]', tile: 'bg-[#8B5CF61A]', bar: 'bg-[#8B5CF6]' },
  },
  {
    name: 'Housing',
    amount: '$32.00',
    icon: House,
    arc: [57.1, 93.5],
    fill: 75,
    color: '#F59E0B',
    classes: { icon: 'text-[#F59E0B]', tile: 'bg-[#F59E0B1A]', bar: 'bg-[#F59E0B]' },
  },
  {
    name: 'Food',
    amount: '$30.70',
    icon: Utensils,
    arc: [95.5, 130.3],
    fill: 72,
    color: '#EF4444',
    classes: { icon: 'text-[#EF4444]', tile: 'bg-[#EF44441A]', bar: 'bg-[#EF4444]' },
  },
  {
    name: 'Transport',
    amount: '$28.00',
    icon: Bus,
    arc: [132.3, 163.9],
    fill: 65.6,
    color: '#3B82F6',
    classes: { icon: 'text-[#3B82F6]', tile: 'bg-[#3B82F61A]', bar: 'bg-[#3B82F6]' },
  },
  {
    name: 'Shopping',
    amount: '$24.99',
    icon: ShoppingBag,
    arc: [165.9, 194],
    fill: 58.6,
    color: '#10B981',
    classes: { icon: 'text-[#10B981]', tile: 'bg-[#10B9811A]', bar: 'bg-[#10B981]' },
  },
]

const donut: RingSegment[] = categories.map(({ arc: [from, to], color }) => ({ from, to, color }))

function NavButton({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex size-[25.3px] items-center justify-center rounded-full bg-[#F3F4F6]">
      <Icon className="size-[11.8px] text-[#111827]" />
    </span>
  )
}

function CategoryRow({ name, amount, icon: Icon, fill, classes }: Category) {
  return (
    <li className="flex items-center gap-[8.4px]">
      <span
        className={cn(
          'flex size-[25.3px] items-center justify-center rounded-[8.4px]',
          classes.tile,
        )}
      >
        <Icon className={cn('size-[11px]', classes.icon)} />
      </span>
      <span className="flex flex-1 flex-col gap-[3.4px]">
        <span className="text-[8.9px] font-semibold text-[#111827]">{name}</span>
        <span className="relative h-[3.4px] w-full rounded-[1.7px] bg-[#F1F2F4]">
          <span
            className={cn('absolute inset-y-0 left-0 rounded-[1.7px]', classes.bar)}
            style={{ width: fill }}
          />
        </span>
      </span>
      <span className="text-[8.9px] font-bold text-[#111827]">{amount}</span>
    </li>
  )
}

export function PocketSemesterPhone({ width, className }: { width?: number; className?: string }) {
  return (
    <PhoneFrame
      width={width}
      className={className}
      label="Pocket Semester app preview"
      screenClassName="bg-white"
      statusTone="dark"
    >
      <div className="relative flex min-h-0 w-full flex-1 flex-col items-center gap-[13.5px] overflow-hidden p-[5.1px_15.2px_0px_15.2px]">
        <div className="flex w-full items-center justify-between">
          <NavButton icon={ChevronLeft} />
          <div className="flex flex-col items-center gap-[0.8px]">
            <p className="text-[12.6px] font-bold tracking-[-0.3px] text-[#111827]">September</p>
            <p className="text-[7.2px] font-medium text-[#6B7280]">Student budget</p>
          </div>
          <NavButton icon={ChevronRight} />
        </div>
        <Ring
          size={148.3}
          stroke={14.83}
          track="#F1F2F4"
          segments={donut}
          contentClassName="gap-[1.7px]"
        >
          <span className="text-[7.6px] font-medium text-[#6B7280]">Spent</span>
          <span className="text-[21.1px] font-extrabold tracking-[-0.8px] text-[#111827]">
            $162.44
          </span>
          <span className="rounded-full bg-[#ECFDF5] p-[2.5px_6.7px] text-[7.2px] font-bold text-[#059669]">
            $137.56 left
          </span>
        </Ring>
        <ul className="flex w-full flex-col gap-[9.3px]">
          {categories.map((category) => (
            <CategoryRow key={category.name} {...category} />
          ))}
        </ul>
      </div>
      <span className="absolute top-[437.5px] left-[50px] z-20 flex w-[126.4px] items-center justify-center gap-[5.1px] rounded-full bg-[#111827] p-[10.1px_13.5px] text-white shadow-[0_8.4px_16.9px_#11182740]">
        <Plus className="size-[11px]" />
        <span className="text-[8.9px] font-bold">Add expense</span>
      </span>
    </PhoneFrame>
  )
}
