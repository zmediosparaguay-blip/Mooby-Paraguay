export interface User {
  id: string
  email: string
  name: string
  role: 'driver' | 'passenger' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface Driver extends User {
  role: 'driver'
  cedula: string
  vehicleInfo: VehicleInfo
  subscriptionStatus: 'active' | 'inactive' | 'suspended'
  subscriptionEndDate: Date
  rating: number
  totalTrips: number
  documentVerified: boolean
  identityVerified: boolean
}

export interface VehicleInfo {
  plate: string
  brand: string
  model: string
  year: number
  color: string
  insuranceExpiry: Date
}

export interface Passenger extends User {
  role: 'passenger'
  phone: string
  paymentMethods: PaymentMethod[]
  rating: number
  totalTrips: number
  identityVerified: boolean
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'wallet' | 'bank_transfer'
  isDefault: boolean
  lastFourDigits?: string
}

export interface Trip {
  id: string
  driverId: string
  passengerId: string
  pickupLocation: Location
  dropoffLocation: Location
  startTime: Date
  endTime?: Date
  distance: number
  fare: number
  paymentMethod: 'card' | 'wallet'
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  rating?: number
  review?: string
}

export interface Location {
  latitude: number
  longitude: number
  address: string
  cityZone: string
}

export interface Subscription {
  id: string
  driverId: string
  planType: 'daily' | 'weekly' | 'monthly'
  price: number
  startDate: Date
  endDate: Date
  status: 'active' | 'expired' | 'cancelled'
  autoRenew: boolean
}

export interface IdentityVerification {
  userId: string
  cedulaNumber: string
  verificationStatus: 'pending' | 'verified' | 'rejected'
  documentPhotoUrl: string
  selfiePhotoUrl: string
  verificationDate?: Date
}
