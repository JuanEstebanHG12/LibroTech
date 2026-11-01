import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import {
  AuthButton,
  AuthField,
  AuthHeading,
  AuthLayout,
  AuthSwitch,
} from '../components/auth'
import { login as loginApi } from '../api/auth'
import { useAuth } from '../hooks'

const BRAND = {
  eyebrow: 'Imprenta técnica · Gestión editorial',
  headline: 'Una biblioteca ordenada empieza por un buen catálogo.',
  highlights: [
    'Catálogo siempre al día',
    'Géneros y editoriales bajo control',
    'Disponibilidad de cada libro en un clic',
  ],
}

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // 1. Hace POST a /api/v1/auth/login y guarda los tokens en localStorage
      await loginApi(form.email, form.password)
      // 2. Llama a getMe() en el contexto y guarda el usuario en el estado global
      await login()
    } catch (err) {
      console.error(err.message)
      setError(err.response?.data?.error || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout brand={BRAND}>
      <div className="flex flex-col gap-6">
        <AuthHeading
          eyebrow="Acceso"
          title="Bienvenido de nuevo"
          description="Ingresa tus credenciales para gestionar el catálogo."
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <AuthField
              id="email"
              label="Correo electrónico"
              type="email"
              icon={Mail}
              placeholder="tu@correo.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <AuthField
              id="password"
              label="Contraseña"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <div className="flex justify-end">
              {/* TODO: enlazar a la vista de recuperación cuando exista la ruta */}
              <button
                type="button"
                className="cursor-pointer text-xs leading-4 font-medium text-accent hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm leading-5 text-danger">
              {error}
            </p>
          )}

          <AuthButton loading={loading}>Iniciar sesión</AuthButton>
        </form>

        <AuthSwitch text="¿Aún no tienes cuenta?" linkText="Registrarse" to="/registro" />
      </div>
    </AuthLayout>
  )
}

export default Login
