import { firestore, storage } from '@/lib/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { IdentityVerification } from '@/types'

const VERIFICATIONS_COLLECTION = 'identity_verifications'

export const identityService = {
  async uploadDocument(userId: string, file: File, type: 'cedula' | 'selfie'): Promise<string> {
    try {
      const storageRef = ref(storage, `documents/${userId}/${type}/${file.name}`)
      await uploadBytes(storageRef, file)
      return await getDownloadURL(storageRef)
    } catch (error) {
      console.error('Error uploading document:', error)
      throw error
    }
  },

  async createVerification(data: Partial<IdentityVerification>): Promise<string> {
    try {
      const docRef = doc(collection(firestore, VERIFICATIONS_COLLECTION))
      await setDoc(docRef, {
        ...data,
        verificationStatus: 'pending',
        createdAt: new Date(),
      })
      return docRef.id
    } catch (error) {
      console.error('Error creating verification:', error)
      throw error
    }
  },

  async verifyIdentity(verificationId: string, isVerified: boolean): Promise<void> {
    try {
      await setDoc(doc(firestore, VERIFICATIONS_COLLECTION, verificationId), {
        verificationStatus: isVerified ? 'verified' : 'rejected',
        verificationDate: new Date(),
      }, { merge: true })
    } catch (error) {
      console.error('Error verifying identity:', error)
      throw error
    }
  },
}
