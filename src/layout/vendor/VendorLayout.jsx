import { Box, Container, Tooltip, useTheme } from '@mui/material'
import Input from '../../components/UI/Input'
import { Icons } from '../../assets/icons'
import Button from '../../components/UI/buttons/Button'
import { styled, tooltipClasses } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import VendorFooter from '../VendorFooter'


const VendorLayout = () => {
   const dispatch = useDispatch()
   const theme = useTheme()

   const handleLogout = () => {
      dispatch(AUTH_ACTION.logOut())
   }

   return (
      <StyledContainer>
         <StyledHeader>
            <StyledBox1>
               <img src={Icons.eBook} alt="logo" />
               <Input width='895px' placeholder="Искать жанр, книги, авторов, издательства... " />
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
                  <Box display="flex" flexDirection="column" alignItems="center">
      <IconButton onClick={handleClick}>
        <PersonIcon />
      </IconButton>
      <IconButton onClick={handleClick} size="small">
        <ExpandMoreIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={handleClose}>Профиль</MenuItem>
        <MenuItem onClick={handleClose}>Выйти</MenuItem>
      </Menu>
    </Box>
            </StyledBox1>
            <StyledBox2>
              <Box className='block1'>
                <Button variant="outlined">Создать промокод</Button>
               <StyledTooltip
                  title="Промокод применится ко всем вашим книгам"
                  arrow
               >
                  <Box
                     component="img"
                     src={Icons.excl}
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
         <VendorFooter/>
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
}));

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
   }

})

const StyledContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   minHeight: '100vh',
 

})

const StyledHeader  =styled(Box)({
   display: 'flex',
   flexDirection: 'column',
 gap: 40,
  paddingRight: 100,
   paddingLeft: 100,

})