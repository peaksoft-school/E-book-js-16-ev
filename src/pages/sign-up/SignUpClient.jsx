import {
   Button,
   Typography,
   styled,
   Checkbox,
   FormControlLabel,
} from '@mui/material'
import { useState, useEffect } from 'react'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import AuthFormWrapper from '../../components/AuthFormWrapper'
import { useNavigate } from 'react-router'
import { registerUser } from '../../store/slices/authThunk'
import { clearAuthError, clearAuthSuccess } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const SignUpClient = () => {
   const [email, setEmail] = useState('')
   const [firstName, setFirstName] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [subscribe, setSubscribe] = useState(false)

   const [validationErrors, setValidationErrors] = useState({})

   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { error, isSuccess } = useSelector((state) => state.auth)

   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   useEffect(() => {
      if (isSuccess) {
         toast.success(
            'Регистрация прошла успешно! Теперь вы можете войти.',
            {}
         )
         navigate('/sign-in')
         dispatch(clearAuthSuccess())
      }
   }, [isSuccess, navigate, dispatch])

   const validationSchema = Yup.object({
      firstName: Yup.string()
         .trim()
         .min(2, 'Имя должно содержать не менее 2 символов')
         .required('Имя обязательно для заполнения'),
      email: Yup.string()
         .email('Введите корректный email')
         .required('Email обязателен для заполнения'),
      password: Yup.string()
         .min(6, 'Пароль должен содержать не менее 6 символов')
         .required('Пароль обязателен для заполнения'),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
         .required('Подтвердите пароль'),
   })

   const handleSubmit = (e) => {
      e.preventDefault()
      setValidationErrors({})
      dispatch(clearAuthError())

      const formData = {
         firstName,
         email,
         password,
         confirmPassword,
      }

      validationSchema
         .validate(formData, { abortEarly: false })
         .then(() => {
            dispatch(registerUser(formData))
         })
         .catch((validationErr) => {
            const errors = {}
            validationErr.inner.forEach((err) => {
               errors[err.path] = err.message
            })
            setValidationErrors(errors)
         })
   }

   const renderServerErrors = () => {
      if (!error) return null

      if (typeof error === 'string') {
         return (
            <Typography color="error" mt={2}>
               {error}
            </Typography>
         )
      }

      if (typeof error === 'object' && error !== null) {
         const errorMessages = Object.values(error).flat()
         return (
            <Typography color="error" mt={2} component="div">
               {errorMessages.map((msg, index) => (
                  <div key={index}>{msg}</div>
               ))}
            </Typography>
         )
      }
      return null
   }

   return (
      <AuthFormWrapper value={1}>
         <StyledForm onSubmit={handleSubmit}>
            <Input
               type="info"
               placeholder="Напишите ваше имя"
               value={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               label="Ваше имя*"
               error={Boolean(validationErrors.firstName)}
               helperText={validationErrors.firstName}
            />
            <Input
               type="info"
               placeholder="Напишите email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               label="Email*"
               error={Boolean(validationErrors.email)}
               helperText={validationErrors.email}
            />
            <Input
               type="password"
               placeholder="Напишите пароль"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               label="Пароль*"
               error={Boolean(validationErrors.password)}
               helperText={validationErrors.password}
            />
            <Input
               type="password"
               placeholder="Подтвердите пароль"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               label="Подтвердите пароль*"
               error={Boolean(validationErrors.confirmPassword)}
               helperText={validationErrors.confirmPassword}
            />

            {renderServerErrors()}

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
         </StyledForm>
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

const StyledForm = styled('form')({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '7px',
})
