import { Outlet } from 'react-router'

const VendorLayout = () => {
   return (
      <div>
         <h1>Vendor</h1>

         <Outlet />
      </div>
   )
}

export default VendorLayout
