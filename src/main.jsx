import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Themes } from './components/Themes'
import { persistor, store } from './store/store.js'
import { injectStore } from './configs/axiosInstance.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

injectStore(store)

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <PersistGate persister={persistor}>
            <BrowserRouter>
               <Themes>
                  <App />
               </Themes>
            </BrowserRouter>
         </PersistGate>
      </Provider>
   </StrictMode>
)
