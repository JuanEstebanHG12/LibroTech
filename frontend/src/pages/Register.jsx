import { useState } from 'react'
import { Link } from 'react-router-dom'
import tema from '../assets/icons/tema.svg'
import BrandMark from '../components/auth/BrandMark'
import AuthField from '../components/auth/AuthField'
import AuthButton from '../components/auth/AuthButton'

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: conectar con el endpoint de registro de la API
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-navy-900 p-4 font-sans">
      <button
        type="button"
        aria-label="Cambiar tema"
        className="absolute top-[11px] right-[11px] cursor-pointer"
      >
        <img src={tema} alt="" className="size-[15px]" />
      </button>

      <section className="w-full max-w-[421px] rounded-[4px] bg-white px-[43px] pt-[43px] pb-10">
        <BrandMark />

        <div className="pt-[47px]">
          <p className="text-[9px] leading-3 tracking-[1.6px] text-amber-brand uppercase">
            Imprenta técnica · Gestión editorial
          </p>
          <div className="flex flex-col gap-2.5 pt-3">
            <h1 className="font-display text-[36px] leading-10 font-bold text-navy-800">
              Crea tu cuenta
            </h1>
            <p className="text-[12px] leading-4 text-muted">
              Únete al equipo de LibroTech.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pt-[30px]">
          <div className="flex flex-col gap-4">
            <div className="flex gap-[11px]">
              <div className="min-w-0 flex-1">
                <AuthField
                  id="firstName"
                  label="Nombre"
                  placeholder="María"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="min-w-0 flex-1">
                <AuthField
                  id="lastName"
                  label="Apellido"
                  placeholder="García"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
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
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <AuthField
              id="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-[21px] pt-[21px]">
            <AuthButton>Crear cuenta</AuthButton>
            <p className="text-center text-[11.5px] leading-4 text-muted">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-bold text-amber-brand">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Register
