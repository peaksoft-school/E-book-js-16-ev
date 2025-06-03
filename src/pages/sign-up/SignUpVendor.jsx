import { Box, Button, Tab, Tabs, Typography, styled } from '@mui/material'
import { useState } from 'react'
import Input from '../../components/UI/Input'

const SignUpVendor = () => {
   const [value, setValue] = useState()
   const handleChange = () => {}

   return (
      <Box>
         <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
         >
            <Tab label="Войти" />
            <Tab label="Регистрация" />
         </Tabs>
         <Input
            type="info"
            placeholder="Напишите ваше имя"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Ваше имя*"
         />
         <Input
            type="info"
            placeholder="Напишите ваше имя"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Ваша фамилия**"
         />
         <Input
            type="info"
            placeholder="Напишите email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Email"
         />
         <Input
            type="info"
            placeholder="Напишите пароль"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Пароль"
         />
         {/* <Typography>Неправильно указан Email и/или пароль</Typography> */}
         <StyledButton>Создать аккаунт</StyledButton>
      </Box>
   )
}

export default SignUpVendor

const StyledButton = styled(Button)({
   marginTop: '30px',
   backgroundColor: '#1c1c1c',
   color: 'white',
   width: '514px',
   borderRadius: '0',
})
