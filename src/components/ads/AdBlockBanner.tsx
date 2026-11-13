import { Button } from '@/components/ui/button'

interface AdBlockBannerProps {
  onDismiss: () => void
}

/**
 * Slim, dismissible notice. Never modal, never blocks the workspace.
 * Three actions: whitelist hint, donate, continue as-is.
 */
export default function AdBlockBanner({ onDismiss }: AdBlockBannerProps) {
  return (
    <div
      role="status"
      className="flex w-full flex-col gap-3 border-b border-border bg-muted/60 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-muted-foreground">
        Ad blocker detected. Ads keep OpenTools free — whitelist us, support via PayPal, or continue
        as-is.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            window.open(
              'https://support.google.com/adsense/answer/142293?hl=en',
              '_blank',
              'noopener,noreferrer',
            )
          }
        >
          Allow ads
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            window.open('https://www.paypal.me/', '_blank', 'noopener,noreferrer')
          }
        >
          Donate via PayPal
        </Button>
        <Button variant="ghost" size="sm" onClick={onDismiss}>
          Continue as-is
        </Button>
      </div>
    </div>
  )
}
