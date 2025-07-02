import { Button, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import AuthFormWrapper from '../../components/AuthFormWrapper'
import ForgotPassword from './ForgotPassword'
import GoogleIcon from '@mui/icons-material/Google'
import { VALIDATION_SCHEMA_SIGN_IN } from '../../utils/helpers/validate'
import { authWithGoogle, signIn } from '../../store/slices/authThunk'
import Input from '../../components/UI/Input'
import notify from '../../utils/helpers/notify'

const SignIn = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isForgotModalOpen, setIsForgotModalOpen] = useState(false)
   const [validationErrors, setValidationErrors] = useState({})

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isAuth, role, isLoading, error } = useSelector((state) => state.auth)

   const handleEmailChange = useCallback((e) => {
      setEmail(e.target.value)
   }, [])

   const handlePasswordChange = useCallback((e) => {
      setPassword(e.target.value)
   }, [])

   const handleForgotPassword = useCallback(() => {
      setIsForgotModalOpen(true)
   }, [])

   const handleCloseModal = useCallback(() => {
      setIsForgotModalOpen(false)
   }, [])

   const handleGoogleSignIn = () => {
      dispatch(authWithGoogle())
   }
   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()
         setValidationErrors({})

         const formData = { email, password }

         VALIDATION_SCHEMA_SIGN_IN.validate(formData, { abortEarly: false })
            .then(() => {
               dispatch(signIn(formData))
            })
            .catch((validationErr) => {
               const errors = {}
               validationErr.inner.forEach((err) => {
                  errors[err.path] = err.message
               })
               setValidationErrors(errors)
            })
      },
      [dispatch, email, password]
   )

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

   useEffect(() => {
      if (error) {
         notify({ type: 'error', message: error })
      }
   }, [error])

   return (
      <AuthFormWrapper value={0}>
         <StyledForm onSubmit={handleSubmit}>
            <Input
               type="info"
               placeholder="Напишите email"
               value={email}
               onChange={handleEmailChange}
               label="Email"
               error={Boolean(validationErrors.email)}
               helperText={validationErrors.email}
            />
            <Input
               type="password"
               placeholder="Напишите пароль"
               value={password}
               onChange={handlePasswordChange}
               label="Пароль"
               error={Boolean(validationErrors.password)}
               helperText={validationErrors.password}
            />

            <TypographyStyled onClick={handleForgotPassword}>
               Забыли пароль?
            </TypographyStyled>

            <StyledButton type="submit">Войти</StyledButton>
            <StyledGoogleButton
               variant="outlined"
               startIcon={<GoogleIcon />}
               onClick={handleGoogleSignIn}
               disabled={isLoading}
            >
               {isLoading ? 'Загрузка...' : 'Войти через Google'}
            </StyledGoogleButton>

            {isForgotModalOpen && <ForgotPassword onClose={handleCloseModal} />}
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

const StyledGoogleButton = styled(Button)({
   marginTop: '15px',
   border: '1px solid #000000',
   color: '#000000',
   backgroundColor: 'white',
   '&:hover': {
      backgroundColor: '#f1f1f1',
      borderColor: '#000000',
   },
   borderRadius: '4px',
   padding: '2px 10px',
   fontSize: '1rem',
   fontWeight: 'bold',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '10px',
   textTransform: 'none',
   width: '100%',
   borderRadius: 0,
})
