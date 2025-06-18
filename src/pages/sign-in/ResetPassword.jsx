import { Button, Typography, Box, Paper, styled } from '@mui/material'
import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import Input from '../../components/UI/Input'
import { resetPassword } from '../../store/slices/authThunk'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

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

   useEffect(() => {
      if (resetPasswordStatus === 'succeeded') {
         const timer = setTimeout(() => {
            navigate('/sign-in')
         }, 3000)
         return () => clearTimeout(timer)
      }
   }, [resetPasswordStatus, navigate])

   const handleSubmit = () => {
      if (!newPassword || !confirmPassword) {
         toast.error('Пожалуйста, заполните оба поля пароля.', {})
         return
      }
      if (newPassword !== confirmPassword) {
         toast.error('Пароли не совпадают.', {})
         return
      }
      dispatch(resetPassword({ token, newPassword, confirmPassword }))
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
            />

            {resetPasswordSuccessMessage && (
               <StyledMessage type="success">
                  {resetPasswordSuccessMessage}
               </StyledMessage>
            )}
            {resetPasswordError && (
               <StyledMessage type="error">{resetPasswordError}</StyledMessage>
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
