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
import { injectStoreFile } from './configs/axiosInstanceFile.js'

injectStore(store)
injectStoreFile(store)

createRoot(document.getElementById('root')).render(
   <StrictMode>
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
   </StrictMode>
)
