import React, { useEffect } from 'react'
import { Button, styled } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError } from '../store/slices/authSlice'
import { toast } from 'react-toastify'
import { googleSignIn } from '../store/slices/authThunk'

const GoogleSignInButton = () => {
   const dispatch = useDispatch()
   const { isLoading, error } = useSelector((state) => state.auth)

   useEffect(() => {
      if (error) {
         toast.error(error)
         dispatch(clearAuthError())
      }
   }, [error, dispatch])

   const handleGoogleSignIn = () => {
      dispatch(googleSignIn())
   }

   return (
      <StyledGoogleButton
         variant="outlined"
         startIcon={<GoogleIcon />}
         onClick={handleGoogleSignIn}
         disabled={isLoading}
      >
         {isLoading ? 'Загрузка...' : 'Войти через Google'}
      </StyledGoogleButton>
   )
}

export default GoogleSignInButton

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