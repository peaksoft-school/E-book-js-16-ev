import { Outlet, useNavigate } from 'react-router'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Typography, styled, Avatar , Button, Menu, MenuItem} from '@mui/material'
import SideBar from '../../components/SideBar'
import Input from '../../components/UI/Input'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

const AdminLayout = () => {
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
      dispatch(logout())
      navigate('/login')
   }
   return (
      <PageWrapper>
         <SideBar />
         <ContentBox>
            <StyledHeaderBox>

               <Input
                  type="search"
                  placeholder="Искать жанр, книги, авторов, издательства..."
               />

               <Box sx={{ position: 'relative' }}>
                  <StyledButton
                     aria-label="settings"
                     size="small"
                     onClick={handleMenuOpen}
                  >
                     <Avatar sx={{ bgcolor: '#ddd', width: 40, height: 40 }}>
                  <PersonIcon sx={{ color: '#777' }} />
               </Avatar>
                     <Typography>Администратор</Typography>
                  </StyledButton>

                  <Menu
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleMenuClose}
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                     <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                  </Menu>
               </Box>
            </StyledHeaderBox>
            <Box>
               <Outlet />
            </Box>
         </ContentBox>
      </PageWrapper>
   )
}

export default AdminLayout

const PageWrapper = styled(Box)({
   display: 'flex',
   width: '100vw',
   height: '100vh',
   overflow: 'hidden',
   margin: 0,
   padding: 0,
   boxSizing: 'border-box',
})

const ContentBox = styled(Box)({
   marginLeft: '270px',
   width: 'calc(100vw - 270px)',
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   padding: '30px',
   boxSizing: 'border-box',
   overflowX: 'hidden',
})

const StyledHeaderBox = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '10px',
   minHeight: '50px',
   flexShrink: 0,
   gap: '8px',
})

const StyledButton = styled(Button)({
   color: '#B4B4B4',
   textTransform: 'none',
   display: 'flex',
   alignItems: 'center',
   gap: 8,
})