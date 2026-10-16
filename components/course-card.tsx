import { ArrowUpRight } from 'lucide-react'
import type { Course } from '@/lib/data'
import type { Dictionary } from '@/lib/i18n'

export function CourseCard({ course, dict }: { course: Course; dict: Dictionary }) {
  return (
    <article className="group flex flex-col border border-border p-6 transition-colors hover:border-primary">
      <div className="flex items-center justify-between">
        <span className="font-mono-meta text-[9px] text-primary">
          {course.category}
        </span>
        <span className="font-mono-meta text-[9px] text-muted-foreground">
          {course.difficulty}
        </span>
      </div>

      <h3 className="mt-5 flex items-start justify-between gap-2 font-serif text-3xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
        {course.title}
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-primary rtl:-scale-x-100"
        />
      </h3>

      <p className="mt-3 flex-1 font-serif text-base leading-relaxed text-muted-foreground">
        {course.description}
      </p>

      <dl className="mt-5 flex items-center gap-6 border-t border-border pt-4">
        <div>
          <dt className="font-mono-meta text-[9px] text-muted-foreground">{dict.academy.duration}</dt>
          <dd className="mt-0.5 font-serif text-base">{course.duration}</dd>
        </div>
        <div>
          <dt className="font-mono-meta text-[9px] text-muted-foreground">{dict.academy.instructor}</dt>
          <dd className="mt-0.5 font-serif text-base">{course.instructor}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <span className="font-mono-meta text-[9px] text-muted-foreground">
            {dict.academy.progress}
          </span>
          <span className="font-mono-meta text-[9px] text-foreground">
            {course.progress}%
          </span>
        </div>
        <div className="mt-2 h-1 w-full bg-muted">
          <div
            className="h-full bg-primary"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
    </article>
  )
}
