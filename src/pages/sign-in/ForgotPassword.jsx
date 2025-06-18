import { useDispatch } from 'react-redux'
import Modal from '../../components/UI/Modal' // Assuming this is your custom Modal component
import { forgotPassword } from '../../store/slices/authThunk'
import { useState } from 'react'
import { Button, Typography, styled, Stack } from '@mui/material'
import Input from '../../components/UI/Input' // Assuming this is your custom Input component

// Styled components for a clean design
const StyledModalContent = styled(Stack)({
   padding: '24px', // Add padding inside the modal
   gap: '20px', // Space between elements
   textAlign: 'center', // Center align text
})

const StyledTitle = styled(Typography)({
   fontSize: '1.5rem', // Larger title font size
   fontWeight: 600, // Make title bolder
   color: '#333', // Darker text color
   marginBottom: '10px', // Space below title
})

const StyledDescription = styled(Typography)({
   fontSize: '0.95rem',
   color: '#666', // Lighter text color for description
   lineHeight: 1.5,
   marginBottom: '10px', // Space below description
})

const StyledInputWrapper = styled('div')({
   width: '100%', // Ensure input takes full width
})

const StyledMessage = styled(Typography)(({ type }) => ({
   marginTop: '10px',
   fontSize: '0.9rem',
   color: type === 'success' ? '#4caf50' : '#f44336', // Green for success, red for error
}))

const StyledButton = styled(Button)({
   marginTop: '20px', // Space above the button
   padding: '10px 20px', // Larger padding for the button
   fontSize: '1rem', // Larger font size for button text
})

const ForgotPassword = ({ onClose }) => {
   // Removed unused modalOpen state as Modal's open prop is always true
   const [successMsg, setSuccessMsg] = useState('')
   const [errorMsg, setErrorMsg] = useState('')
   const [email, setEmail] = useState('')
   const dispatch = useDispatch()

   const handleCloseModal = () => {
      setSuccessMsg('')
      setErrorMsg('')
      setEmail('')
      onClose()
   }

   const handleSendEmail = async () => {
      if (!email) {
         setErrorMsg('Пожалуйста, введите ваш email.')
         setSuccessMsg('')
         return
      }

      const result = await dispatch(forgotPassword({ email }))

      if (forgotPassword.fulfilled.match(result)) {
         setSuccessMsg('Инструкции по сбросу пароля отправлены на ваш email.')
         setErrorMsg('')
      } else {
         setErrorMsg(
            result.payload ||
               'Произошла ошибка при отправке запроса. Пожалуйста, попробуйте еще раз.'
         )
         setSuccessMsg('')
      }
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

            {successMsg && (
               <StyledMessage type="success">{successMsg}</StyledMessage>
            )}
            {errorMsg && <StyledMessage type="error">{errorMsg}</StyledMessage>}

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
