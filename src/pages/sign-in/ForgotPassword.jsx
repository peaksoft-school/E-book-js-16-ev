import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Modal from '../../components/UI/Modal'
import { forgotPassword } from '../../store/slices/authThunk'
import { Button, Typography, styled, Stack } from '@mui/material'
import Input from '../../components/UI/Input'
import * as Yup from 'yup'

const ForgotPassword = ({ onClose }) => {
   const dispatch = useDispatch()
   const [email, setEmail] = useState('')

   const [validationErrors, setValidationErrors] = useState({})

   const { forgotPasswordStatus, forgotPasswordError, forgotPasswordSuccess } =
      useSelector((state) => state.auth)

   const handleCloseModal = () => {
      dispatch(clearAuthError())
      setValidationErrors({})
      setEmail('')
      onClose()
   }

   const validationSchema = Yup.object({
      email: Yup.string()
         .email('Введите корректный email')
         .required('Email обязателен для заполнения'),
   })

   const handleSendEmail = () => {
      setValidationErrors({})

      const formData = { email }

      validationSchema
         .validate(formData, { abortEarly: false })
         .then(() => {
            dispatch(forgotPassword({ email }))
         })
         .catch((validationErr) => {
            const errors = {}
            validationErr.inner.forEach((err) => {
               errors[err.path] = err.message
            })
            setValidationErrors(errors)
         })
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
                  error={Boolean(validationErrors.email)}
                  helperText={validationErrors.email}
               />
            </StyledInputWrapper>

            {forgotPasswordError && (
               <StyledMessage type="error">{forgotPasswordError}</StyledMessage>
            )}
            {Object.keys(validationErrors).length > 0 && (
               <StyledMessage type="error">
                  Пожалуйста, исправьте ошибки в форме.
               </StyledMessage>
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
