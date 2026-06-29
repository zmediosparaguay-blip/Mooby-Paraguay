import React, { useState } from 'react'
import { driverService } from '@/services/driverService'
import { Driver } from '@/types'

interface DriverProfileProps {
  driver: Driver
  onUpdate?: (driver: Driver) => void
}

export const DriverProfile: React.FC<DriverProfileProps> = ({ driver, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(driver)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await driverService.updateDriver(driver.id, formData)
      setIsEditing(false)
      onUpdate?.(formData)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Perfil del Conductor</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Editar
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Cédula</label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setFormData(driver)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Nombre</p>
              <p className="font-semibold text-gray-900">{driver.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{driver.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cédula</p>
              <p className="font-semibold text-gray-900">{driver.cedula}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">Viajes Totales</p>
                <p className="text-2xl font-bold text-indigo-600">{driver.totalTrips}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Calificación</p>
                <p className="text-2xl font-bold text-indigo-600">{driver.rating.toFixed(1)} ⭐</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
