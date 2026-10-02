import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { focusComposerAtEnd } from './focusComposer'

type PromptComposerProps = {
  placeholder?: string
  /** Uncontrolled starting text. */
  defaultValue?: string
  /** Controlled value (pair with `onValueChange`). */
  value?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  /**
   * Focus the field (caret at the end) once the page has fully loaded and at least
   * this many ms have passed since mount — e.g. after an entrance animation.
   */
  autoFocusAfter?: number
  /** Exposes the field, e.g. to re-focus it after picking a suggestion. */
  inputRef?: RefObject<HTMLTextAreaElement | null>
  className?: string
}

function useAutoFocusAfterLoad(ref: RefObject<HTMLTextAreaElement | null>, delay?: number) {
  useEffect(() => {
    if (delay === undefined) return
    // Touch devices would pop the on-screen keyboard over the hero — skip them.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const mountedAt = performance.now()
    let timer: ReturnType<typeof setTimeout> | undefined

    const focus = () => {
      const active = document.activeElement
      const userBusy = active && active !== document.body && active !== ref.current
      const scrolledAway = window.scrollY > window.innerHeight * 0.4
      if (!userBusy && !scrolledAway) focusComposerAtEnd(ref.current)
    }
    const schedule = () => {
      timer = setTimeout(focus, Math.max(0, delay - (performance.now() - mountedAt)))
    }

    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      window.removeEventListener('load', schedule)
      clearTimeout(timer)
    }
  }, [ref, delay])
}

/*
 * Typography + padding shared by the textarea and its invisible sizer, so the sizer's
 * wrapped height is exactly the textarea's height (CSS-only auto-grow, no measuring).
 * Below md the text wraps (stacked mobile composer); from md up it stays on one line
 * next to the button, like the desktop design.
 */
const FIELD =
  'col-start-1 row-start-1 px-2.5 text-left pt-2.5 pb-1 text-[16px] leading-[23px] break-words whitespace-pre-wrap md:py-0 md:pr-2.5 md:pl-3.5 md:leading-[normal] md:break-normal md:whitespace-pre'

/** White "describe your app" bar with a gold caret and the dark "Build my app" button. */
export function PromptComposer({
  placeholder = 'Describe your app in one sentence…',
  defaultValue = '',
  value,
  onValueChange,
  onSubmit,
  autoFocusAfter,
  inputRef: externalRef,
  className,
}: PromptComposerProps) {
  const id = useId()
  const ownRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = externalRef ?? ownRef
  useAutoFocusAfterLoad(inputRef, autoFocusAfter)
  const [inner, setInner] = useState(defaultValue)
  const text = value ?? inner

  const setText = (next: string) => {
    // One sentence: pasted line breaks become spaces.
    const clean = next.replace(/\r?\n/g, ' ')
    if (value === undefined) setInner(clean)
    onValueChange?.(clean)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const prompt = text.trim()
    if (!prompt) {
      inputRef.current?.focus()
      return
    }
    onSubmit?.(prompt)
  }

  // Enter submits (Shift+Enter is ignored too — it's a one-sentence field).
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative flex w-full max-w-[640px] flex-col gap-2 rounded-[20px] bg-white p-2 md:flex-row md:items-center',
        'shadow-[0_1px_2px_#17150F14,0_24px_64px_#2A3A4A2E]',
        // Focus glow lives on its own layer: fade its opacity instead of animating box-shadow.
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:shadow-[0_24px_64px_#2A3A4A1F,0_0_0_3px_#A8782F26] before:transition-opacity before:duration-300 focus-within:before:opacity-100',
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        Describe your app
      </label>
      <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] text-left">
        <span aria-hidden className={cn(FIELD, 'invisible overflow-hidden')}>
          {(text || placeholder) + ' '}
        </span>
        <textarea
          ref={inputRef}
          id={id}
          rows={1}
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="go"
          value={text}
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            FIELD,
            'no-scrollbar min-w-0 resize-none overflow-hidden bg-transparent text-ink caret-gold outline-none placeholder:text-ink-3 focus-visible:outline-none md:overflow-x-auto',
          )}
        />
      </div>
      <button
        type="submit"
        className={cn(
          'group flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-ink px-5 py-[15px] text-[15px] font-semibold whitespace-nowrap text-white',
          'transition-[background-color,transform] duration-200 hover:bg-[#2A2720] active:scale-[0.98]',
          'md:w-auto md:rounded-[12px] md:py-3.5 md:active:scale-[0.97]',
        )}
      >
        Build my app
        <ArrowUpRight
          aria-hidden
          className="size-[17px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
    </form>
  )
}
