import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { tools } from '@/data/tools'

/** Dedicated directory: every tool lives here, not on the landing page. */
export default function ToolsPage() {
  return (
    <section aria-label="Tool directory" className="px-5 py-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tools</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Every tool runs locally in your browser. No accounts, no uploads.
          </p>
        </div>
        <Badge variant="outline">
          {tools.length} tools · 100% client-side
        </Badge>
      </div>

      <ul className="overflow-hidden rounded-2xl border border-border">
        {tools.map((tool, i) => (
          <li key={tool.slug} className={i > 0 ? 'border-t border-border' : ''}>
            <Link
              to={tool.href}
              className="group flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-muted sm:px-5"
            >
              <span className="min-w-0">
                <span className="block text-[15px] font-medium">{tool.title}</span>
                <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                  {tool.description}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                Open
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
