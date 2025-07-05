
import { Box, styled} from '@mui/material'
import { Outlet} from 'react-router'
import VendorFooter from '../VendorFooter'
import VendorHeder from './VendorHeder'

const VendorLayout = () => {
   return (
      <StyledContainer>
     <VendorHeder/>
          <Outlet />
         <VendorFooter />
      </StyledContainer>
   )
}

export default VendorLayout

const StyledContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   minHeight: '100vh',
})

