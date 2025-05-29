// import './App.css'

// const App = () => {}

// export default App

import Applications from './pages/Applications'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from './store/authSlice'
import Header from './layout/Header'

const App = () => {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(
         loginSuccess({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDgwMDMxNTcsImV4cCI6MTc0ODAzOTE1N30.eNUI7XGcQsZyxjrdq4KwVzMMTsfA8B6V3x__1RiTRN4',
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
         <Applications />
      </div>
   )
}

export default App