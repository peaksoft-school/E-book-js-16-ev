import { forwardRef, useState } from 'react'
import {
   Card,
   CardMedia,
   CardContent,
   Typography,
   IconButton,
   Box,
   styled,
   Menu,
   MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router'

const ApplicationCard = forwardRef(({ book }, ref) => {
   const { imageUrl, name, price, date, showed} = book
   const navigate = useNavigate()

   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   const handleEdit = () => {
      console.log('Редактировать:', book)
      handleMenuClose()
   }

   const handleReject = () => {
      console.log('Отклонить:', book)
      handleMenuClose()
   }
const handleClick = () => {
      navigate(`/admin/application/${book.bookItemId}`);
   };

   return (
      <StyledCard showed={showed} ref={ref}>
         <Box sx={{ position: 'relative' }}>
            <StyledCardMedia onClick={handleClick} component="img" image={imageUrl} alt={name} />
            <StyledOptionsButton
               aria-label="settings"
               size="small"
               onClick={handleMenuOpen}
            >
               <MoreVertIcon />
            </StyledOptionsButton>

            <Menu
               anchorEl={anchorEl}
               open={open}
               onClose={handleMenuClose}
               anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
               transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
               <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
               <MenuItem onClick={handleReject}>Отклонить</MenuItem>
            </Menu>
         </Box>
         <StyledCardContent>
            <StyledTitle onClick={handleClick} variant="h6" component="div">
               {name.length > 20 ? `${name.slice(0, 20)}...` : name}
            </StyledTitle>
            <StyledSubTitleWrapper>
               {date && (
                  <StyledDate variant="body2" color="text.secondary">
                     {date}
                  </StyledDate>
               )}
               <StyledPrice variant="h5">{price}</StyledPrice>
            </StyledSubTitleWrapper>
         </StyledCardContent>
      </StyledCard>
   )
})

export default ApplicationCard

const StyledCard = styled(Card)(({ theme, showed }) => ({
   width: 270,
   height: 410,
   padding: '35px 35px 20px 35px',
   background: showed === false ? 'rgba(255, 76, 0, 0.08)' : '#EDEDED',
   border: showed === false ? '1px solid #FF4C00' : '',
   borderRadius: '0px',
   cursor: 'pointer',
   boxShadow: 'none',
   transition: '0.3s ease',
   '&:hover, &:active': {
      border: '1px solid #FF4C00',
      backgroundColor: 'rgba(255, 76, 0, 0.08)',
   },
}))

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
   height: 297,
   width: 197,
}))

const StyledSubTitleWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
   padding: 0,
   marginTop: 15,
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
   color: '#222222',
   fontWeight: 600,
   textTransform: 'uppercase',
   fontSize: 14,
   textAlign: 'start',
}))

const StyledDate = styled(Typography)(({ theme }) => ({
   color: '#8A8A8A',
   fontSize: 14,
   fontWeight: 400,
}))

const StyledPrice = styled(Typography)(({ theme }) => ({
   color: '#FF4C00',
   fontSize: 16,
   fontWeight: 600,
}))

const StyledOptionsButton = styled(IconButton)(({ theme }) => ({
   position: 'absolute',
   top: theme.spacing(-4.2),
   right: theme.spacing(-4),
   color: '#222222',
}))
