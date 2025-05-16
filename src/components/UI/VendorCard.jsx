import { Box, Typography, styled } from '@mui/material'

const VendorCard = ({ img, text }) => (
   <CardContainer>
      <Image src={img} alt=" " />

      <StyledText>{text}</StyledText>
   </CardContainer>
)

export default VendorCard

const CardContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   borderRadius: 0,
   boxShadow: 'none',
   width: '25rem',
   maxHeight: '20.5rem',
   backgroundColor: '#fff',
})

const Image = styled('img')({
   width: '100%',
   maxHeight: '13.2rem',
   borderRadius: 0,
   marginBottom: '12px',
})

const StyledText = styled(Typography)({
   fontSize: '1rem',
   fontWeight: 400,
   textAlign: 'start',
})
