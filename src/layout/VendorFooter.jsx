import { Box, Typography, Link, styled } from '@mui/material'

const VendorFooter = () => {
   return (
      <StyledFooterBox>
         <StyledText>
            <StyledTitle>eBooK</StyledTitle>
            <StyledTextConf>Политика конфиденциальности</StyledTextConf>
         </StyledText>
         <StyledLinksBox>
            <StyledFooterLink href="#">Свяжитесь с нами </StyledFooterLink>
            <StyledFooterLink href="#">+996 707 123 456</StyledFooterLink>
            <StyledFooterLink href="#">
               г. Бишкек ул. Исанова 45
            </StyledFooterLink>
         </StyledLinksBox>
      </StyledFooterBox>
   )
}

export default VendorFooter

const StyledFooterBox = styled(Box)({
   width: '100%',
   padding: '75px 225px 75px 80px',
   backgroundColor: '#1C1C1C',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   color: '#fff',
   textAlign: 'center',
   height: '260px',
   gap: '688px',
})

const StyledText = styled(Typography)({
   fontSize: '0.875rem',
   display: 'flex',
   flexDirection: 'column',
   gap: '47px',
   fontFamily: 'Open Sans, sans-serif',
   width: '251px',
})
const StyledTitle = styled(Typography)({
   fontSize: '25px',
   fontFamily: 'Open Sans, sans-serif',
   marginLeft: '-30px',
})
const StyledTextConf = styled(Typography)({
   width: '251px',
   marginLeft: '60px',
   fontSize: '1rem',
   fontWeight: 400,
})

const StyledLinksBox = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
})

const StyledFooterLink = styled(Link)({
   color: '#C4C4C4',
   fontSize: '0.875rem',
   fontFamily: 'Open Sans, sans-serif',
   textDecoration: 'none',
   width: '194px',
})
