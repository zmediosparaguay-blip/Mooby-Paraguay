import React, { useState } from 'react'
import { tripService } from '@/services/tripService'

interface RatingFormProps {
  tripId: string
  onSuccess?: () => void
}

export const RatingForm: React.FC<RatingFormProps> = ({ tripId, onSuccess }) => {
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await tripService.updateTrip(tripId, {
        rating,
        review,
      })
      setSuccess(true)
      onSuccess?.()
    } catch (error) {
      console.error('Error submitting rating:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Califica tu Viaje</h2>

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            ¡Gracias por tu calificación!
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Calificación</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300 transition`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Comentario</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            rows={4}
            placeholder="Comparte tu experiencia..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar Calificación'}
        </button>
      </form>
    </div>
  )
}
