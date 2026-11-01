import { BookOpen } from 'lucide-react'

function Logo() {
  return (
    <div className="flex items-center gap-3 rounded-md bg-auth px-4 py-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-brand text-on-brand">
        <BookOpen className="size-5" aria-hidden="true" />
      </span>
      <span className="font-display text-xl leading-7 font-semibold tracking-[-0.0125em] text-on-dark">
        LibroTech
      </span>
    </div>
  )
}

export default Logo
