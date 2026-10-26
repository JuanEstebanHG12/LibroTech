import { useState } from 'react'
import { Link } from 'react-router-dom'
import moon from '../assets/icons/moon.svg'
import BrandMark from '../components/auth/BrandMark'
import AuthField from '../components/auth/AuthField'
import AuthButton from '../components/auth/AuthButton'
import { login as loginApi } from '../api/auth'
import { useAuth } from '../hooks' // Importamos el hook useAuth

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const { login } = useAuth() // Usamos el hook useAuth para obtener la función login del contexto

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
          // 1. Hace POST a /api/v1/auth/login y guarda los tokens en localStorage
          await loginApi(form.email, form.password)
          // 2. Llama a getMe() en el contexto y guarda el usuario en el estado global
          await login()
        } catch (err) {
          console.error(err.message)
          setError(err.response?.data.error || 'Error al iniciar sesión')
        }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-navy-900 p-4 font-sans">
      <button
        type="button"
        aria-label="Cambiar tema"
        className="absolute top-[11px] right-[11px] cursor-pointer"
      >
        <img src={moon} alt="" className="size-[15px]" />
      </button>

      <section className="w-full max-w-[421px] rounded-[4px] bg-white px-[43px] pt-[43px] pb-10">
        <BrandMark />

        <div className="pt-[47px]">
          <p className="text-[9px] leading-3 tracking-[1.6px] text-amber-brand uppercase">
            Imprenta técnica · Gestión editorial
          </p>
          <div className="flex flex-col gap-2.5 pt-3">
            <h1 className="font-display text-[36.5px] leading-10 font-bold text-navy-800">
              Bienvenido de nuevo
            </h1>
            <p className="text-[12px] leading-4 text-muted">
              Una biblioteca ordenada empieza por un buen catálogo.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pt-[45px]">
          <div className="flex flex-col gap-4">
            <AuthField
              id="email"
              label="Correo electrónico"
              type="email"
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
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className="pt-2 text-[11px] leading-4 text-red-600">{error}</p>
          )}

          <div className="flex flex-col gap-[21px] pt-[21px]">
            <AuthButton>Iniciar sesión</AuthButton>
            <p className="text-center text-[11.5px] leading-4 text-muted">
              ¿Aún no tienes cuenta?{' '}
              <Link to="/registro" className="font-bold text-amber-brand">
                Registrarse
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login
