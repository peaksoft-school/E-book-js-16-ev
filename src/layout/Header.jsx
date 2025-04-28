import { useState } from 'react'
import {
   AppBar,
   Box,
   IconButton,
   Typography,
   Button,
   styled,
} from '@mui/material'
import { NavLink } from 'react-router'
import Input from '../components/UI/Input'
import { Icons } from '../assets/icons'
import { createGlobalStyle } from 'styled-components'

const Header = ({ onSearchChange, navLinks = [], onLogin }) => {
   const [value, setValue] = useState('')

   const handleChange = (event) => {
      setValue(event.target.value)
      if (onSearchChange) onSearchChange(event.target.value)
   }

   return (
      <StyledAppBar position="static">
         <StyledHeaderUp>
            <LogoImage src={Icons.eBook} alt="Логотип" />
            <StyledInputWrapper>
               <Input
                  type="search"
                  placeholder="Искать жанр, книги, авторов, издательства..."
                  value={value}
                  onChange={handleChange}
               />
            </StyledInputWrapper>

            <StyledIconButton>
               <img src={Icons.like} alt="Like" />
            </StyledIconButton>

            <StyledBasket>Корзина({3})</StyledBasket>
         </StyledHeaderUp>

         <StyledNav>
            <StyledMenuWrapper>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <img src={Icons.menu} alt="menu" />
               </IconButton>
               <StyledTypography>Жанры</StyledTypography>
            </StyledMenuWrapper>

            <NavLinks>
               {
                  (navLinks = [
                     { label: 'Электронные книги', to: '/ebooks' },
                     { label: 'Audio books', to: '/audio' },
                     { label: 'Промокоды', to: '/promo' },
                     { label: 'Начать продавать на eBook', to: '/sell' },
                  ].map((link) => (
                     <StyledNavLink key={link.to} to={link.to}>
                        {link.label}
                     </StyledNavLink>
                  )))
               }
            </NavLinks>

            <StyledButton onClick={onLogin}>Войти</StyledButton>
         </StyledNav>
      </StyledAppBar>
   )
}

export default Header

const StyledAppBar = styled(AppBar)(({ theme }) => ({
   paddingRight: '80px',
   paddingLeft: '80px',
   backgroundColor: theme.palette.background.paper,
   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
   },
}))

const StyledHeaderUp = styled(Box)(({ theme }) => ({
   width: '100%',
   maxWidth: '1280px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: '20px',
   paddingRight: '25px',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
   },
}))

const StyledNav = styled(Box)(({ theme }) => ({
   width: '100%',
   maxWidth: '1280px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginTop: '20px',
   marginBottom: '20px',
   [theme.breakpoints.down('sm')]: {
      gap: '10px',
      flexDirection: 'column',
   },
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
   color: '#222222',
   fontFamily: 'Open Sans, sans-serif',
   fontWeight: 600,
   fontSize: '16px',
}))

const StyledBasket = styled(Typography)(({ theme }) => ({
   color: '#222222',
   fontFamily: 'Open Sans, sans-serif',
   fontWeight: 400,
   fontSize: '14px',
}))

const StyledMenuWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
   gap: '14px',
   paddingLeft: '3px',
}))

const NavLinks = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '34px',
   marginLeft: '103px',
   marginRight: '372px',
   flexWrap: 'nowrap',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      gap: '10px',
      marginLeft: '0',
      marginRight: '0',
   },
}))

const StyledNavLink = styled(NavLink)(({ theme }) => ({
   fontFamily: 'Open Sans, sans-serif',
   textDecoration: 'none',
   color: '#222222',
   fontWeight: 400,
   fontSize: '14px',
   whiteSpace: 'nowrap',
   '&.active': {
      color: '#FF4C00',
      fontWeight: 600,
   },
   '&:hover': {
      color: '#FF4C00',
   },
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
   marginLeft: '0px',
   marginRight: '45px',
}))

const LogoImage = styled('img')({
   width: '147px',
   height: '85px',
   marginRight: '45px',
})

const GlobalFont = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

   body {
      font-family: 'Open Sans', sans-serif;
   }
`

const StyledInputWrapper = styled(Box)(({ theme }) => ({
   marginRight: '45px',
}))

const StyledButton = styled(Button)(({ theme }) => ({
   marginLeft: '115px',
   backgroundColor: '#1C1C1C',
   width: '99px',
   height: '42px',
   borderRadius: '0px',
   color: 'white',
   padding: '10px 24px',
}))
