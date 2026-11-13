import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from 'cn'

interface NavbarProps {
  dark: boolean
  onToggleTheme: () => void
}

/** Global header: wordmark, tools link, theme toggle. */
export default function Navbar({ dark, onToggleTheme }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-base font-semibold tracking-tight">
          OpenTools
        </Link>
        <Badge variant="secondary">Beta</Badge>
      </div>
      <nav className="flex items-center gap-1">
        <Link to="/tools" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          Tools
        </Link>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTheme}
          aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {dark ? <Sun /> : <Moon />}
        </Button>
      </nav>
    </header>
  )
}
