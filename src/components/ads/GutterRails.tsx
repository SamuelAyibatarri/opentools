import AdSlot from '@/components/ads/AdSlot'

/**
 * Fixed skyscraper rails living in the empty gutters outside the centered
 * column. They never touch content — no bands, no in-section rails.
 * Only rendered on viewports wide enough to actually have gutters.
 */
export default function GutterRails() {
  return (
    <>
      <aside
        aria-label="Advertisement"
        className="fixed inset-y-0 left-0 z-10 hidden w-[calc(50%_-_32rem)] min-[1280px]:block"
      >
        <div className="flex h-full items-center justify-center p-2">
          <AdSlot
            id="ad-gutter-left"
            className="max-h-[80vh] min-h-[400px] w-full max-w-[300px] overflow-hidden"
          />
        </div>
      </aside>
      <aside
        aria-label="Advertisement"
        className="fixed inset-y-0 right-0 z-10 hidden w-[calc(50%_-_32rem)] min-[1280px]:block"
      >
        <div className="flex h-full items-center justify-center p-2">
          <AdSlot
            id="ad-gutter-right"
            className="max-h-[80vh] min-h-[400px] w-full max-w-[300px] overflow-hidden"
          />
        </div>
      </aside>
    </>
  )
}
