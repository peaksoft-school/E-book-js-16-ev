import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Themes } from './components/Themes'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Themes>
         <App />
      </Themes>
   </StrictMode>
)
