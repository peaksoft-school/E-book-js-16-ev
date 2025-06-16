import {
   Button,
   Typography,
   styled,
   Checkbox,
   FormControlLabel,
} from '@mui/material'
import { useState } from 'react'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import AuthFormWrapper from '../../components/AuthFormWrapper'
import { useNavigate } from 'react-router'
import { registerUser } from '../../store/slices/authThunk'

const SignUpClient = () => {
   const [email, setEmail] = useState('')
   const [firstName, setFirstName] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [subscribe, setSubscribe] = useState(false)

   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { error } = useSelector((state) => state.auth)

   const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(registerUser({ firstName, email, password, confirmPassword }))
   }

   return (
      <AuthFormWrapper value={1}>
         <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Input
               type="info"
               placeholder="Напишите ваше имя"
               value={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               label="Ваше имя*"
            />
            <Input
               type="info"
               placeholder="Напишите email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               label="Email"
            />
            <Input
               type="password"
               placeholder="Напишите пароль"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               label="Пароль"
            />
            <Input
               type="password"
               placeholder="Подтвердите пароль"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               label="Подтвердите пароль"
            />
            {error && (
               <Typography color="error" mt={2}>
                  {error}
               </Typography>
            )}
            <FormControlLabel
               control={
                  <Checkbox
                     checked={subscribe}
                     onChange={(e) => setSubscribe(e.target.checked)}
                  />
               }
               label="Подписаться на рассылку eBook"
            />
            <StyledButton type="submit">Создать аккаунт</StyledButton>
            <StyledAuthButton onClick={() => navigate('/sign-up-vendor')}>
               Стать продавцом на eBook
            </StyledAuthButton>
         </form>
      </AuthFormWrapper>
   )
}

export default SignUpClient

const StyledButton = styled(Button)({
   marginTop: '20px',
   backgroundColor: '#1c1c1c',
   color: 'white',
   borderRadius: '0',
   padding: '12px',
   fontSize: '16px',
   width: '100%',
})

const StyledAuthButton = styled(Button)({
   marginTop: '20px',
   border: '1px solid black',
   color: 'black',
   borderRadius: '0',
   padding: '12px',
   fontSize: '16px',
   width: '100%',
})
