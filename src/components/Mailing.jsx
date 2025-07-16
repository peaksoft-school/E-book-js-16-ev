import {
   Box,
   styled,
   TextField,
   Typography,
   CircularProgress,
   Alert,
} from '@mui/material'
import Button from './UI/buttons/Button'
import { Link } from 'react-router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserToMailList } from '../store/user/mailingThunk'
import notify from '../utils/helpers/notify'

const Mailing = () => {
   const [email, setEmail] = useState('')
   const dispatch = useDispatch()
   const { isLoading, error, successMessage } = useSelector(
      (state) => state.mailing
   )

   const handleSubmit = () => {
      if (!email) return
      dispatch(addUserToMailList({ email }))
      setEmail('')
      notify({ message: successMessage })
   }

   return (
      <StyledContainer>
         <Box>
            <Typography className="text">Подписаться на рассылку</Typography>

            <StyledBoxInt>
               <StyledTfield
                  placeholder="Напишите ваш E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                     <CircularProgress size={20} color="inherit" />
                  ) : (
                     'Отправить'
                  )}
               </Button>
            </StyledBoxInt>

            {error && (
               <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
               </Alert>
            )}
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
