import { Box, Tab, Tabs, styled } from '@mui/material'
import { useNavigate } from 'react-router'

const AuthFormWrapper = ({ children, value }) => {
   const navigate = useNavigate()

   const handleChange = (_, newValue) => {
      if (newValue === 0) {
         navigate('/sign-in')
      } else if (newValue === 1) {
         navigate('/sign-up-client')
      }
   }

   return (
      <StyledContainer>
         <StyledForm>
            <StyledTabs value={value} onChange={handleChange} centered>
               <StyledTab label="Войти" />
               <StyledTab label="Регистрация" />
            </StyledTabs>

            <FormContent>{children}</FormContent>
         </StyledForm>
      </StyledContainer>
   )
}

export default AuthFormWrapper

const StyledContainer = styled(Box)(() => ({
   backgroundImage:
      'url(https://cdn.culture.ru/images/607dff98-8396-53c3-97ee-8916c7d5b9b4)',
   width: '100%',
   height: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const StyledTabs = styled(Tabs)({
   '& .MuiTabs-indicator': {
      display: 'none',
   },
})

const StyledTab = styled(Tab)(({ theme }) => ({
   fontWeight: 400,
   textTransform: 'none',
   fontSize: '16px',
   '&.Mui-selected': {
      fontWeight: 'bold',
   },
}))

const StyledForm = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   boxShadow: '0px 4px 15px rgba(15, 11, 11, 0.482)',
   padding: '20px',
   width: '590px',
   backgroundColor: 'white',
   justifyContent: 'center',
   alignItems: 'center',
})

const FormContent = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   width: '100%',
   marginTop: '10px',
   padding: '0 23px',
   boxSizing: 'border-box',
})
