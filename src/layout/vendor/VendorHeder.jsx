import { useNavigate, NavLink } from 'react-router'
import {
   AppBar,
   Box,
   IconButton,
   Typography,
   Button,
   styled,
   Avatar,
   Menu,
   MenuItem,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

import { createGlobalStyle } from 'styled-components'
import Input from '../../components/UI/Input'
import { Icons } from '../../assets/icons'
import { NAV_LINKS } from '../../utils/helpers'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AUTH_ACTION } from '../../store/slices/authSlice'

const VendorHeader = () => {
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   const handleLogout = () => {
      dispatch(AUTH_ACTION.logOut())
   }
   const handleProfile = () => {
      navigate('/vendor/profile')
   }

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
                  <img src={Icons.ball} alt="Like" />
               </StyledIconButton>

               <Box sx={{ position: 'relative' }}>
                  <StyledButtonAv
                     aria-label="settings"
                     size="small"
                     onClick={handleMenuOpen}
                  >
                     <Avatar sx={{ bgcolor: '#ddd', width: 40, height: 40 }}>
                        <PersonIcon sx={{ color: '#777' }} />
                     </Avatar>
                  </StyledButtonAv>

                  <Menu
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleMenuClose}
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                     <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                     <MenuItem onClick={handleProfile}>Профиль</MenuItem>
                  </Menu>
               </Box>
            </StyledHeaderUp>

            <StyledNav>
               <StyledMenuWrapper>
                  <PromocodeButton>Создать промокод</PromocodeButton>
                  <img
                     src={Icons.excl}
                     alt="menu"
                     style={{
                        filter:
                           'invert(50%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(85%) contrast(85%)',
                     }}
                  />
               </StyledMenuWrapper>

               <StyledButton onClick={handleNavigateSignIn}>
                  + Добавить книгу
               </StyledButton>
            </StyledNav>
         </StyledAppBar>
      </>
   )
}

export default VendorHeader

const StyledAppBar = styled(AppBar)(({ theme }) => ({
   paddingRight: '80px',
   paddingLeft: '80px',
   backgroundColor: theme.palette.background.paper,
   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   overflowX: 'hidden',
   [theme.breakpoints.down('md')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
   },
}))

const StyledHeaderUp = styled(Box)(({ theme }) => ({
   width: '100%',
   maxWidth: '1280px',
   display: 'flex',
   flexWrap: 'wrap',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: '20px',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
   },
}))

const StyledNav = styled(Box)(({ theme }) => ({
   width: '100%',
   maxWidth: '1280px',
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

const StyledMenuWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
   gap: '14px',
   paddingLeft: '4px',
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
   marginLeft: '0px',
   marginRight: '20px',
}))

const LogoImage = styled('img')({
   maxWidth: '147px',
   height: '85px',
   marginRight: '20px',
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
   marginRight: '20px',
   flexGrow: 1,
   minWidth: '200px',
}))

const StyledButton = styled(Button)(({ theme }) => ({
   backgroundColor: '#F34901',
   height: '42px',
   borderRadius: '0px',
   color: 'white',
   padding: '10px 24px',
}))

const StyledButtonAv = styled(Button)({
   color: '#B4B4B4',
   textTransform: 'none',
   display: 'flex',
   alignItems: 'center',
   gap: 8,
})

const PromocodeButton = styled(Button)(({ theme }) => ({
   backgroundColor: '#ffffff',
   height: '42px',
   borderRadius: '0px',
   color: '#FF4C00',
   padding: '10px 16px',
   border: 'solid 1px #FF4C00',
}))
