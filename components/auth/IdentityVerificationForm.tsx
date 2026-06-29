import React, { useState } from 'react'
import { identityService } from '@/services/identityService'
import { securityService } from '@/services/securityService'

interface IdentityVerificationFormProps {
  userId: string
  onSuccess: () => void
  onError: (error: string) => void
}

export const IdentityVerificationForm: React.FC<IdentityVerificationFormProps> = ({
  userId,
  onSuccess,
  onError,
}) => {
  const [cedula, setCedula] = useState('')
  const [cedulaFile, setCedulaFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!securityService.validateCedulaFormat(cedula)) {
        throw new Error('Formato de cédula inválido')
      }
      if (!cedulaFile) {
        throw new Error('Debe seleccionar foto de cédula')
      }
      if (!selfieFile) {
        throw new Error('Debe seleccionar selfie')
      }

      const [cedulaUrl, selfieUrl] = await Promise.all([
        identityService.uploadDocument(userId, cedulaFile, 'cedula'),
        identityService.uploadDocument(userId, selfieFile, 'selfie'),
      ])

      await identityService.createVerification({
        userId,
        cedulaNumber: cedula,
        documentPhotoUrl: cedulaUrl,
        selfiePhotoUrl: selfieUrl,
      })

      onSuccess()
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Error en verificación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          ✓ Verificamos tu identidad para garantizar seguridad en la plataforma
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cédula</label>
        <input
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Ej: 12345678 o 1234567-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Foto de Cédula</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCedulaFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
        {cedulaFile && <p className="text-sm text-green-600 mt-1">✓ {cedulaFile.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Selfie (Foto tuya)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelfieFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
        {selfieFile && <p className="text-sm text-green-600 mt-1">✓ {selfieFile.name}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
      >
        {loading ? 'Verificando...' : 'Verificar Identidad'}
      </button>
    </form>
  )
}
