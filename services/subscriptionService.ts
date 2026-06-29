import { firestore } from '@/lib/firebase'
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { Subscription } from '@/types'

const SUBSCRIPTIONS_COLLECTION = 'subscriptions'

export const subscriptionService = {
  async getSubscription(subscriptionId: string): Promise<Subscription | null> {
    try {
      const docRef = doc(firestore, SUBSCRIPTIONS_COLLECTION, subscriptionId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? (docSnap.data() as Subscription) : null
    } catch (error) {
      console.error('Error getting subscription:', error)
      throw error
    }
  },

  async createSubscription(subscriptionData: Partial<Subscription>): Promise<string> {
    try {
      const docRef = doc(collection(firestore, SUBSCRIPTIONS_COLLECTION))
      await setDoc(docRef, {
        ...subscriptionData,
        createdAt: new Date(),
        status: 'active',
      })
      return docRef.id
    } catch (error) {
      console.error('Error creating subscription:', error)
      throw error
    }
  },

  async getDriverSubscription(driverId: string): Promise<Subscription | null> {
    try {
      const q = query(
        collection(firestore, SUBSCRIPTIONS_COLLECTION),
        where('driverId', '==', driverId),
        where('status', '==', 'active')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.length > 0 ? (querySnapshot.docs[0].data() as Subscription) : null
    } catch (error) {
      console.error('Error getting driver subscription:', error)
      throw error
    }
  },

  async renewSubscription(subscriptionId: string, newEndDate: Date): Promise<void> {
    try {
      await updateDoc(doc(firestore, SUBSCRIPTIONS_COLLECTION, subscriptionId), {
        endDate: newEndDate,
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error('Error renewing subscription:', error)
      throw error
    }
  },
}
