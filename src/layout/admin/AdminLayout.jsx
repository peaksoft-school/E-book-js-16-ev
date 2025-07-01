import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import { AUTH_ACTION } from '../../store/slices/authSlice'

const AdminLayout = () => {
   const dispatch = useDispatch()

   const handleLogout = () => {
      dispatch(AUTH_ACTION.logOut())
   }

   return (
      <div>
         <h1>Admin</h1>
         <button onClick={handleLogout}>Выйти</button>
         <Outlet />
      </div>
   )
}

export default AdminLayout
