import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

/**
 * Campo de formulario con etiqueta, ícono opcional y, para contraseñas,
 * botón para mostrar/ocultar el valor.
 */
function AuthField({ id, label, type = 'text', icon: Icon, error, hint, ...props }) {
  const autoId = useId()
  const inputId = id ?? autoId
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm leading-5 font-medium text-ink">
        {label}
      </label>

      <div
        className={`flex h-11 items-center gap-2 rounded-md border bg-field px-3 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
          error ? 'border-danger' : 'border-line'
        }`}
      >
        {Icon && <Icon className="size-5 shrink-0 text-ink-muted" aria-hidden="true" />}
        <input
          id={inputId}
          name={id}
          type={inputType}
          aria-invalid={error ? true : undefined}
          className="min-w-0 flex-1 bg-transparent text-sm leading-5 text-ink outline-none placeholder:text-ink-muted"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={showPassword}
            className="flex size-5 shrink-0 cursor-pointer items-center justify-center text-ink-muted transition-colors hover:text-ink"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs leading-4 text-danger">{error}</p>
      ) : (
        hint && <p className="text-xs leading-[18px] text-ink-muted">{hint}</p>
      )}
    </div>
  )
}

export default AuthField
