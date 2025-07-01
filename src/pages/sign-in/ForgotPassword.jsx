import { useDispatch, useSelector } from 'react-redux'
import { useState, useCallback } from 'react'
import Modal from '../../components/UI/Modal'
import { forgotPassword } from '../../store/slices/authThunk'
import { Button, Typography, styled, Stack } from '@mui/material'
import Input from '../../components/UI/Input'
import { VALIDATION_SCHEMA_FORGOT } from '../../utils/helpers/validate'
import { AUTH_ACTION } from '../../store/slices/authSlice'

const ForgotPassword = ({ onClose }) => {
   const [email, setEmail] = useState('')
   const [validationErrors, setValidationErrors] = useState({})

   const dispatch = useDispatch()
   const { error } = useSelector((state) => state.auth)

   const handleCloseModal = useCallback(() => {
      setValidationErrors({})
      dispatch(AUTH_ACTION.clearError())
      setEmail('')
      onClose()
   }, [dispatch, onClose])

   const handleEmailChange = useCallback((e) => {
      setEmail(e.target.value)
   }, [])

   const handleSendEmail = useCallback(() => {
      setValidationErrors({})
      dispatch(AUTH_ACTION.clearError())

      const formData = { email }

      VALIDATION_SCHEMA_FORGOT.validate(formData, { abortEarly: false })
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
   }, [dispatch, email])

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
                  onChange={handleEmailChange}
                  label="Email"
                  fullWidth
                  error={Boolean(validationErrors.email)}
                  helperText={validationErrors.email}
               />
            </StyledInputWrapper>

            {error && <StyledMessage type="error">{error}</StyledMessage>}

            <StyledButton
               variant="contained"
               onClick={handleSendEmail}
               color="primary"
            >
               Отправить
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
