import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'
import { logOut } from '../../store/slices/authSlice'

const VendorLayout = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = () => {
      dispatch(logOut())
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      navigate('/sign-in')
   }

   return (
      <div>
         <h1>Vendor</h1>
         <button onClick={handleLogout}>Выйти</button>
         <Outlet />
      </div>
   )
}

export default VendorLayout
