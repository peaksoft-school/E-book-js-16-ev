import { Button, Typography, Box, Paper, styled } from '@mui/material'
import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import Input from '../../components/UI/Input'
import { resetPassword } from '../../store/slices/authThunk'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'

const ResetPassword = () => {
   const { token } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const {
      resetPasswordStatus,
      resetPasswordError,
      resetPasswordSuccessMessage,
   } = useSelector((state) => state.auth)

   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [validationErrors, setValidationErrors] = useState({})

   useEffect(() => {
      if (resetPasswordStatus === 'succeeded') {
         const timer = setTimeout(() => {
            navigate('/sign-in')
         }, 3000)
         return () => clearTimeout(timer)
      }
   }, [resetPasswordStatus, navigate])

   const validationSchema = Yup.object({
      newPassword: Yup.string()
         .min(6, 'Новый пароль должен содержать не менее 6 символов')
         .required('Новый пароль обязателен для заполнения'),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают')
         .required('Подтвердите новый пароль'),
   })

   const handleSubmit = () => {
      setValidationErrors({})

      const formData = {
         newPassword,
         confirmPassword,
      }

      validationSchema
         .validate(formData, { abortEarly: false })
         .then(() => {
            dispatch(resetPassword({ token, newPassword, confirmPassword }))
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
      <StyledPageContainer>
         <StyledFormPaper elevation={6}>
            <StyledTitle variant="h5" component="h1" align="center">
               Сброс пароля
            </StyledTitle>

            <Input
               label="Новый пароль"
               type="password"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               placeholder="Введите новый пароль"
               fullWidth
               margin="dense"
               disabled={resetPasswordStatus === 'loading'}
               error={Boolean(validationErrors.newPassword)}
               helperText={validationErrors.newPassword}
            />

            <Input
               label="Подтвердите пароль"
               type="password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               placeholder="Повторите новый пароль"
               fullWidth
               margin="dense"
               disabled={resetPasswordStatus === 'loading'}
               error={Boolean(validationErrors.confirmPassword)}
               helperText={validationErrors.confirmPassword}
            />

            {resetPasswordSuccessMessage && (
               <StyledMessage type="success">
                  {resetPasswordSuccessMessage}
               </StyledMessage>
            )}
            {resetPasswordError && (
               <StyledMessage type="error">{resetPasswordError}</StyledMessage>
            )}
            {Object.keys(validationErrors).length > 0 && (
               <StyledMessage type="error">
                  Пожалуйста, исправьте ошибки в форме.
               </StyledMessage>
            )}

            <StyledSubmitButton
               onClick={handleSubmit}
               variant="contained"
               color="primary"
               fullWidth
               size="large"
               disabled={resetPasswordStatus === 'loading'}
            >
               {resetPasswordStatus === 'loading'
                  ? 'Загрузка...'
                  : 'Сбросить пароль'}
            </StyledSubmitButton>
         </StyledFormPaper>
      </StyledPageContainer>
   )
}

export default ResetPassword

const StyledPageContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   minHeight: '100vh',
   backgroundColor: '#f5f5f5',
   padding: '16px',
})

const StyledFormPaper = styled(Paper)({
   width: '100%',
   maxWidth: '600px',
   padding: '32px',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   borderRadius: '8px',
})

const StyledTitle = styled(Typography)({
   marginBottom: '16px',
})

const StyledMessage = styled(Typography)(({ type }) => ({
   textAlign: 'center',
   marginTop: '3px',
   color: type === 'success' ? '#4caf50' : '#f44336',
}))

const StyledSubmitButton = styled(Button)({
   marginTop: '16px',
   width: '520px',
   borderRadius: 0,
})
