import React, { useEffect, useState } from 'react'
import { SUBSCRIPTION_PLANS } from '@/lib/constants'
import { subscriptionService } from '@/services/subscriptionService'
import { Subscription } from '@/types'

interface SubscriptionCardProps {
  driverId: string
  onSubscribe?: (subscription: Subscription) => void
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ driverId, onSubscribe }) => {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>('daily')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSubscription()
  }, [driverId])

  const loadSubscription = async () => {
    try {
      const subscription = await subscriptionService.getDriverSubscription(driverId)
      setCurrentSubscription(subscription)
    } catch (error) {
      console.error('Error loading subscription:', error)
    }
  }

  const handleSubscribe = async (planType: string) => {
    setLoading(true)
    try {
      const plan = Object.values(SUBSCRIPTION_PLANS).find(p => p.type === planType)
      if (!plan) throw new Error('Plan no encontrado')

      const startDate = new Date()
      const endDate = new Date(startDate.getTime() + plan.duration * 24 * 60 * 60 * 1000)

      const subscriptionId = await subscriptionService.createSubscription({
        driverId,
        planType: planType as any,
        price: plan.price,
        startDate,
        endDate,
        autoRenew: true,
      })

      const subscription = await subscriptionService.getSubscription(subscriptionId)
      if (subscription) {
        setCurrentSubscription(subscription)
        onSubscribe?.(subscription)
      }
    } catch (error) {
      console.error('Error subscribing:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Planes de Suscripción</h2>

        {currentSubscription && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600">Plan Activo:</p>
            <p className="text-lg font-semibold text-indigo-600">{SUBSCRIPTION_PLANS[currentSubscription.planType.toUpperCase() as keyof typeof SUBSCRIPTION_PLANS]?.label}</p>
            <p className="text-sm text-gray-600">Vence: {new Date(currentSubscription.endDate).toLocaleDateString()}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.label}</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-4">
                {plan.price.toLocaleString()} PYG
              </p>
              <p className="text-sm text-gray-600 mb-4">{plan.duration} día(s)</p>
              <button
                onClick={() => handleSubscribe(plan.type)}
                disabled={loading || (currentSubscription?.planType === plan.type)}
                className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : currentSubscription?.planType === plan.type ? 'Plan Actual' : 'Seleccionar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
