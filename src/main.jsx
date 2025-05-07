import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Themes } from './components/Themes'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <BrowserRouter>
      <Themes>
         <App />
      </Themes>
      </BrowserRouter>
   </StrictMode>
)
