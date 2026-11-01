import { Check } from 'lucide-react'
import decorGold from '../../assets/auth/decor-gold.svg'
import decorNavy from '../../assets/auth/decor-navy.svg'
import Logo from './Logo'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * Panel izquierdo (solo desktop) con la propuesta de valor de LibroTech.
 */
function BrandPanel({ eyebrow, headline, highlights = [] }) {
  return (
    <aside className="relative hidden w-1/2 shrink-0 flex-col justify-between overflow-hidden bg-auth p-12 lg:flex">
      <img
        src={decorGold}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[520px] left-[380px] size-[560px] max-w-none"
      />
      <img
        src={decorNavy}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-[170px] -left-[140px] size-[420px] max-w-none"
      />

      <div className="relative self-start">
        <Logo />
      </div>

      <div className="relative flex flex-col gap-5">
        <p className="text-xs leading-4 font-semibold tracking-[0.08em] text-brand uppercase">
          {eyebrow}
        </p>
        <h2 className="font-display text-[44px] leading-[52px] font-semibold tracking-[-0.015em] text-on-dark">
          {headline}
        </h2>
        <ul className="flex flex-col gap-3">
          {highlights.map((text) => (
            <li key={text} className="flex items-center gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-base leading-6 text-on-dark-muted">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-xs leading-4 text-on-dark-muted">
        © {CURRENT_YEAR} LibroTech · Gestión editorial
      </p>
    </aside>
  )
}

export default BrandPanel
