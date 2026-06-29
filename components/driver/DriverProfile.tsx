import React, { useState } from 'react'
import { Driver } from '@/types'
import { driverService } from '@/services/driverService'

interface DriverProfileProps {
  driver: Driver
  onUpdate: () => void
}

export const DriverProfile: React.FC<DriverProfileProps> = ({ driver, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(driver)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await driverService.updateDriver(driver.id, formData)
      onUpdate()
      setIsEditing(false)
    } catch (err) {
      setError('Error al actualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Mi Perfil</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Calificación</label>
            <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
              ⭐ {driver.rating.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo</label>
            <input
              type="text"
              disabled
              value={`${driver.vehicleInfo.brand} ${driver.vehicleInfo.model}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placa</label>
            <input
              type="text"
              disabled
              value={driver.vehicleInfo.plate}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Total de viajes:</span> {driver.totalTrips}
          </p>
        </div>

        {isEditing && (
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        )}
      </form>
    </div>
  )
}
