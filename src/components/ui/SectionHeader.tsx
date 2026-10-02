import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

type SectionHeaderProps = {
  title: ReactNode
  intro?: ReactNode
  /** Extra content under the title (e.g. a CTA button). */
  children?: ReactNode
  dark?: boolean
  className?: string
}

/** Two-column header used by most sections: serif title left, intro paragraph right. */
export function SectionHeader({ title, intro, children, dark, className }: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12',
        className,
      )}
    >
      <div className="flex flex-col items-start gap-6 md:gap-8">
        <h2
          className={cn(
            'font-display text-[42px] leading-none tracking-[-0.8px] md:text-[52px] md:tracking-[-1px] lg:text-[60px] lg:tracking-[-1.2px]',
            dark ? 'text-text' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {children}
      </div>
      {intro && (
        <p
          className={cn(
            'shrink-0 text-[16px] leading-[26px] md:max-w-[400px] lg:text-[18px] lg:leading-[29px]',
            dark ? 'text-text-2' : 'text-ink-2',
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}
