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
import { clearAuthError } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

const SignUpClient = () => {
   const [email, setEmail] = useState('')
   const [firstName, setFirstName] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [subscribe, setSubscribe] = useState(false)

   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { error } = useSelector((state) => state.auth)

   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])
   const handleSubmit = async (e) => {
      e.preventDefault()
      dispatch(clearAuthError())

      const resultAction = await dispatch(
         registerUser({ firstName, email, password, confirmPassword })
      )

      if (registerUser.fulfilled.match(resultAction)) {
         toast.success('Регистрация прошла успешно! Теперь вы можете войти.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         })
         navigate('/sign-in')
      }
   }

   const handleInputChange = (setter) => (e) => {
      setter(e.target.value)
      // dispatch(clearAuthError()) // Опционально: очищать ошибку при каждом изменении поля
   }

   return (
      <AuthFormWrapper value={1}>
         <StyledForm onSubmit={handleSubmit}>
            <Input
               type="info"
               placeholder="Напишите ваше имя"
               value={firstName}
               onChange={handleInputChange(setFirstName)}
               label="Ваше имя*"
            />
            <Input
               type="info"
               placeholder="Напишите email"
               value={email}
               onChange={handleInputChange(setEmail)}
               label="Email"
            />
            <Input
               type="password"
               placeholder="Напишите пароль"
               value={password}
               onChange={handleInputChange(setPassword)}
               label="Пароль"
            />
            <Input
               type="password"
               placeholder="Подтвердите пароль"
               value={confirmPassword}
               onChange={handleInputChange(setConfirmPassword)}
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
