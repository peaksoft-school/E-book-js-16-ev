import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import { AUTH_ACTION } from '../../store/slices/authSlice'
import Header from '../Header'
import Footer from '../Footer'
import { Box } from '@mui/material'

const UserLayout = () => {
   const dispatch = useDispatch()

   const handleLogout = () => {
      dispatch(AUTH_ACTION.logOut())
   }

   return (
      <Box>
         <Header />
         <Outlet />
         <Footer/>
      </Box>
   )
}

export default UserLayout
