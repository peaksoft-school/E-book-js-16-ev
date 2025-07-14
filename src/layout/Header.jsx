import {
   AppBar,
   Box,
   IconButton,
   Typography,
   Button,
   styled,
   Menu,
   MenuItem,
} from '@mui/material'
import { NavLink } from 'react-router'
import Input from '../components/UI/Input'
import { Icons } from '../assets/icons'
import { createGlobalStyle } from 'styled-components'
import { NAV_LINKS } from '../utils/helpers'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person'
import { AUTH_ACTION } from '../store/slices/authSlice'
import { useState } from 'react'

const Header = () => {
   const [anchorEl, setAnchorEl] = useState(null)

   const open = Boolean(anchorEl)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleNavigateSignIn = () => navigate('/sign-in')
   const { user, isAuth } = useSelector((state) => state.auth)
   const { summary } = useSelector((state) => state.basket)

   const handleLogout = () => {
      dispatch(AUTH_ACTION.logOut())
   }
   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      navigate('/user/profile')
      setAnchorEl(null)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   return (
      <>
         <GlobalFont />
         <StyledAppBar position="static">
            <StyledHeaderUp>
               <LogoImage
                  src={Icons.eBook}
                  alt="Логотип"
                  onClick={() => navigate('/')}
               />
               <StyledInputWrapper>
                  <Input
                     type="search"
                     placeholder="Искать жанр, книги, авторов, издательства..."
                  />
               </StyledInputWrapper>

               <StyledIconButton>
                  <img
                     src={Icons.like}
                     alt="Like"
                     onClick={() => navigate('/user/favorites')}
                  />
               </StyledIconButton>
               {isAuth ? (
                  <StyledBasket onClick={() => navigate('/user/basket')}>
                     Корзина({summary.quantityOfBookItems})
                  </StyledBasket>
               ) : (
                  <StyledBasket onClick={() => navigate('/sign-up-client')}>
                     Корзина
                  </StyledBasket>
               )}
            </StyledHeaderUp>

            <StyledNav>
               <StyledMenuWrapper>
                  {isAuth ? (
                     <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => navigate('/user/sort')}
                     >
                        <img src={Icons.menu} alt="menu" />
                     </IconButton>
                  ) : (
                     <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => navigate('/sort')}
                     >
                        <img src={Icons.menu} alt="menu" />
                     </IconButton>
                  )}

                  <StyledTypography>Жанры</StyledTypography>
               </StyledMenuWrapper>

               <NavLinks>
                  {NAV_LINKS.map(({ to, label }) => (
                     <StyledNavLink key={to} to={to}>
                        {label}
                     </StyledNavLink>
                  ))}
               </NavLinks>

               {user ? (
                  <StyledButton onClick={handleMenuOpen}>
                     <PersonIcon style={{ marginRight: '8px' }} />

                     {user.firstName}
                  </StyledButton>
               ) : (
                  <StyledButton onClick={handleNavigateSignIn}>
                     Войти
                  </StyledButton>
               )}
               <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  disableScrollLock
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
               >
                  <MenuItem onClick={handleClose}>Профиль</MenuItem>
                  <MenuItem onClick={handleLogout}>Выйти</MenuItem>
               </Menu>
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
   boxShadow: 'none',
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
   marginTop: '10px',
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
   height: '42px',
   borderRadius: '0px',
   color: 'white',
   padding: '10px 24px',
}))
