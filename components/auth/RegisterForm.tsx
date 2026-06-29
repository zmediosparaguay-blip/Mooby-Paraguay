import React, { useState } from 'react'
import { securityService } from '@/services/securityService'

interface RegisterFormProps {
  userType: 'driver' | 'passenger'
  onSuccess: () => void
  onError: (error: string) => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ userType, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.name || formData.name.length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres')
      }
      if (!securityService.validateEmail(formData.email)) {
        throw new Error('Email inválido')
      }
      if (!securityService.validatePhoneNumber(formData.phone)) {
        throw new Error('Número de teléfono inválido (formato: +595...)')
      }
      if (formData.password.length < 6) {
        throw new Error('Contraseña debe tener al menos 6 caracteres')
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden')
      }

      // Firebase Auth registration aquí
      onSuccess()
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Error en registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Tu nombre completo"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="tu@email.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="+595 9XX XX XXXX"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="••••••••"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
      >
        {loading ? 'Registrando...' : `Registrarse como ${userType === 'driver' ? 'Conductor' : 'Pasajero'}`}
      </button>
    </form>
  )
}
