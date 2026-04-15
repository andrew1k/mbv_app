import {Capacitor} from '@capacitor/core'
import {initializeApp} from 'firebase/app'
import {getAuth, initializeAuth, indexedDBLocalPersistence} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const api = import.meta.env.VUE_APP_API_KEY
const authDomain = import.meta.env.VUE_APP_AUTH_DOMAIN
const id = import.meta.env.VUE_APP_PROJECT_ID
const bucket = import.meta.env.VUE_APP_STORAGE_BUCKET
const messaging = import.meta.env.VUE_APP_MESSAGING_SENDER_ID
const appId = import.meta.env.VUE_APP_APP_ID
const measurement = import.meta.env.VUE_APP_MEASUREMENT_ID

// Debug: Check if env variables are loaded
console.log('Environment variables:', {
  api: !!api,
  authDomain: !!authDomain,
  id: !!id,
  bucket: !!bucket,
  messaging: !!messaging,
  appId: !!appId,
  measurement: !!measurement
})

// Validate required environment variables
if (!api || !authDomain || !id || !bucket || !messaging || !appId) {
  throw new Error('Missing required Firebase environment variables. Please check your .env file.')
}

const firebaseConfig = {
  apiKey: api,
  authDomain: authDomain,
  projectId: id,
  storageBucket: bucket,
  messagingSenderId: messaging,
  appId: appId,
  measurementId: measurement,
}


// init firebase
const app = initializeApp(firebaseConfig)

let auth
if (Capacitor.isNativePlatform()) {
  auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence,
  })
} else {
  auth = getAuth()
}
auth.languageCode = 'ru'


const db = getFirestore()

const storage = getStorage()

export {
  auth,
  db,
  storage,
}
