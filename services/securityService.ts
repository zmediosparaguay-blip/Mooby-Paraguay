import { HIGH_RISK_ZONES, PAYMENT_METHODS } from '@/lib/constants'

export const securityService = {
  isHighRiskZone(zone: string): boolean {
    return HIGH_RISK_ZONES.includes(zone)
  },

  isPaymentMethodAllowed(paymentMethod: string, zone: string): boolean {
    if (this.isHighRiskZone(zone)) {
      return paymentMethod !== PAYMENT_METHODS.CASH
    }
    return true
  },

  validateCedulaFormat(cedula: string): boolean {
    const cedulaRegex = /^\d{1,8}(-\d{1})?$/
    return cedulaRegex.test(cedula)
  },

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?595\d{9,10}$/
    return phoneRegex.test(phone)
  },
}
