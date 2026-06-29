import React, { useState } from 'react'
import { securityService } from '@/services/securityService'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'

interface TripRequestProps {
  onSubmit: (data: any) => void
  loading?: boolean
}

export const TripRequest: React.FC<TripRequestProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupZone: '',
    dropoffAddress: '',
    dropoffZone: '',
    paymentMethod: 'card',
  })

  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const pickupZone = formData.pickupZone
      const paymentMethod = formData.paymentMethod

      if (!securityService.isPaymentMethodAllowed(paymentMethod, pickupZone)) {
        throw new Error('Pago en efectivo no permitido en esta zona por razones de seguridad')
      }

      onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al solicitar viaje')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Solicitar Viaje</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lugar de Recogida</label>
          <input
            type="text"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Tu ubicación actual"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Zona</label>
          <select
            name="pickupZone"
            value={formData.pickupZone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          >
            <option value="">Selecciona una zona</option>
            <option value="Centro">Centro</option>
            <option value="Chacarita">Chacarita</option>
            <option value="Barrio Obrero">Barrio Obrero</option>
            <option value="Vista Alegre">Vista Alegre</option>
            <option value="Bajo Mena">Bajo Mena</option>
            <option value="Otras">Otras</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
          <input
            type="text"
            name="dropoffAddress"
            value={formData.dropoffAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="¿A dónde vas?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="card">Tarjeta de Crédito/Débito</option>
            <option value="wallet">Billetera Digital</option>
            <option value="cash">Efectivo</option>
          </select>
        </div>

        {securityService.isHighRiskZone(formData.pickupZone) && (
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              ℹ️ En esta zona, solo se permiten pagos digitales por seguridad
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Solicitando...' : 'Solicitar Viaje'}
        </button>
      </form>
    </div>
  )
}
