import React, { useEffect, useState } from 'react'
import { tripService } from '@/services/tripService'
import { Trip } from '@/types'

interface TripHistoryProps {
  driverId: string
}

export const TripHistory: React.FC<TripHistoryProps> = ({ driverId }) => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTrips()
  }, [driverId])

  const loadTrips = async () => {
    try {
      setLoading(true)
      const driverTrips = await tripService.getDriverTrips(driverId)
      setTrips(driverTrips.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()))
    } catch (error) {
      console.error('Error loading trips:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Cargando historial...</div>
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Historial de Viajes</h2>

        {trips.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No hay viajes registrados</p>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Salida</p>
                    <p className="font-semibold text-gray-900">{trip.pickupLocation.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Destino</p>
                    <p className="font-semibold text-gray-900">{trip.dropoffLocation.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ganancia</p>
                    <p className="font-semibold text-green-600">{trip.fare.toLocaleString()} PYG</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                      trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                      trip.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
