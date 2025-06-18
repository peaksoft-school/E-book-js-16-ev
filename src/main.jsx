import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Themes } from './components/Themes'
import { injectStore } from './configs/axiosInstance.js'
import { persistor, store } from './store/store.js'
import Notification from './components/Notification.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google'

injectStore(store)

const GOOGLE_CLIENT_ID =
   '886984064531-bgc4qit8ehvvp1i545c5ojdnfeh6av0k.apps.googleusercontent.com'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
         <Provider store={store}>
            <PersistGate persistor={persistor}>
               <BrowserRouter>
                  <Themes>
                     <App />

                     <Notification />
                  </Themes>
               </BrowserRouter>
            </PersistGate>
         </Provider>
      </GoogleOAuthProvider>
   </StrictMode>
)
