import { Box } from '@mui/material'
import InnerPageCardComponent from '../../components/UI/innerpagecoms/InnerPageCardComponent'

const UserInnerPage = () => {
   return (
      <Box sx={{marginLeft: '80px', marginRight: '80px' }}>
         <InnerPageCardComponent role="client" />
      </Box>
   )
}

export default UserInnerPage
