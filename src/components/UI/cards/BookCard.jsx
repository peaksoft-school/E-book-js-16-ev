import { useState, forwardRef, useEffect } from 'react'
import {
   Card as MuiCard,
   CardMedia,
   CardContent,
   Typography,
   IconButton,
   Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Icons } from '../../../assets/icons'
import Button from '../buttons/Button'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { addFavoriteBook } from '../../../store/user/favoriteThunk'
import { fetchAllSortBooks } from '../../../store/user/userSortThunk'
import { useSelector } from 'react-redux'

const BookCard = forwardRef(({ book, activeSort, filterParams }, ref) => {
   const [isClicked, setIsClicked] = useState(false)
   const navigate = useNavigate()
   const [isFavorited, setIsFavorited] = useState(book.favorite)
   const { isAuth } = useSelector((state) => state.auth)

   const dispatch = useDispatch()

   useEffect(() => {
      setIsFavorited(book.favorite)
   }, [book.favorite])

   const handleCardClick = () => setIsClicked((prev) => !prev)

   const handleFavoriteClick = async (e) => {
      e.stopPropagation()

      if (!isAuth) {
         navigate('/sign-up-client')
         return
      }

      await dispatch(addFavoriteBook(book.bookItemId))
      setIsFavorited((prev) => !prev)

      if (activeSort === 'filter') {
         dispatch(
            fetchAllSortBooks({
               body: filterParams,
               pageNumber: 1,
               pageSize: 100,
            })
         )
      }
   }

   const handleClick = () => {
      if (isAuth === 'USER') {
         navigate(`/user/sort/innerpageuser/${book.bookItemId}`)
      } else {
         navigate(`/sort/innerpageuser/${book.bookItemId}`)
      }
   }

   return (
      <StyledCard
         onMouseEnter={handleCardClick}
         onMouseLeave={handleCardClick}
         isclicked={isClicked.toString()}
         ref={ref}
      >
         <ImageWrapper onClick={handleClick}>
            <StyledCardMedia
               component="img"
               image={book.imageUrl}
               alt={book.name}
            />

            {(book.type === 'AUDIO' || book.type === 'ELECTRONIC') && (
               <IconOverlay
                  src={book.type === 'AUDIO' ? Icons.aIcon : Icons.eIcon}
                  alt={`${book.type} icon`}
               />
            )}
         </ImageWrapper>

         <StyledCardContent>
            <Box>
               <StyledTypography variant="body1" fontWeight="bold">
                  {book.name.length > 21
                     ? `${book.name.slice(0, 21)}...`
                     : book.name}
               </StyledTypography>
               <StyledTypography variant="caption" color="text.secondary">
                  {Array.isArray(book.author) ? book.author.join(', ') : ''}
               </StyledTypography>
               <StyledTypography variant="body2" fontWeight="bold" mt={0.5}>
                  {book.price} с
               </StyledTypography>
            </Box>

            <AddToCartBox isvisible={isClicked}>
               <Button variant="warning" className="add-btn">
                  Добавить в корзину
               </Button>
            </AddToCartBox>
         </StyledCardContent>

         {isClicked && (
            <IconButton
               sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  opacity: isClicked ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: isClicked ? 'auto' : 'none',
               }}
               onClick={handleFavoriteClick}
            >
               <img
                  src={isFavorited ? Icons.loveO : Icons.love}
                  alt="favorite"
                  style={{ width: 24, height: 24 }}
               />
            </IconButton>
         )}
      </StyledCard>
   )
})
export default BookCard

const StyledCard = styled(MuiCard)(({ isclicked }) => ({
   width: '235px',
   position: 'relative',
   cursor: 'pointer',
   border: 'none',
   boxShadow: 'none',
   overflow: 'visible',
   zIndex: isclicked === 'true' ? 10 : 1,
   transition: 'transform 0.3s ease, z-index 0.3s ease',
   transform: isclicked === 'true' ? 'translateY(-10px)' : 'translateY(0)',
}))

const ImageWrapper = styled('div')({
   position: 'relative',
   width: '235px',
   height: '343px',
})

const StyledCardMedia = styled(CardMedia)({
   width: '235px',
   height: '343px',
})

const IconOverlay = styled('img')({
   position: 'absolute',
   top: 5,
   left: 5,
   width: 24,
   height: 24,
   objectFit: 'contain',
   pointerEvents: 'none',
   zIndex: 10,
})

const StyledCardContent = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   height: '100%',
})

const AddToCartBox = styled(Box)(({ isvisible }) => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   transition: 'opacity 0.3s ease, transform 0.3s ease',
   opacity: isvisible ? 1 : 0,
   transform: isvisible ? 'translateY(0)' : 'translateY(10px)',

   '& .add-btn': {
      width: '100%',
   },
}))

const StyledTypography = styled(Typography)({
   '&.MuiTypography-body1': {
      fontSize: '14px',
      color: '#222222',
      lineHeight: '1.4',
      fontWeight: '600',
      textTransform: 'uppercase',
   },
   '&.MuiTypography-caption': {
      fontSize: '14px',
      fontWeight: '400',
      color: '#575757',
      textTransform: 'uppercase',
   },
   '&.MuiTypography-body2:last-child': {
      fontSize: '16px',
      fontWeight: '600',
      color: '#222222',
      textTransform: 'lowercase',
   },
})
