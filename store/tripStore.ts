import { create } from 'zustand'
import { Trip } from '@/types'

interface TripState {
  currentTrip: Trip | null
  trips: Trip[]
  isLoading: boolean
  error: string | null
  setCurrentTrip: (trip: Trip | null) => void
  setTrips: (trips: Trip[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useTripStore = create<TripState>((set) => ({
  currentTrip: null,
  trips: [],
  isLoading: false,
  error: null,
  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  setTrips: (trips) => set({ trips }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
