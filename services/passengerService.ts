import { firestore } from '@/lib/firebase'
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { Passenger } from '@/types'

const PASSENGERS_COLLECTION = 'passengers'

export const passengerService = {
  async getPassenger(passengerId: string): Promise<Passenger | null> {
    try {
      const docRef = doc(firestore, PASSENGERS_COLLECTION, passengerId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? (docSnap.data() as Passenger) : null
    } catch (error) {
      console.error('Error getting passenger:', error)
      throw error
    }
  },

  async createPassenger(passengerId: string, data: Partial<Passenger>): Promise<void> {
    try {
      await setDoc(doc(firestore, PASSENGERS_COLLECTION, passengerId), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error('Error creating passenger:', error)
      throw error
    }
  },

  async updatePassenger(passengerId: string, data: Partial<Passenger>): Promise<void> {
    try {
      await updateDoc(doc(firestore, PASSENGERS_COLLECTION, passengerId), {
        ...data,
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error('Error updating passenger:', error)
      throw error
    }
  },
}
