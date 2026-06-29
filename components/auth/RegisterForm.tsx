import React, { useState } from 'react'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { driverService } from '@/services/driverService'
import { passengerService } from '@/services/passengerService'
import { securityService } from '@/services/securityService'

interface RegisterFormProps {
  userType: 'driver' | 'passenger'
  onSuccess?: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ userType, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cedula: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validations
      if (!securityService.validateEmail(formData.email)) {
        throw new Error('Email inválido')
      }

      if (!securityService.validatePhoneNumber(formData.phone)) {
        throw new Error('Número de teléfono inválido')
      }

      if (userType === 'driver' && !securityService.validateCedulaFormat(formData.cedula)) {
        throw new Error('Formato de cédula inválido')
      }

      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const userId = userCredential.user.uid

      // Create profile
      if (userType === 'driver') {
        await driverService.createDriver(userId, {
          id: userId,
          email: formData.email,
          name: formData.name,
          role: 'driver',
          cedula: formData.cedula,
          subscriptionStatus: 'inactive',
          rating: 0,
          totalTrips: 0,
          documentVerified: false,
          identityVerified: false,
        })
      } else {
        await passengerService.createPassenger(userId, {
          id: userId,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          role: 'passenger',
          rating: 0,
          totalTrips: 0,
          identityVerified: false,
        })
      }

      onSuccess?.()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Registrarse</h2>
        <p className="text-gray-600 mb-6">Como {userType === 'driver' ? 'Conductor' : 'Pasajero'}</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+595 9 1234 5678"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        {userType === 'driver' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Cédula de Identidad</label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  )
}
