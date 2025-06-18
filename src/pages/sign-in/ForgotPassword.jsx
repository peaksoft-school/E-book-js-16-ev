import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Modal from '../../components/UI/Modal'
import { forgotPassword } from '../../store/slices/authThunk'
import { clearAuthError } from '../../store/slices/authSlice'
import { Button, Typography, styled, Stack } from '@mui/material'
import Input from '../../components/UI/Input'

const ForgotPassword = ({ onClose }) => {
   const dispatch = useDispatch()
   const [email, setEmail] = useState('')

   const { forgotPasswordStatus, forgotPasswordError, forgotPasswordSuccess } =
      useSelector((state) => state.auth)

   const handleCloseModal = () => {
      dispatch(clearAuthError())
      setEmail('')
      onClose()
   }

   const handleSendEmail = () => {
      if (!email) return
      dispatch(forgotPassword({ email }))
   }

   return (
      <Modal open={true} handleClose={handleCloseModal}>
         <StyledModalContent>
            <StyledTitle variant="h5" component="h2">
               Восстановление пароля
            </StyledTitle>

            <StyledDescription>
               Введите свой адрес электронной почты. Мы отправим вам инструкции
               по сбросу пароля.
            </StyledDescription>

            <StyledInputWrapper>
               <Input
                  type="email"
                  placeholder="ваш@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  fullWidth
               />
            </StyledInputWrapper>

            {forgotPasswordSuccess && (
               <StyledMessage type="success">
                  {forgotPasswordSuccess}
               </StyledMessage>
            )}
            {forgotPasswordError && (
               <StyledMessage type="error">{forgotPasswordError}</StyledMessage>
            )}

            <StyledButton
               variant="contained"
               onClick={handleSendEmail}
               color="primary"
               disabled={forgotPasswordStatus === 'loading'}
            >
               {forgotPasswordStatus === 'loading'
                  ? 'Отправка...'
                  : 'Отправить'}
            </StyledButton>
         </StyledModalContent>
      </Modal>
   )
}

export default ForgotPassword

const StyledModalContent = styled(Stack)({
   padding: '24px',
   gap: '20px',
   textAlign: 'center',
})

const StyledTitle = styled(Typography)({
   fontSize: '1.5rem',
   fontWeight: 600,
   color: '#333',
   marginBottom: '10px',
})

const StyledDescription = styled(Typography)({
   fontSize: '0.95rem',
   color: '#666',
   lineHeight: 1.5,
   marginBottom: '10px',
})

const StyledInputWrapper = styled('div')({
   width: '100%',
})

const StyledMessage = styled(Typography)(({ type }) => ({
   marginTop: '10px',
   fontSize: '0.9rem',
   color: type === 'success' ? '#4caf50' : '#f44336',
}))

const StyledButton = styled(Button)({
   marginTop: '20px',
   padding: '10px 20px',
   fontSize: '1rem',
})
