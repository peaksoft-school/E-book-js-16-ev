import { Box, Typography, styled } from '@mui/material'
import { NavLink } from 'react-router'
import { Icons } from '../assets/icons'

const SideBar = () => (
   <StyledSideBarBox>
      <LogoText variant="h2" component="div">
         eBooK
      </LogoText>

      <StyledContBar>
         <NavItem to="/admin/applications">
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
         <NavItem to="/admin/users">
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
         <NavItem to="/admin/books">
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
   backgroundColor: theme.palette.secondary.main,
   width: 270,
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   position: 'fixed',
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
   fontSize: 18,
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
   marginTop: 58,
}))
