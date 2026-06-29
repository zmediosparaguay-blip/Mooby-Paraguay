import React, { useState } from 'react'

interface RatingFormProps {
  tripId: string
  driverName: string
  onSubmit: (rating: number, review: string) => void
  loading?: boolean
}

export const RatingForm: React.FC<RatingFormProps> = ({
  tripId,
  driverName,
  onSubmit,
  loading = false,
}) => {
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(rating, review)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Calificar Viaje</h3>
      <p className="text-sm text-gray-600 mb-6">Conductor: {driverName}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Calificación</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comentario (opcional)</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Comparte tu experiencia..."
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Enviando...' : 'Enviar Calificación'}
        </button>
      </form>
    </div>
  )
}
