import { Button, Typography, Box, Paper, styled } from '@mui/material'
import { useParams, useNavigate } from 'react-router'
import { useState, useCallback } from 'react'
import Input from '../../components/UI/Input'
import { resetPassword } from '../../store/slices/authThunk'
import { useSelector, useDispatch } from 'react-redux'
import { VALIDATION_SCHEMA_RESET } from '../../utils/helpers/validate'

const ResetPassword = () => {
   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [validationErrors, setValidationErrors] = useState({})

   const { token } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { error } = useSelector((state) => state.auth)

   const handleNewPasswordChange = useCallback(
      (e) => setNewPassword(e.target.value),
      []
   )
   const handleConfirmPasswordChange = useCallback(
      (e) => setConfirmPassword(e.target.value),
      []
   )
   const handleSubmit = useCallback(() => {
      setValidationErrors({})

      VALIDATION_SCHEMA_RESET.validate(
         { newPassword, confirmPassword },
         { abortEarly: false }
      )
         .then(() => {
            dispatch(
               resetPassword({ token, newPassword, confirmPassword, navigate })
            )
         })
         .catch((validationErr) => {
            const errors = {}
            validationErr.inner.forEach((err) => {
               errors[err.path] = err.message
            })
            setValidationErrors(errors)
         })
   }, [newPassword, confirmPassword, dispatch, token])

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
               onChange={handleNewPasswordChange}
               placeholder="Введите новый пароль"
               fullWidth
               margin="dense"
               error={Boolean(validationErrors.newPassword)}
               helperText={validationErrors.newPassword}
            />

            <Input
               label="Подтвердите пароль"
               type="password"
               value={confirmPassword}
               onChange={handleConfirmPasswordChange}
               placeholder="Повторите новый пароль"
               fullWidth
               margin="dense"
               error={Boolean(validationErrors.confirmPassword)}
               helperText={validationErrors.confirmPassword}
            />

            {error && <StyledMessage type="error">{error}</StyledMessage>}
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
   borderRadius: 0,
})
