import { Link, useParams } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import ToolShell from '@/components/layout/ToolShell'
import { tools } from '@/data/tools'

const guides: Record<string, { body: string[] }> = {
  'expo-assets': {
    body: [
      'Drop in a high-resolution logo and get icon.png, splash assets and Android adaptive foreground and background layers sized to Expo specs.',
      'Material You layers are derived with luminance thresholding so the monochrome icon stays legible on tinted launchers.',
      'The glassmorphism variant is composited offscreen with backdrop blur, a top-left rim highlight and inner shadows, then packed with an app.json snippet into one .zip.',
    ],
  },
  halftone: {
    body: [
      'Pixels are read with ImageData so luminance and alpha are processed separately — transparent areas stay transparent.',
      'Choose dot grids, line screens or CMYK rosette angles, then tune spacing and threshold while watching edges stay clean.',
      'Export to high-DPI PNG or resolution-independent SVG for print and screen work.',
    ],
  },
  'latex-markdown': {
    body: [
      'Type on the left, read the rendered document on the right. Math is typeset live next to your prose.',
      'Documents stay in the tab — nothing is sent to a server for compilation.',
      'Export to clean HTML for the web, Markdown for portability, or a print-ready PDF for submission.',
    ],
  },
}

/** Placeholder workspace per tool — real engines land here next. */
export default function ToolPage() {
  const { slug } = useParams()
  const tool = tools.find((t) => t.slug === slug)

  if (!tool) {
    return (
      <section className="px-5 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Unknown tool</h1>
        <p className="mt-2 text-muted-foreground">That slug does not match anything in the directory.</p>
        <Link to="/tools" className={buttonVariants({ variant: 'secondary', size: 'sm' }) + ' mt-6'}>
          Back to tools
        </Link>
      </section>
    )
  }

  const guide = guides[tool.slug] ?? { body: [] }

  return (
    <ToolShell
        title={tool.title}
        description={tool.description}
        guide={
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
            {guide.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        }
      >
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <p className="font-medium">Workspace coming soon</p>
          <p className="max-w-md text-sm text-muted-foreground">
            The {tool.title.toLowerCase()} engine is next on the build list. On desktop, ads live
            only in the right sidebar — never in this panel.
          </p>
        </div>
      </ToolShell>
  )
}
