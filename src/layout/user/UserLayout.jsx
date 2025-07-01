import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import { AUTH_ACTION } from '../../store/slices/authSlice'

const UserLayout = () => {
   const dispatch = useDispatch()

   const handleLogout = () => {
      dispatch(AUTH_ACTION.logOut())
   }

   return (
      <div>
         <h1>Client</h1>
         <button onClick={handleLogout}>Выйти</button>
         <Outlet />
      </div>
   )
}

export default UserLayout
