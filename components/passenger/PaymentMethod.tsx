import React, { useState } from 'react'
import { passengerService } from '@/services/passengerService'
import { PaymentMethod } from '@/types'

interface PaymentMethodProps {
  passengerId: string
  onUpdate?: (methods: PaymentMethod[]) => void
}

export const PaymentMethodComponent: React.FC<PaymentMethodProps> = ({ passengerId, onUpdate }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMethod, setNewMethod] = useState({
    type: 'card' as 'card' | 'wallet' | 'bank_transfer',
    lastFourDigits: '',
  })

  const handleAddPaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault()
    const method: PaymentMethod = {
      id: Math.random().toString(36).substr(2, 9),
      type: newMethod.type,
      isDefault: paymentMethods.length === 0,
      lastFourDigits: newMethod.lastFourDigits,
    }
    
    const updatedMethods = [...paymentMethods, method]
    setPaymentMethods(updatedMethods)
    
    try {
      await passengerService.updatePassenger(passengerId, {
        paymentMethods: updatedMethods,
      })
      setShowAddForm(false)
      setNewMethod({ type: 'card', lastFourDigits: '' })
      onUpdate?.(updatedMethods)
    } catch (error) {
      console.error('Error adding payment method:', error)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Métodos de Pago</h2>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Agregar
            </button>
          )}
        </div>

        {showAddForm && (
          <form onSubmit={handleAddPaymentMethod} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Tipo</label>
              <select
                value={newMethod.type}
                onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="card">Tarjeta de Crédito</option>
                <option value="wallet">Billetera Digital</option>
                <option value="bank_transfer">Transferencia Bancaria</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Últimos 4 Dígitos</label>
              <input
                type="text"
                value={newMethod.lastFourDigits}
                onChange={(e) => setNewMethod({ ...newMethod, lastFourDigits: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="1234"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Agregar
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {paymentMethods.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No tienes métodos de pago agregados</p>
        ) : (
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{method.type}</p>
                  {method.lastFourDigits && (
                    <p className="text-sm text-gray-600">****{method.lastFourDigits}</p>
                  )}
                </div>
                {method.isDefault && (
                  <span className="text-sm font-semibold text-indigo-600">Predeterminado</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
