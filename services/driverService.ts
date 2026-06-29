import { firestore } from '@/lib/firebase'
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { Driver, Subscription } from '@/types'

const DRIVERS_COLLECTION = 'drivers'

export const driverService = {
  async getDriver(driverId: string): Promise<Driver | null> {
    try {
      const docRef = doc(firestore, DRIVERS_COLLECTION, driverId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? (docSnap.data() as Driver) : null
    } catch (error) {
      console.error('Error getting driver:', error)
      throw error
    }
  },

  async createDriver(driverId: string, data: Partial<Driver>): Promise<void> {
    try {
      await setDoc(doc(firestore, DRIVERS_COLLECTION, driverId), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error('Error creating driver:', error)
      throw error
    }
  },

  async updateDriver(driverId: string, data: Partial<Driver>): Promise<void> {
    try {
      await updateDoc(doc(firestore, DRIVERS_COLLECTION, driverId), {
        ...data,
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error('Error updating driver:', error)
      throw error
    }
  },

  async getDriversByZone(zone: string): Promise<Driver[]> {
    try {
      const q = query(
        collection(firestore, DRIVERS_COLLECTION),
        where('subscriptionStatus', '==', 'active')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => doc.data() as Driver)
    } catch (error) {
      console.error('Error getting drivers by zone:', error)
      throw error
    }
  },
}
