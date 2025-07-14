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
import { useDispatch, useSelector } from 'react-redux'
import { Icons } from '../../../assets/icons'
import { deleteBook } from '../../../store/admin/books/deleteAdminBookThunk'
import { fetchBooksByGenreAndType } from '../../../store/admin/books/booksThunk'

const ApplicationCard = forwardRef(({ book, micon, onDelete }, ref) => {
   const {
      imageUrl,
      name,
      price,
      date,
      showed,
      image,
      dateOfApplication,
      bookItemId,
      type
   } = book
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { pageNumber, pageSize, selectedGenre, selectedFormat } = useSelector(
      (state) => state.allBooks
   )
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   const handleEdit = () => {
      navigate(`/admin/books/uploadbook/${book.bookItemId}`)
   }
   const handleDelete = async (bookItemId) => {
      const data = {
         pageNumber,
         pageSize,
         genre: selectedGenre,
         type: selectedFormat,
      }
         await dispatch(
            deleteBook({ bookItemId, fetchBooksByGenreAndType, data })
         )

          if (typeof onDelete === 'function') {
         onDelete()
      }
   }

   const getTypeIcon = () => {
   if (type === 'AUDIO') return Icons.aIcon
   if (type === 'ELECTRONIC') return Icons.eIcon
   return null
}


   const handleClick = () => {
      if (micon == null) {
         navigate(`/admin/application/${book.bookItemId}`)
      }
   }

   return (
      <StyledCard showed={showed} ref={ref}>
         <Box sx={{ position: 'relative' }}>
            {getTypeIcon() && (
   <StyledTypeIcon src={getTypeIcon()} alt="book type icon" />
)}

            <StyledCardMedia
               onClick={handleClick}
               component="img"
               image={imageUrl || image}
               alt={name}
            />
            {micon && (
               <>
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
                     <StyledMenuItem className="edit" onClick={handleEdit}>
                        <img src={Icons.edit} alt="" />
                        Редактировать
                     </StyledMenuItem>
                     <StyledMenuItem onClick={() => handleDelete(bookItemId)}>
                        <img src={Icons.del} alt="delete" />
                        Удалить
                     </StyledMenuItem>
                  </Menu>
               </>
            )}
         </Box>
         <StyledCardContent>
            <StyledTitle onClick={handleClick} variant="h6" component="div">
               {name.length > 20 ? `${name.slice(0, 20)}...` : name}
            </StyledTitle>
            <StyledSubTitleWrapper>
               {dateOfApplication ||
                  (date && (
                     <StyledDate variant="body2" color="text.secondary">
                        {date || dateOfApplication}
                     </StyledDate>
                  ))}
               <StyledPrice variant="h5">{price}</StyledPrice>
            </StyledSubTitleWrapper>
         </StyledCardContent>
      </StyledCard>
   )
})

export default ApplicationCard

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
   width: 173,
   height: 43,
   display: 'flex',
   alignItems: 'center',
   gap: 10,
   '&:last-child': {
      borderBottom: 'none',
   },
   '&.edit': {
      borderBottom: '1px solid #8A8A8A',
      padding: '6px',
   },
}))

const StyledCard = styled(Card)(({ theme, showed }) => ({
   width: 275,
   height: 410,
   padding: '36px 35px 20px 35px',
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
   width: 205,
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

const StyledTypeIcon = styled('img')(() => ({
   position: 'absolute',
   top: 5,
   right: 5,
   width: 30,
   height: 30,
   zIndex: 2,
}))
