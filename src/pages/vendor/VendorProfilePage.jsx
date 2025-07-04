import { Typography, Box, styled, Button } from '@mui/material'
import Input from '../../components/UI/Input'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { VALIDATION_SCHEMA_UPDATE_PROFILE } from '../../utils/helpers/validate'

const VendorProfilePage = () => {
   const [email, setEmail] = useState('')
   const [lastName, setLastName] = useState('')
   const [firstName, setFirstName] = useState('')
   const [сurrentPassword, setСurrentPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [validationErrors, setValidationErrors] = useState({})

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { error } = useSelector((state) => state.vendorProfile)

   const handleFirstNameChange = (e) => setFirstName(e.target.value)
   const handleLastNameChange = (e) => setLastName(e.target.value)
   const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value)
   const handleEmailChange = (e) => setEmail(e.target.value)
   const handleCurrentPasswordChange = (e) => setСurrentPassword(e.target.value)
   const handleNewPasswordChange = (e) => setNewPassword(e.target.value)
   const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

   const handleSubmit = useCallback(() => {
      setValidationErrors({})

      VALIDATION_SCHEMA_UPDATE_PROFILE.validate(
         { сurrentPassword, newPassword, confirmPassword },
         { abortEarly: false }
      )
         .then(() => {
            dispatch(
               resetPassword({
                  сurrentPassword,
                  newPassword,
                  confirmPassword,
               })
            )
         })
         .catch((validationErr) => {
            const errors = {}
            validationErr.inner.forEach((err) => {
               errors[err.path] = err.message
            })
            setValidationErrors(errors)
         })
   }, [сurrentPassword, newPassword, confirmPassword, dispatch])

   return (
      <StyledForm onSubmit={handleSubmit}>
         <FormWrapper>
            <StyledLeftForm>
               <StyledText>Личная информация</StyledText>
               <Input
                  type="info"
                  placeholder="Напишите ваше имя"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  label="Ваше имя"
                  // error={Boolean(validationErrors.firstName)}
                  // helperText={validationErrors.firstName}
               />
               <Input
                  type="info"
                  placeholder="Введите вашу фамилию"
                  value={lastName}
                  onChange={handleLastNameChange}
                  label="Ваша фамилия"
                  // error={Boolean(validationErrors.firstName)}
                  // helperText={validationErrors.firstName}
               />
               <Input
                  type="info"
                  placeholder="+996 (___) __ __ __"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  label="Номер телефона"
                  error={Boolean(validationErrors.phoneNumber)}
                  helperText={validationErrors.phoneNumber}
               />
               <Input
                  type="info"
                  placeholder="Напишите email"
                  value={email}
                  onChange={handleEmailChange}
                  label="Email"
                  error={Boolean(validationErrors.email)}
                  helperText={validationErrors.email}
               />
               <StyledDeleteText>Удалить профиль?</StyledDeleteText>
            </StyledLeftForm>

            <StyledRightForm>
               <StyledText>Изменить пароль</StyledText>
               <Input
                  type="password"
                  placeholder="Напишите текущий пароль"
                  value={сurrentPassword}
                  onChange={handleCurrentPasswordChange}
                  label="Текущий пароль"
                  error={Boolean(validationErrors.сurrentPassword)}
                  helperText={validationErrors.сurrentPassword}
               />
               <Input
                  type="password"
                  placeholder="Напишите новый пароль"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  label="Новый пароль"
                  error={Boolean(validationErrors.newPassword)}
                  helperText={validationErrors.newPassword}
               />
               <Input
                  type="password"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  label="Подтвердите пароль*"
                  InputLabelProps={{ sx: { color: '#ca3c3c' } }}
                  error={Boolean(validationErrors.confirmPassword)}
                  helperText={validationErrors.confirmPassword}
               />
            </StyledRightForm>
         </FormWrapper>
         <ButtonWrapper>
            <StyledCencelButton variant="outlined">Отменить</StyledCencelButton>
            <StyledSaveButton type="submit" variant="contained">
               Сохранить
            </StyledSaveButton>
         </ButtonWrapper>
      </StyledForm>
   )
}

export default VendorProfilePage

const StyledForm = styled('form')({
   margin: '10px',
})

const StyledRightForm = styled(Box)({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '7px',
})

const StyledLeftForm = styled(Box)({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '7px',
})

const FormWrapper = styled(Box)({
   width: '100%',
   display: 'flex',
   gap: '160px',
})

const ButtonWrapper = styled(Box)({
   width: '100%',
   display: 'flex',
   justifyContent: 'flex-end',
   gap: '10px',
   marginTop: '20px',
})

const StyledText = styled(Typography)({
   fontSize: '18px',
   fontWeight: 600,
   marginBottom: '40px',
})

const StyledDeleteText = styled(Typography)({
   marginBottom: '40px',
   color: 'red',
   marginTop: '64px',
})

const StyledSaveButton = styled(Button)({
   borderRadius: 0,
   padding: '10px 24px',
})
const StyledCencelButton = styled(Button)({
   borderRadius: 0,
   padding: '10px 24px',
   border: 'none',
})
