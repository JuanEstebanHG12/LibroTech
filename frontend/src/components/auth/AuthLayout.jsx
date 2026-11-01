import ThemeToggle from '../ui/ThemeToggle'
import BrandPanel from './BrandPanel'

/**
 * Estructura común de Login y Register: panel de marca + panel de formulario.
 */
function AuthLayout({ brand, children }) {
  return (
    <main className="flex min-h-screen bg-surface">
      <BrandPanel {...brand} />

      <section className="relative flex min-w-0 flex-1 items-center justify-center p-6 sm:p-12">
        <ThemeToggle className="absolute top-8 right-8" />
        <div className="w-full max-w-[400px]">{children}</div>
      </section>
    </main>
  )
}

export default AuthLayout
