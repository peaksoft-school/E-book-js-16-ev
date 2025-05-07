import { Box, styled, TextField, Typography } from '@mui/material'
import Button from './UI/buttons/Button'
import { Link } from 'react-router-dom'

const Mailing = () => {
   return (
      <StyledContainer>
         <Box>
            <Typography className="text">Подписаться на рассылку</Typography>
            <StyledBoxInt>
               <StyledTfield placeholder="Напишите ваш E-mail" />
               <Button>Отправить</Button>
            </StyledBoxInt>
         </Box>
         <StyledLinkBox>
            <StyledLink to="/instagram">Instagram</StyledLink>
            <StyledLink to="/facebook">Facebook</StyledLink>
            <StyledLink to="/vk">ВКонтакте</StyledLink>
         </StyledLinkBox>
      </StyledContainer>
   )
}

export default Mailing

const StyledContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: 149,
   alignItems: 'center',
   padding: 150,

   '& .text': {
      fontSize: 20,
      fontWeight: 600,
   },
})

const StyledTfield = styled(TextField)({
   width: '955px',
   '& .MuiInputBase-root': {
      height: '42px',
      boxSizing: 'border-box',
      borderRadius: 0,
   },
})

const StyledBoxInt = styled(Box)({
   display: 'flex',
   marginTop: 45,
})

const StyledLink = styled(Link)({
   color: 'black',
   textDecoration: 'none',
   fontSize: 22,
})

const StyledLinkBox = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: 200,
})
