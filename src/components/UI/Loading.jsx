import { Box, styled } from '@mui/material'

export default function Loading() {
   return (
      <StyledBox>
         <Spinner />
      </StyledBox>
   )
}
const Spinner = styled('div')(({ theme }) => ({
   width: 48,
   height: 48,
   border: '6px solid #e0e0e0',
   borderTop: `6px solid #FF4C00`,
   borderRadius: '50%',
   animation: 'spin 1s linear infinite',
   '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
   },
}))
const StyledBox = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '100vh',
})
