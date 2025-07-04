import {
   Box,
   Menu,
   MenuItem,
   Tooltip,
   useTheme,
   Avatar,
   Typography,
} from '@mui/material'
import MuiButton from '@mui/material/Button'
import Input from '../../components/UI/Input'
import { Icons } from '../../assets/icons'
import Button from '../../components/UI/buttons/Button'
import { styled, tooltipClasses } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'
import VendorFooter from '../VendorFooter'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import { AUTH_ACTION } from '../../store/slices/authSlice'

const VendorLayout = () => {
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const theme = useTheme()

   const handleLogout = () => {
      dispatch(AUTH_ACTION.logOut())
   }

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   return (
      <StyledContainer>
         <StyledHeader>
            <StyledBox1>
               <img src={Icons.eBook} alt="logo" />
               <Input
                  width="895px"
                  placeholder="Искать жанр, книги, авторов, издательства... "
               />
               <Box
                  component="img"
                  src={Icons.ball}
                  alt="!"
                  sx={{
                     width: 24,
                     height: 24,
                     cursor: 'pointer',
                  }}
               />
               <Box >
                  <StyledButton
                     aria-label="settings"
                     size="small"
                     onClick={handleMenuOpen}
                  >
                     <Avatar sx={{ bgcolor: '#ddd', width: 40, height: 40 }}>
                        <PersonIcon sx={{ color: '#777' }} />
                     </Avatar>
                     <Box component="img" src={Icons.down} alt="down"></Box>
                  </StyledButton>

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
               </Box>
            </StyledBox1>
            <StyledBox2>
               <Box className="block1">
                  <Button variant="outlined">Создать промокод</Button>
                  <StyledTooltip
                     title="Промокод применится ко всем вашим книгам"
                     placement="bottom-start"
                     arrow
                  >
                     <Box
                        component="img"
                        src={Icons.exclg}
                        alt="!"
                        sx={{
                           width: 24,
                           height: 24,
                           border: '0',
                        }}
                     />
                  </StyledTooltip>
               </Box>
               <Button variant="add" icon>
                  Добавить книгу
               </Button>
            </StyledBox2>
         </StyledHeader>
         <Box sx={{ flex: 1 }}>
            <Outlet />
         </Box>
         <VendorFooter />
      </StyledContainer>
   )
}

export default VendorLayout

const StyledTooltip = styled(({ className, ...props }) => (
   <Tooltip arrow classes={{ popper: className }} {...props} />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#ffffff',
      color: '#969696',
      border: `1px solid #969696`,
      fontSize: 12,
      padding: '8px 12px',
      borderRadius: 0,
   },
   [`& .${tooltipClasses.arrow}`]: {
      '&:before': {
         backgroundColor: '#ffffff',
         border: '1px solid #969696',
         transform: 'rotate(45deg)',
         boxSizing: 'border-box',
      },
   },
}))

const StyledBox1 = styled(Box)({
   display: 'flex',
   gap: 45,
   textAlign: 'center',
   justifyContent: 'center',
   alignItems: 'center',
})

const StyledBox2 = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   '& .block1': {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
   },
})

const StyledContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   minHeight: '100vh',
})

const StyledHeader = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: 40,
   paddingRight: 100,
   paddingLeft: 100,
})

const StyledButton = styled(MuiButton)({
   color: '#B4B4B4',
   textTransform: 'none',
   display: 'flex',
   alignItems: 'center',
   // gap: 8,
})
