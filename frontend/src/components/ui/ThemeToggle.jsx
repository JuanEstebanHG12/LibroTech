import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks'

function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const Icon = isDark ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className={`flex size-10 cursor-pointer items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-line/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  )
}

export default ThemeToggle
