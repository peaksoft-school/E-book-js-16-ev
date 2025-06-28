import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyBziE5CvfXSrUcCarzH4pyIqkrjUwgtJaI',
   authDomain: 'ebook-b16-ev.firebaseapp.com',
   projectId: 'ebook-b16-ev',
   storageBucket: 'ebook-b16-ev.firebasestorage.app',
   messagingSenderId: '462607613580',
   appId: '1:462607613580:web:f8bc740981287922b085a9',
   measurementId: 'G-VJW3Y12MCR',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)

export { auth, app, analytics }
