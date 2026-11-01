import { Link } from 'react-router-dom'

function AuthSwitch({ text, linkText, to }) {
  return (
    <p className="flex justify-center gap-1 text-sm leading-5 text-ink-soft">
      {text}
      <Link to={to} className="font-semibold text-accent hover:underline">
        {linkText}
      </Link>
    </p>
  )
}

export default AuthSwitch
