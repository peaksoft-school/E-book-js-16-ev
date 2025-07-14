// src/components/layout/Header.jsx

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
import { GENRES, NAV_LINKS } from '../utils/helpers'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person'
import { AUTH_ACTION } from '../store/slices/authSlice'
import { useState } from 'react'

const Header = () => {
   const [anchorElUser, setAnchorElUser] = useState(null) // Состояние для меню пользователя
   const [anchorElGenre, setAnchorElGenre] = useState(null) // Состояние для меню жанров

   const openUserMenu = Boolean(anchorElUser)
   const openGenreMenu = Boolean(anchorElGenre)

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleNavigateSignIn = () => navigate('/sign-in')
   const { user, isAuth } = useSelector((state) => state.auth) // Убедитесь, что состояние Redux верно
   const { summary } = useSelector((state) => state.basket) // Убедитесь, что состояние Redux верно

   const handleLogout = () => {
      dispatch(AUTH_ACTION.logOut())
      setAnchorElUser(null) // Закрыть меню пользователя при выходе
   }

   const handleUserMenuOpen = (event) => {
      setAnchorElUser(event.currentTarget)
   }

   const handleUserMenuClose = () => {
      navigate('/user/profile')
      setAnchorElUser(null)
   }

   const handleUserMenuCloseOnly = () => {
      // Чтобы закрыть без навигации
      setAnchorElUser(null)
   }

   const handleGenreMenuOpen = (event) => {
      setAnchorElGenre(event.currentTarget)
   }

   const handleGenreMenuClose = () => {
      setAnchorElGenre(null)
   }

   // Логика для формирования пути на основе 'value' жанра из helpers.js
   const handleGenreClick = (genreValue) => {
      navigate(`/genres/${genreValue}`) // Переход на /genres/FICTION, /genres/CHILDRENS и т.д.
      handleGenreMenuClose()
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
                  {/* Кнопка меню жанров */}
                  <IconButton
                     edge="start"
                     color="inherit"
                     aria-label="menu"
                     onClick={handleGenreMenuOpen} // Открыть меню жанров
                  >
                     <img src={Icons.menu} alt="menu" />
                  </IconButton>
                  <StyledTypography onClick={handleGenreMenuOpen}>
                     Жанры
                  </StyledTypography>

                  {/* Меню жанров */}
                  <Menu
                     anchorEl={anchorElGenre}
                     open={openGenreMenu}
                     onClose={handleGenreMenuClose}
                     disableScrollLock
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                     transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  >
                     {/* Отображаем жанры из константы GENRES */}
                     {GENRES.map((genre) => (
                        <StyledMenuItem
                           key={genre.value} // Используем genre.value как ключ, так как он уникален
                           onClick={() => handleGenreClick(genre.value)} // Передаем genre.value
                        >
                           <GenreLabel>{genre.label}</GenreLabel>
                           {/* Если у вас есть счетчик книг в жанре, раскомментируйте это */}
                           {genre.count !== undefined && (
                              <GenreCount>{genre.count}</GenreCount>
                           )}
                        </StyledMenuItem>
                     ))}
                  </Menu>
               </StyledMenuWrapper>

               <NavLinks>
                  {NAV_LINKS.map(({ to, label }) => (
                     <StyledNavLink key={to} to={to}>
                        {label}
                     </StyledNavLink>
                  ))}
               </NavLinks>

               {user ? (
                  <StyledButton onClick={handleUserMenuOpen}>
                     <PersonIcon style={{ marginRight: '8px' }} />
                     {user.firstName}
                  </StyledButton>
               ) : (
                  <StyledButton onClick={handleNavigateSignIn}>
                     Войти
                  </StyledButton>
               )}
               {/* Меню пользователя */}
               <Menu
                  anchorEl={anchorElUser}
                  open={openUserMenu}
                  onClose={handleUserMenuCloseOnly} // Закрыть без навигации для общего закрытия
                  disableScrollLock
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
               >
                  <MenuItem onClick={handleUserMenuClose}>Профиль</MenuItem>{' '}
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
   cursor: 'pointer',
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
   marginRight: 420, // Отрегулируйте этот отступ при необходимости для макета
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

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   width: '280px', // Отрегулируйте ширину по мере необходимости
   padding: '8px 16px',
   '&:hover': {
      backgroundColor: '#f5f5f5', // Светло-серый при наведении
      '& span': {
         color: '#FF4C00', // Изменить цвет текста при наведении
      },
   },
}))

const GenreLabel = styled('span')({
   flexGrow: 1,
   textAlign: 'left',
   color: '#222222',
   fontFamily: 'Open Sans, sans-serif',
   fontWeight: 400,
   fontSize: '14px',
})

const GenreCount = styled('span')({
   color: '#999999', // Серый цвет для счетчика
   fontFamily: 'Open Sans, sans-serif',
   fontWeight: 400,
   fontSize: '14px',
   marginLeft: '16px', // Пространство между меткой и счетчиком
})
