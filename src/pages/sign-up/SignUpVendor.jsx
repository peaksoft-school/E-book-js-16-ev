import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Button, styled } from '@mui/material'
import { signUpForVendor } from '../../store/slices/authThunk'
import Input from '../../components/UI/Input'
import AuthFormWrapper from '../../components/AuthFormWrapper'
import { VALIDATION_SCHEMA_VENDOR } from '../../utils/helpers/validate'

const SignUpVendor = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [lastName, setLastName] = useState('')
   const [firstName, setFirstName] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [validationErrors, setValidationErrors] = useState({})

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleFirstNameChange = (e) => setFirstName(e.target.value)
   const handleLastNameChange = (e) => setLastName(e.target.value)
   const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value)
   const handleEmailChange = (e) => setEmail(e.target.value)
   const handlePasswordChange = (e) => setPassword(e.target.value)
   const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

   const handleSubmit = (e) => {
      e.preventDefault()
      setValidationErrors({})

      VALIDATION_SCHEMA_VENDOR.validate(
         {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            confirmPassword,
         },
         { abortEarly: false }
      )
         .then(() => {
            dispatch(
               signUpForVendor({
                  firstName,
                  lastName,
                  phoneNumber,
                  email,
                  password,
                  confirmPassword,
                  navigate,
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
   }

   return (
      <AuthFormWrapper value={1}>
         <StyledForm onSubmit={handleSubmit}>
            <Input
               type="info"
               placeholder="Напишите ваше имя"
               value={firstName}
               onChange={handleFirstNameChange}
               label="Ваше имя*"
               error={Boolean(validationErrors.firstName)}
               helperText={validationErrors.firstName}
            />
            <Input
               type="info"
               placeholder="Напишите вашу фамилию"
               value={lastName}
               onChange={handleLastNameChange}
               label="Ваша фамилия*"
               error={Boolean(validationErrors.lastName)}
               helperText={validationErrors.lastName}
            />
            <Input
               type="info"
               placeholder="+996 (XXX) XXX-XX-XX"
               value={phoneNumber}
               onChange={handlePhoneNumberChange}
               label="Номер вашего телефона*"
               error={Boolean(validationErrors.phoneNumber)}
               helperText={validationErrors.phoneNumber}
            />
            <Input
               type="info"
               placeholder="Напишите email"
               value={email}
               onChange={handleEmailChange}
               label="Email*"
               error={Boolean(validationErrors.email)}
               helperText={validationErrors.email}
            />
            <Input
               type="password"
               placeholder="Напишите пароль"
               value={password}
               onChange={handlePasswordChange}
               label="Пароль*"
               error={Boolean(validationErrors.password)}
               helperText={validationErrors.password}
            />
            <Input
               type="password"
               placeholder="Подтвердите пароль"
               value={confirmPassword}
               onChange={handleConfirmPasswordChange}
               label="Подтвердите пароль*"
               error={Boolean(validationErrors.confirmPassword)}
               helperText={validationErrors.confirmPassword}
            />

            <StyledButton type="submit">Создать аккаунт</StyledButton>
         </StyledForm>
      </AuthFormWrapper>
   )
}

export default SignUpVendor

const StyledButton = styled(Button)({
   marginTop: '20px',
   backgroundColor: '#1c1c1c',
   color: 'white',
   borderRadius: '0',
   padding: '12px',
   fontSize: '16px',
   width: '100%',
})

const StyledForm = styled('form')({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '7px',
})
