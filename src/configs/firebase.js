import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
   apiKey: 'AIzaSyBAKupIf8_kECBMKPb7B8msUlbFnC503oQ',
   authDomain: 'ebook-js16.firebaseapp.com',
   projectId: 'ebook-js16',
   storageBucket: 'ebook-js16.firebasestorage.app',
   messagingSenderId: '279474076115',
   appId: '1:279474076115:web:b8c0b96f8972153cab5726',
   measurementId: 'G-QY0SSM6ETQ',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const analytics = getAnalytics(app)

export { auth, app, analytics }
