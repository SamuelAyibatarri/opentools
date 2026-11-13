import { useEffect, useState } from 'react'

export function useAdBlockDetect() {
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('opentools_ad_dismissed') === 'true') {
      return
    }

    let cancelled = false

    const detect = async () => {
      // Check A: cosmetic-filter bait element
      const bait = document.createElement('div')
      bait.className = 'adsbox ad-banner pub_300x250'
      bait.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;'
      document.body.appendChild(bait)

      await new Promise((resolve) => setTimeout(resolve, 150))

      const cosmeticBlocked =
        bait.offsetHeight === 0 || window.getComputedStyle(bait).display === 'none'
      bait.remove()

      if (cosmeticBlocked) {
        if (!cancelled) setIsBlocked(true)
        return
      }

      // Check B: network-filter probe against AdSense script
      try {
        await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors',
        })
      } catch {
        if (navigator.onLine && !cancelled) {
          setIsBlocked(true)
        }
      }
    }

    detect()
    return () => {
      cancelled = true
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('opentools_ad_dismissed', 'true')
    setIsBlocked(false)
  }

  return { isBlocked, dismiss }
}
