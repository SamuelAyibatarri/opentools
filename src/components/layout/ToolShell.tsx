import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

interface ToolShellProps {
  title: string
  description: string
  guide: ReactNode
  children: ReactNode
}

/**
 * Tool page: header + workspace + guide copy. No ads in here —
 * those live in the page gutters outside the column.
 */
export default function ToolShell({ title, description, guide, children }: ToolShellProps) {
  return (
    <div className="px-5 py-10">
      <div className="mb-8">
        <Badge variant="outline">100% client-side</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">{title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      </div>

      <section aria-label={`${title} workspace`} className="min-w-0">
        {children}
      </section>

      <section aria-label={`How ${title} works`} className="mt-12 max-w-3xl">
        {guide}
      </section>
    </div>
  )
}
