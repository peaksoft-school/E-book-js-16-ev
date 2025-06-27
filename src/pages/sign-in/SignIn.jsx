import { Button, Typography, styled } from '@mui/material'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import AuthFormWrapper from '../../components/AuthFormWrapper'
import { loginUser } from '../../store/slices/authThunk'
import ForgotPassword from './ForgotPassword'
import * as Yup from 'yup'
import GoogleSignInButton from '../../components/GoogleSignInButton'

const SignIn = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isForgotModalOpen, setIsForgotModalOpen] = useState(false)

   const [validationErrors, setValidationErrors] = useState({})

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { isLoading, error, isAuth, role } = useSelector((state) => state.auth)

   const validationSchema = Yup.object({
      email: Yup.string()
         .email('Введите корректный email')
         .required('Email обязателен для заполнения'),
      password: Yup.string()
         .min(6, 'Пароль должен быть не менее 6 символов')
         .required('Пароль обязателен для заполнения'),
   })

   const handleSubmit = (e) => {
      e.preventDefault()
      setValidationErrors({})

      const formData = { email, password }

      validationSchema
         .validate(formData, { abortEarly: false })
         .then(() => {
            dispatch(loginUser(formData))
         })
         .catch((validationErr) => {
            const errors = {}
            validationErr.inner.forEach((err) => {
               errors[err.path] = err.message
            })
            setValidationErrors(errors)
         })
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
               error={Boolean(validationErrors.email)}
               helperText={validationErrors.email}
            />
            <Input
               type="password"
               placeholder="Напишите пароль"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               label="Пароль"
               error={Boolean(validationErrors.password)}
               helperText={validationErrors.password}
            />

            <TypographyStyled onClick={handleForgotPassword}>
               Забыли пароль?
            </TypographyStyled>

            <StyledButton type="submit" disabled={isLoading}>
               Войти
            </StyledButton>
            <GoogleSignInButton />

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
