export const SUBSCRIPTION_PLANS = {
  DAILY: {
    type: 'daily',
    price: 15000,
    duration: 1,
    label: 'Plan Diario',
  },
  WEEKLY: {
    type: 'weekly',
    price: 90000,
    duration: 7,
    label: 'Plan Semanal',
  },
  MONTHLY: {
    type: 'monthly',
    price: 300000,
    duration: 30,
    label: 'Plan Mensual',
  },
}

export const PAYMENT_METHODS = {
  CARD: 'card',
  WALLET: 'wallet',
  CASH: 'cash',
}

export const TRIP_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const HIGH_RISK_ZONES = [
  'Chacarita',
  'Barrio Obrero',
  'Vista Alegre',
  'Bajo Mena',
]

export const ID_VERIFICATION_REQUIREMENTS = {
  CEDULA: true,
  SELFIE: true,
  FACIAL_RECOGNITION: true,
}
