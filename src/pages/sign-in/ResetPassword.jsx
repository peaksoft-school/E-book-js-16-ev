import { Button, Typography, Box, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import Input from '../../components/UI/Input'
import { resetPassword } from '../../store/slices/authThunk'

const ResetPassword = () => {
   const { token } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [success, setSuccess] = useState('')
   const [error, setError] = useState(null)

   const handleSubmit = async () => {
      if (!newPassword || !confirmPassword) {
         setError('Пожалуйста, заполните оба поля пароля.')
         return
      }
      if (newPassword !== confirmPassword) {
         setError('Пароли не совпадают.')
         return
      }

      const result = await dispatch(
         resetPassword({ token, newPassword, confirmPassword })
      )

      if (resetPassword.fulfilled.match(result)) {
         setSuccess(
            'Пароль успешно сброшен! Вы будете перенаправлены на страницу входа.'
         )
         setError(null)
         setTimeout(() => navigate('/sign-in'), 3000)
      } else {
         setError(result.payload || 'Произошла ошибка при сбросе пароля.')
         setSuccess('')
      }
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
            />
            <Input
               label="Подтвердите пароль"
               type="password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               placeholder="Повторите новый пароль"
               fullWidth
               margin="dense"
            />

            {success && <StyledMessage type="success">{success}</StyledMessage>}
            {error && <StyledMessage type="error">{error}</StyledMessage>}

            <StyledSubmitButton
               onClick={handleSubmit}
               variant="contained"
               color="primary"
               fullWidth
               size="large"
            >
               Сбросить пароль
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
