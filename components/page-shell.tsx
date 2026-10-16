import { cn } from '@/lib/utils'

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24', className)}>
      {children}
    </div>
  )
}
