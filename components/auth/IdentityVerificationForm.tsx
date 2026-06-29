import React, { useState } from 'react'
import { identityService } from '@/services/identityService'

interface IdentityVerificationFormProps {
  userId: string
  onSuccess?: () => void
}

export const IdentityVerificationForm: React.FC<IdentityVerificationFormProps> = ({ userId, onSuccess }) => {
  const [cedulaFile, setCedulaFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [cedula, setCedula] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!cedulaFile || !selfieFile) {
        throw new Error('Por favor, sube ambas imágenes')
      }

      const cedulaUrl = await identityService.uploadDocument(userId, cedulaFile, 'cedula')
      const selfieUrl = await identityService.uploadDocument(userId, selfieFile, 'selfie')

      await identityService.createVerification({
        userId,
        cedulaNumber: cedula,
        documentPhotoUrl: cedulaUrl,
        selfiePhotoUrl: selfieUrl,
      })

      setSuccess(true)
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Verificación de Identidad</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Verificación enviada correctamente. Nos contactaremos pronto.
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Número de Cédula</label>
          <input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Foto de Cédula</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCedulaFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Selfie con Cédula</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelfieFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Verificando...' : 'Enviar Verificación'}
        </button>
      </form>
    </div>
  )
}
