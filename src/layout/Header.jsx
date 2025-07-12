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
import { NAV_LINKS } from '../utils/helpers'
import { useNavigate } from 'react-router'

const Header = () => {
   const navigate = useNavigate()

   const handleNavigateSignIn = () => navigate('/sign-in')
   return (
      <>
         <GlobalFont />
         <StyledAppBar position="static">
            <StyledHeaderUp>
               <LogoImage src={Icons.eBook} alt="Логотип" />
               <StyledInputWrapper>
                  <Input
                     type="search"
                     placeholder="Искать жанр, книги, авторов, издательства..."
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
                  {NAV_LINKS.map(({ to, label }) => (
                     <StyledNavLink key={to} to={to}>
                        {label}
                     </StyledNavLink>
                  ))}
               </NavLinks>

               <StyledButton onClick={handleNavigateSignIn}>Войти</StyledButton>
            </StyledNav>
         </StyledAppBar>
      </>
   )
}

export default Header

const StyledAppBar = styled(AppBar)(({ theme }) => ({
   paddingRight: '80px',
   paddingLeft: '80px',
   backgroundColor: theme.palette.background.paper,
   boxShadow: '0 2px 4px white',
   display: 'flex',
   overflowX: 'hidden',
   [theme.breakpoints.down('md')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
   },
}))

const StyledHeaderUp = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexWrap: 'wrap',
   alignItems: 'center',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
   },
}))

const StyledNav = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexWrap: 'wrap',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginTop: '20px',
   marginBottom: '20px',
   gap: '10px',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
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
   marginTop: '10px'
}))

const StyledMenuWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
   gap: '14px',
   paddingLeft: '4px',
}))

const NavLinks = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '20px',
   justifyContent: 'center',
   marginRight: 420,
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
   marginRight: '40px',
   marginTop: '10px',
}))

const LogoImage = styled('img')({
   maxWidth: '147px',
   height: '85px',
   marginRight: '40px',
})

const GlobalFont = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

   * {
      box-sizing: border-box;
   }

   body {
      font-family: 'Open Sans', sans-serif;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
   }
`

const StyledInputWrapper = styled(Box)(({ theme }) => ({
   marginRight: '40px',
   marginTop: '10px',
}))

const StyledButton = styled(Button)(({ theme }) => ({
   backgroundColor: '#1C1C1C',
   width: '99px',
   height: '42px',
   borderRadius: '0px',
   color: 'white',
   padding: '10px 24px',
}))

