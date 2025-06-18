import { Button, Typography, styled } from '@mui/material'
import { useState } from 'react'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { registerVendor } from '../../store/slices/authThunk'
import AuthFormWrapper from '../../components/AuthFormWrapper'

const SignUpVendor = () => {
   const [email, setEmail] = useState('')
   const [firstName, setFirstName] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [lastName, setLastName] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [subscribe, setSubscribe] = useState(false)

   const dispatch = useDispatch()
   const { error } = useSelector((state) => state.auth)

   const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(
         registerVendor({
            firstName,
            email,
            password,
            confirmPassword,
            lastName,
            phoneNumber,
         })
      )
   }

   return (
      <AuthFormWrapper value={1}>
         <StyledForm onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Input
               type="info"
               placeholder="Напишите ваше имя"
               value={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               label="Ваше имя*"
            />
            <Input
               type="info"
               placeholder="Напишите вашу фамилию"
               value={lastName}
               onChange={(e) => setLastName(e.target.value)}
               label="Ваша фамилия*"
            />
            <Input
               type="info"
               placeholder="+996 (_ _ _) _ _  _ _  _ _"
               value={phoneNumber}
               onChange={(e) => setPhoneNumber(e.target.value)}
               label="Номер вашего телефона*"
            />
            <Input
               type="info"
               placeholder="Напишите email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               label="Email*"
            />
            <Input
               type="password"
               placeholder="Напишите пароль"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               label="Пароль*"
            />
            <Input
               type="password"
               placeholder="Подтвердите пароль"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               label="Подтвердите пароль*"
            />
            {error && (
               <Typography color="error" mt={2}>
                  {error}
               </Typography>
            )}

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
