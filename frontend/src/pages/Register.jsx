import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import {
  AuthButton,
  AuthField,
  AuthHeading,
  AuthLayout,
  AuthSwitch,
} from '../components/auth'

const MIN_PASSWORD_LENGTH = 8

const BRAND = {
  eyebrow: 'Imprenta técnica · Gestión editorial',
  headline: 'Únete al equipo de LibroTech.',
  highlights: [
    'Crea tu cuenta en menos de un minuto',
    'Trabaja el catálogo en equipo',
    'Permisos claros para cada rol',
  ],
}

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    const next = {}
    if (form.password.length < MIN_PASSWORD_LENGTH) {
      next.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`
    }
    if (form.confirmPassword !== form.password) {
      next.confirmPassword = 'Las contraseñas no coinciden'
    }
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    // TODO: conectar con el endpoint de registro de la API
  }

  return (
    <AuthLayout brand={BRAND}>
      <div className="flex flex-col gap-6">
        <AuthHeading
          eyebrow="Registro"
          title="Crea tu cuenta"
          description="Únete al equipo de LibroTech."
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AuthField
                id="firstName"
                label="Nombre"
                placeholder="María"
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
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
              autoComplete="new-password"
              hint={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres`}
              error={errors.password}
              value={form.password}
              onChange={handleChange}
              required
            />
            <AuthField
              id="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.confirmPassword}
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <AuthButton>Crear cuenta</AuthButton>
        </form>

        <AuthSwitch text="¿Ya tienes una cuenta?" linkText="Iniciar sesión" to="/login" />
      </div>
    </AuthLayout>
  )
}

export default Register
