import { firestore } from '@/lib/firebase'
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { Trip } from '@/types'

const TRIPS_COLLECTION = 'trips'

export const tripService = {
  async getTrip(tripId: string): Promise<Trip | null> {
    try {
      const docRef = doc(firestore, TRIPS_COLLECTION, tripId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? (docSnap.data() as Trip) : null
    } catch (error) {
      console.error('Error getting trip:', error)
      throw error
    }
  },

  async createTrip(tripData: Partial<Trip>): Promise<string> {
    try {
      const docRef = doc(collection(firestore, TRIPS_COLLECTION))
      await setDoc(docRef, {
        ...tripData,
        createdAt: new Date(),
        status: 'pending',
      })
      return docRef.id
    } catch (error) {
      console.error('Error creating trip:', error)
      throw error
    }
  },

  async updateTrip(tripId: string, data: Partial<Trip>): Promise<void> {
    try {
      await updateDoc(doc(firestore, TRIPS_COLLECTION, tripId), {
        ...data,
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error('Error updating trip:', error)
      throw error
    }
  },

  async getDriverTrips(driverId: string): Promise<Trip[]> {
    try {
      const q = query(
        collection(firestore, TRIPS_COLLECTION),
        where('driverId', '==', driverId)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => doc.data() as Trip)
    } catch (error) {
      console.error('Error getting driver trips:', error)
      throw error
    }
  },
}
