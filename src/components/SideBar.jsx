import { Box, Typography, styled } from '@mui/material'
import { NavLink } from 'react-router'
import { Icons } from '../assets/icons'

const SideBar = () => (
   <StyledSideBarBox>
      <LogoText variant="h2" component="div">
         eBooK
      </LogoText>

      <StyledContBar>
         <NavItem to="/w">
            {({ isActive }) => (
               <>
                  <img
                     src={isActive ? Icons.applicationfill : Icons.application}
                     alt="Заявки"
                  />
                  Заявки
               </>
            )}
         </NavItem>
         <NavItem to="/admin/vendors">
            {({ isActive }) => (
               <>
                  <img
                     src={isActive ? Icons.usersfill : Icons.users}
                     alt="Продавцы"
                  />
                  Продавцы
               </>
            )}
         </NavItem>
         <NavItem to="3">
            {({ isActive }) => (
               <>
                  <img
                     src={isActive ? Icons.userfill : Icons.user}
                     alt="Пользователи"
                  />
                  Пользователи
               </>
            )}
         </NavItem>
         <NavItem to="d">
            {({ isActive }) => (
               <>
                  <img
                     src={isActive ? Icons.booksfill : Icons.books}
                     alt="Книги"
                  />
                  Книги
               </>
            )}
         </NavItem>
      </StyledContBar>
   </StyledSideBarBox>
)

export default SideBar

const StyledSideBarBox = styled(Box)(({ theme }) => ({
   position: 'fixed',
   top: 0,
   left: 0,
   height: '100vh',
   width: '250px',
   backgroundColor: theme.palette.secondary.main,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   overflow: 'hidden',
}))

const LogoText = styled(Typography)(({ theme }) => ({
   color: theme.palette.primary.white,
   background: theme.palette.primary.main,
   fontWeight: 'bold',
   fontSize: '22px',
   width: 147,
   height: 85,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const NavItem = styled(NavLink)(({ theme }) => ({
   width: '100%',
   height: 52,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
   padding: '15px 40px',
   textDecoration: 'none',
   color: theme.palette.primary.white,
   fontWeight: 500,
   fontSize: 16,
   gap: '10px',
   background: theme.palette.secondary.main,

   '&.active': {
      backgroundColor: theme.palette.primary.white,
      color: theme.palette.secondary.main,
      width: '100%',
   },
}))

const StyledContBar = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   background: theme.palette.secondary.main,
   width: '100%',
   marginTop: 59,
}))
