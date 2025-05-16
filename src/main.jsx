import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Themes } from './components/Themes'
import { persistor } from './store/slices/books/store.js'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <PersistGate persister={persistor}>
            <Themes>
               <App />
            </Themes>
         </PersistGate>
      </Provider>
   </StrictMode>
)
