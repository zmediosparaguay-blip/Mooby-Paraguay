import React from 'react'
import { Subscription } from '@/types'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'

interface SubscriptionCardProps {
  subscription: Subscription | null
  onSubscribe: (planType: string) => void
  loading?: boolean
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onSubscribe,
  loading = false,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 border-green-200'
      case 'expired':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '✓ Activa'
      case 'expired':
        return '✗ Expirada'
      default:
        return 'Sin suscripción'
    }
  }

  return (
    <div className={`p-6 rounded-lg border ${subscription ? getStatusColor(subscription.status) : 'bg-blue-50 border-blue-200'}`}>
      {subscription ? (
        <>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tu Suscripción</h3>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-white">
              {getStatusText(subscription.status)}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Plan:</span> {Object.values(SUBSCRIPTION_PLANS).find(p => p.type === subscription.planType)?.label}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Precio:</span> ₲{subscription.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Vence:</span> {new Date(subscription.endDate).toLocaleDateString('es-ES')}
            </p>
          </div>

          <button
            onClick={() => onSubscribe(subscription.planType)}
            disabled={loading || subscription.status !== 'expired'}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Renovando...' : 'Renovar Suscripción'}
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Suscripción Requerida</h3>
          <p className="text-sm text-gray-600 mb-4">
            Para empezar a ganar, elige un plan de suscripción. Todos incluyen acceso ilimitado a viajes.
          </p>
          <div className="space-y-2">
            {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
              <button
                key={plan.type}
                onClick={() => onSubscribe(plan.type)}
                disabled={loading}
                className="w-full px-4 py-2 text-left bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{plan.label}</span>
                  <span className="text-indigo-600 font-semibold">₲{plan.price.toLocaleString()}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
