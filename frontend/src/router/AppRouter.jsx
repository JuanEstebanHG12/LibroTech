import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'
import { ProtectedRoute } from './ProtectedRoute'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Books from '../pages/Books'
import MainLayout from '../layouts/MainLayout'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. RUTAS PÚBLICAS (Solo visibles SIN sesión) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
        </Route>

        {/* 2. RUTAS PRIVADAS GENERALES (Tanto USER como ADMIN) */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Books />} />
            <Route path="/generos" element={<h1>Gestión de Géneros</h1>} />

            {/* 3. RUTAS EXCLUSIVAS DE ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin/usuarios" element={<h1>Gestión de Usuarios</h1>} />
              <Route path="/admin/libros" element={<h1>Gestión de Libros</h1>} />
            </Route>

            {/* 4. Cualquier ruta desconocida redirige a "/" */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
