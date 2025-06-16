// import './App.css'
// import AppRouter from './routes/AppRouter'

// const App = () => <AppRouter />

// export default App

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from './store/authSlice'
import AppRouter from './routes/AppRouter'

const App = () => {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(
         loginSuccess({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDg1OTc5MDYsImV4cCI6MTc0ODYzMzkwNn0.fO1E9eHV_kLWVMN7pLZ5ffGjX1bzM-rnywGp0DNaggI',
            user: {
               id: 1,
               name: 'Admin',
            },
         })
      )
   }, [dispatch])

   return (
      <div>
         {/* <Header /> */}
         <AppRouter />
         {/* <ApplicationCard/> */}
      </div>
   )
}

export default App