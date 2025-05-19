import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Themes } from './components/Themes'
import { persistor } from './store/slices/books/store.js'
import { injectStore } from './configs/axiosInstance.js'
import { store } from './store/store.js'

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
