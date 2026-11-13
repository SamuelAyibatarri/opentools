/** Minimal privacy statement — required for AdSense review. */
export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          OpenTools runs entirely in your browser. Files you open in a tool are processed locally
          with Canvas and Web Workers and are never uploaded to our servers.
        </p>
        <p>
          We use non-intrusive advertising to keep the service free. Our ad provider may use cookies
          to serve relevant ads. You can block ads, dismiss the notice for your session, or support
          the project with an optional donation instead.
        </p>
        <p>No accounts, no tracking profiles, no file retention.</p>
      </div>
    </section>
  )
}
