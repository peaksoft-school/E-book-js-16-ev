import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const PrivateRouter = ({ roles, Component, fallbackPath = '/' }) => {
   const { isAuth, role } = useSelector((state) => state.auth)

   const allowedRole = roles.includes(role?.toUpperCase())

   if (!isAuth || !allowedRole) {
      return <Navigate to={fallbackPath} replace />
   }

   return Component
}

export default PrivateRouter
