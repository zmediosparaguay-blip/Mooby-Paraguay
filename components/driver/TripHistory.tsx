import React, { useState, useEffect } from 'react'
import { Trip } from '@/types'
import { tripService } from '@/services/tripService'

interface TripHistoryProps {
  driverId: string
}

export const TripHistory: React.FC<TripHistoryProps> = ({ driverId }) => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTrips()
  }, [driverId])

  const loadTrips = async () => {
    try {
      setLoading(true)
      const driverTrips = await tripService.getDriverTrips(driverId)
      setTrips(driverTrips.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()))
    } catch (err) {
      setError('Error al cargar viajes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completado' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelado' },
      in_progress: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'En progreso' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendiente' },
    }
    const config = statusConfig[status] || statusConfig.pending
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>{config.label}</span>
  }

  if (loading) return <div className="text-center py-8 text-gray-600">Cargando viajes...</div>
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>
  if (trips.length === 0) return <div className="text-center py-8 text-gray-600">No hay viajes aún</div>

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Historial de Viajes</h3>
      {trips.map((trip) => (
        <div key={trip.id} className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-medium text-gray-900">{trip.pickupLocation.address}</p>
              <p className="text-sm text-gray-600">→ {trip.dropoffLocation.address}</p>
            </div>
            {getStatusBadge(trip.status)}
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Distancia</p>
              <p className="font-semibold text-gray-900">{trip.distance.toFixed(1)} km</p>
            </div>
            <div>
              <p className="text-gray-600">Tarifa</p>
              <p className="font-semibold text-gray-900">₲{trip.fare.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Fecha</p>
              <p className="font-semibold text-gray-900">{new Date(trip.startTime).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
