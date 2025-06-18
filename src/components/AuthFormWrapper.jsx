import { Box, Tab, Tabs, styled } from '@mui/material'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'

const AuthFormWrapper = ({ children, value }) => {
   const navigate = useNavigate()

   const handleChange = (event, newValue) => {
      if (newValue === 0) {
         navigate('/sign-in')
      } else if (newValue === 1) {
         navigate('/sign-up-client')
      }
   }

   return (
      <StyledForm>
         <StyledTabs value={value} onChange={handleChange} centered>
            <StyledTab label="Войти" />
            <StyledTab label="Регистрация" />
         </StyledTabs>
         <FormContent>{children}</FormContent>
      </StyledForm>
   )
}

AuthFormWrapper.propTypes = {
   children: PropTypes.node.isRequired,
   value: PropTypes.number.isRequired,
}

export default AuthFormWrapper

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
   margin: '100px auto 0 auto',
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
