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
         <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Войти" />
            <Tab label="Регистрация" />
         </Tabs>
         <FormContent>{children}</FormContent>
      </StyledForm>
   )
}

AuthFormWrapper.propTypes = {
   children: PropTypes.node.isRequired,
   value: PropTypes.number.isRequired,
}

export default AuthFormWrapper

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
   gap: '7px',
   width: '100%',
   marginTop: '10px',
   padding: '0 23px',
   boxSizing: 'border-box',
})
