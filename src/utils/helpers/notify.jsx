import { styled, Typography } from '@mui/material'
import { toast } from 'react-toastify'

const notify = ({
   message = 'Successfully',
   type = 'success',
   duration = 50000,
} = {}) => {
   toast[type](
      <StyledMessage>{message}</StyledMessage>,

      {
         autoClose: duration,
         closeOnClick: true,
      }
   )
}

export default notify

const StyledMessage = styled(Typography)(() => ({
   width: '100%',
   height: '100%',
   wordWrap: 'break-word',
   color: '#646464',
   fontSize: '1rem',
   fontWeight: 400,
   fontFamily: 'Poppins',
   textOverflow: 'ellipsis',
   overflow: 'hidden',
}))
