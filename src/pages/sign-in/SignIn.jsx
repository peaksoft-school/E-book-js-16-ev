import { Button, Typography, styled } from '@mui/material'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import AuthFormWrapper from '../../components/AuthFormWrapper'
import { loginUser } from '../../store/slices/authThunk'
import ForgotPassword from './ForgotPassword'

const SignIn = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isForgotModalOpen, setIsForgotModalOpen] = useState(false)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { isLoading, error, isAuth, role } = useSelector((state) => state.auth)

   const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(loginUser({ email, password }))
   }

   const handleForgotPassword = () => {
      setIsForgotModalOpen(true)
   }

   useEffect(() => {
      if (isAuth && role) {
         switch (role.toUpperCase()) {
            case 'ADMIN':
               navigate('/admin')
               break
            case 'VENDOR':
               navigate('/vendor')
               break
            case 'CLIENT':
               navigate('/user')
               break
            default:
               navigate('/')
         }
      }
   }, [isAuth, role, navigate])

   return (
      <AuthFormWrapper value={0}>
         <StyledForm onSubmit={handleSubmit} style={{ width: '100%' }}>
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

            {error && (
               <Typography color="error" mt={2}>
                  {error}
               </Typography>
            )}

            <TypographyStyled onClick={handleForgotPassword}>
               Забыли пароль?
            </TypographyStyled>

            <StyledButton type="submit" disabled={isLoading}>
               Войти
            </StyledButton>

            {isForgotModalOpen && (
               <ForgotPassword onClose={() => setIsForgotModalOpen(false)} />
            )}
         </StyledForm>
      </AuthFormWrapper>
   )
}

export default SignIn

const StyledButton = styled(Button)({
   marginTop: '30px',
   backgroundColor: '#1c1c1c',
   color: 'white',
   width: '100%',
   borderRadius: 0,
})

const TypographyStyled = styled(Typography)({
   marginTop: '10px',
   cursor: 'pointer',
   color: '#9e9e9e',
   '&:hover': {
      textDecoration: 'underline',
   },
})

const StyledForm = styled('form')({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '7px',
})
