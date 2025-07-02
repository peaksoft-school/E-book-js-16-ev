import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Button, styled, Checkbox, FormControlLabel } from '@mui/material'
import Input from '../../components/UI/Input'
import AuthFormWrapper from '../../components/AuthFormWrapper'
import { signUpForUser } from '../../store/slices/authThunk'
import { VALIDATION_SCHEMA_CLIENT } from '../../utils/helpers/validate'
import notify from '../../utils/helpers/notify'

const SignUpClient = () => {
   const [email, setEmail] = useState('')
   const [firstName, setFirstName] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [subscribe, setSubscribe] = useState(false)
   const [validationErrors, setValidationErrors] = useState({})

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const {error}=useSelector((state)=>state.auth)

   const handleChangeFirstName = (e) => setFirstName(e.target.value)
   const handleChangeEmail = (e) => setEmail(e.target.value)
   const handleChangePassword = (e) => setPassword(e.target.value)
   const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value)
   const handleChangeSubscribe = (e) => setSubscribe(e.target.checked)

   const handleNavigateToVendor = () => navigate('/sign-up-vendor')

   const handleSubmit = (e) => {
      e.preventDefault()
      setValidationErrors({})

      VALIDATION_SCHEMA_CLIENT.validate(
         { firstName, email, password, confirmPassword },
         { abortEarly: false }
      )
         .then(() => {
            dispatch(
               signUpForUser({
                  firstName,
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

    useEffect(() => {
      if (error) {
         notify({ type:'error',message: error })
      }
   }, [error])

   return (
      <AuthFormWrapper value={1}>
         <StyledForm onSubmit={handleSubmit}>
            <Input
               type="info"
               placeholder="Напишите ваше имя"
               value={firstName}
               onChange={handleChangeFirstName}
               label="Ваше имя*"
               error={Boolean(validationErrors.firstName)}
               helperText={validationErrors.firstName}
            />
            <Input
               type="info"
               placeholder="Напишите email"
               value={email}
               onChange={handleChangeEmail}
               label="Email*"
               error={Boolean(validationErrors.email)}
               helperText={validationErrors.email}
            />
            <Input
               type="password"
               placeholder="Напишите пароль"
               value={password}
               onChange={handleChangePassword}
               label="Пароль*"
               error={Boolean(validationErrors.password)}
               helperText={validationErrors.password}
            />
            <Input
               type="password"
               placeholder="Подтвердите пароль"
               value={confirmPassword}
               onChange={handleChangeConfirmPassword}
               label="Подтвердите пароль*"
               error={Boolean(validationErrors.confirmPassword)}
               helperText={validationErrors.confirmPassword}
            />

            <FormControlLabel
               control={
                  <Checkbox
                     checked={subscribe}
                     onChange={handleChangeSubscribe}
                  />
               }
               label="Подписаться на рассылку eBook"
            />
            <StyledButton type="submit">Создать аккаунт</StyledButton>
            <StyledAuthButton onClick={handleNavigateToVendor}>
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
