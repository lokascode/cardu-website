import { cn } from '@/lib/utils'

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="inline-block h-2 w-2 bg-primary" aria-hidden />
      <span className="font-mono-meta text-[11px] text-foreground">{children}</span>
    </div>
  )
}

export function EditorialHeader({
  label,
  title,
  intro,
  className,
}: {
  label: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <header className={cn('border-b border-border pb-10', className)}>
      <SectionLabel>{label}</SectionLabel>
      <h1 className="hero-title mt-6 max-w-5xl text-balance font-serif text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-8 max-w-2xl text-pretty font-serif text-xl leading-relaxed text-muted-foreground md:text-2xl">
          {intro}
        </p>
      )}
    </header>
  )
}

export function MetaRow({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-1', className)}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-3">
          {i > 0 && <span className="text-primary" aria-hidden>/</span>}
          <span className="font-mono-meta text-[10px] text-muted-foreground">
            {item}
          </span>
        </span>
      ))}
    </div>
  )
}
