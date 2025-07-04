import { Outlet } from 'react-router'
import VendorHeader from './VendorHeder'
import VendorFooter from '../VendorFooter'

const VendorLayout = () => {
   return (
      <>
         <VendorHeader />
         <Outlet />
         <VendorFooter />
      </>
   )
}

export default VendorLayout
