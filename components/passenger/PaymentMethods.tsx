import React, { useState } from 'react'
import { PaymentMethod } from '@/types'

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[]
  onAdd: (method: PaymentMethod) => void
  onRemove: (methodId: string) => void
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethods,
  onAdd,
  onRemove,
}) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'card' as const,
    lastFourDigits: '',
  })

  const handleAddMethod = () => {
    if (formData.lastFourDigits.length === 4) {
      onAdd({
        id: Date.now().toString(),
        type: formData.type,
        isDefault: paymentMethods.length === 0,
        lastFourDigits: formData.lastFourDigits,
      })
      setFormData({ type: 'card', lastFourDigits: '' })
      setShowForm(false)
    }
  }

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'card':
        return '💳'
      case 'wallet':
        return '📱'
      case 'bank_transfer':
        return '🏦'
      default:
        return '💰'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Métodos de Pago</h3>

      <div className="space-y-2 mb-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getMethodIcon(method.type)}</span>
              <div>
                <p className="font-medium text-gray-900">{method.type === 'card' ? 'Tarjeta' : method.type === 'wallet' ? 'Billetera' : 'Transferencia'}</p>
                {method.lastFourDigits && <p className="text-sm text-gray-600">•••• {method.lastFourDigits}</p>}
                {method.isDefault && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Por defecto</span>}
              </div>
            </div>
            <button
              onClick={() => onRemove(method.id)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition"
        >
          + Agregar Método de Pago
        </button>
      ) : (
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="card">Tarjeta de Crédito/Débito</option>
              <option value="wallet">Billetera Digital</option>
              <option value="bank_transfer">Transferencia Bancaria</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Últimos 4 dígitos</label>
            <input
              type="text"
              maxLength={4}
              value={formData.lastFourDigits}
              onChange={(e) => setFormData(prev => ({ ...prev, lastFourDigits: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="1234"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddMethod}
              className="flex-1 px-3 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
            >
              Agregar
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
