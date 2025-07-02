import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const PrivateRouter = ({ roles, Component, fallbackPath = '/' }) => {
   // const { role } = useSelector((state) => state.auth)
   const role = 'VENDOR'

   const allowedRole = roles.includes(role?.toUpperCase())

   if (!allowedRole) {
      return <Navigate to={fallbackPath} replace />
   }

   return Component
}

export default PrivateRouter
