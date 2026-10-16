import { cn } from '@/lib/utils'
import type {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react'

/** Shared label + control wrapper for the editorial admin forms. */
export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  )
}

const controlClasses =
  'w-full border border-border bg-transparent px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50'

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClasses, className)} {...props} />
}

export function TextArea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea className={cn(controlClasses, 'min-h-24 resize-y', className)} {...props} />
  )
}

/** Primary editorial action button (sharp corners, coral fill). */
export function AdminButton({
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center px-5 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-colors disabled:opacity-50',
        variant === 'primary' &&
          'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'ghost' &&
          'border border-border text-foreground hover:bg-muted',
        className,
      )}
      {...props}
    />
  )
}

/** Aliases so form code can use Admin*-prefixed names consistently. */
export const AdminField = Field
export const AdminInput = TextInput

/** Inline status banner (error / success / info). */
export function StatusBanner({
  tone = 'error',
  children,
}: {
  tone?: 'error' | 'success' | 'info'
  children: ReactNode
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'border px-3 py-2.5 text-sm',
        tone === 'error' &&
          'border-primary/50 bg-primary/10 text-foreground',
        tone === 'success' &&
          'border-foreground/30 bg-muted text-foreground',
        tone === 'info' && 'border-border bg-muted text-muted-foreground',
      )}
    >
      {children}
    </div>
  )
}
