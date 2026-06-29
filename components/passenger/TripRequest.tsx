import React, { useState } from 'react'
import { tripService } from '@/services/tripService'
import { securityService } from '@/services/securityService'

interface TripRequestProps {
  passengerId: string
  onSuccess?: (tripId: string) => void
}

export const TripRequest: React.FC<TripRequestProps> = ({ passengerId, onSuccess }) => {
  const [pickupAddress, setPickupAddress] = useState('')
  const [dropoffAddress, setDropoffAddress] = useState('')
  const [pickupZone, setPickupZone] = useState('')
  const [dropoffZone, setDropoffZone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Verificar si el método de pago es permitido
      if (!securityService.isPaymentMethodAllowed(paymentMethod, pickupZone)) {
        throw new Error('No se permite pago en efectivo en esta zona por seguridad')
      }

      const tripId = await tripService.createTrip({
        passengerId,
        pickupLocation: {
          address: pickupAddress,
          cityZone: pickupZone,
          latitude: 0, // Obtener de mapa real
          longitude: 0,
        },
        dropoffLocation: {
          address: dropoffAddress,
          cityZone: dropoffZone,
          latitude: 0,
          longitude: 0,
        },
        paymentMethod,
        startTime: new Date(),
        distance: 0, // Calcular con Maps API
        fare: 0, // Calcular según distancia
      })

      onSuccess?.(tripId)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Viaje</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ubicación de Salida</label>
          <input
            type="text"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Tu ubicación"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Zona de Salida</label>
          <input
            type="text"
            value={pickupZone}
            onChange={(e) => setPickupZone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Zona/Barrio"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ubicación de Destino</label>
          <input
            type="text"
            value={dropoffAddress}
            onChange={(e) => setDropoffAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="A dónde vas"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Zona de Destino</label>
          <input
            type="text"
            value={dropoffZone}
            onChange={(e) => setDropoffZone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Zona/Barrio"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Método de Pago</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'wallet')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="card">Tarjeta de Crédito</option>
            <option value="wallet">Billetera Digital</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Solicitando...' : 'Solicitar Viaje'}
        </button>
      </form>
    </div>
  )
}
