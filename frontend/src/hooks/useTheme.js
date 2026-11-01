import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

const getInitialTheme = () => {
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') return current
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Maneja el tema claro/oscuro: lo aplica en <html data-theme> y lo persiste.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage puede no estar disponible (modo privado); el tema sigue funcionando
    }
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, toggleTheme }
}
