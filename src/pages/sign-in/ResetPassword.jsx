import { Button, Typography, Box } from '@mui/material'
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
      const result = await dispatch(
         resetPassword({ token, newPassword, confirmPassword })
      )

      if (resetPassword.fulfilled.match(result)) {
         setSuccess('Пароль успешно сброшен! Перенаправление...')
         setTimeout(() => navigate('/sign-in'), 2000)
      } else {
         setError(result.payload)
      }
   }

   return (
      <Box
         display="flex"
         flexDirection="column"
         alignItems="center"
         justifyContent="center"
         minHeight="100vh"
         gap={2}
         px={2}
      >
         <Typography variant="h4">Сброс пароля</Typography>

         <Box
            width="100%"
            maxWidth="400px"
            display="flex"
            flexDirection="column"
            gap={2}
         >
            <Input
               label="Новый пароль"
               type="password"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               placeholder="Введите новый пароль"
            />
            <Input
               label="Подтверждение пароля"
               type="password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               placeholder="Повторите новый пароль"
            />

            {success && <Typography color="green">{success}</Typography>}
            {error && <Typography color="red">{error}</Typography>}

            <Button onClick={handleSubmit} variant="contained" fullWidth>
               Сбросить пароль
            </Button>
         </Box>
      </Box>
   )
}

export default ResetPassword
