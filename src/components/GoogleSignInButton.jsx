import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { googleSignIn } from '../store/slices/authThunk'

const GoogleSignInButton = () => {
   const dispatch = useDispatch()

   const handleGoogleLoginSuccess = async (tokenResponse) => {
      try {
         console.log('tokenResponse:', tokenResponse) // Теперь тут должен быть id_token
         const idToken = tokenResponse.id_token // Он должен быть здесь!

         if (!idToken) {
            dispatch(
               googleSignIn.rejected(
                  new Error(
                     'ID Token is missing after Google login. Check scopes and flow.'
                  ),
                  'googleSignIn/rejected'
               )
            )
            return
         }

         const resultAction = await dispatch(googleSignIn(idToken))

         if (googleSignIn.fulfilled.match(resultAction)) {
            // Additional actions on success, if needed
         } else if (googleSignIn.rejected.match(resultAction)) {
            // Additional actions on failure, if needed
         }
      } catch (error) {
         dispatch(
            googleSignIn.rejected(
               new Error('An unexpected error occurred during Google sign-in.'),
               'googleSignIn/rejected'
            )
         )
      }
   }

   const login = useGoogleLogin({
      onSuccess: handleGoogleLoginSuccess,
      onError: (errorResponse) => {
         dispatch(
            googleSignIn.rejected(
               new Error(
                  `Google login client error: ${errorResponse.error || 'Unknown error'}`
               ),
               'googleSignIn/rejected'
            )
         )
      },
      // --- ДОБАВЬТЕ/ПРОВЕРЬТЕ ЭТИ ПАРАМЕТРЫ ---
      flow: 'implicit', // Или 'token', для получения токенов напрямую
      scope: 'openid profile email', // openid необходим для id_token
      // --- КОНЕЦ ДОБАВЛЕНИЯ/ПРОВЕРКИ ---
   })

   return (
      // ... ваша кнопка
      <Button
         variant="contained"
         startIcon={<GoogleIcon />}
         onClick={() => login()}
         sx={{
            backgroundColor: '#000000',
            color: 'white',
            '&:hover': {
               backgroundColor: '#000000',
            },
            mt: 2,
            width: '100%',
            textTransform: 'none',
         }}
      >
         Войти через Google
      </Button>
   )
}

export default GoogleSignInButton
