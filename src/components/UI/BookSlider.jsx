import { forwardRef, useState } from 'react'
import { Box, IconButton, Typography, styled } from '@mui/material'
import { useSwipeable } from 'react-swipeable'
import { Icons } from '../../assets/icons'
import { Images } from '../../assets/images'

const positions = ['left', 'center', 'right']

const getIndex = (current, offset, length) =>
   (current + offset + length) % length

const truncateText = (text = '', maxLength) =>
   text.length > maxLength ? text.slice(0, maxLength) + '...' : text

const BookSlider = forwardRef(({ books }, ref) => {
   const [currentIndex, setCurrentIndex] = useState(0)

   const prevSlide = () =>
      setCurrentIndex((prev) => (prev - 1 + books.length) % books.length)
   const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % books.length)

   const handlers = useSwipeable({
      onSwipedLeft: nextSlide,
      onSwipedRight: prevSlide,
      trackMouse: true,
   })

   return (
      <StyledCon {...handlers} ref={ref}>
         <SliderWrapper>
            <ArrowButton onClick={prevSlide} className="arrow-left-btn">
               <img src={Icons.leftfill} alt="left" />
            </ArrowButton>
            <ArrowButton onClick={nextSlide} className="arrow-right-btn">
               <img src={Icons.rightfill} alt="right" />
            </ArrowButton>

            <SlideContainer>
               {positions.map((pos, i) => {
                  const offset = i - 1
                  const book =
                     books[getIndex(currentIndex, offset, books.length)]
                  const handleClick = () =>
                     pos === 'left' ? prevSlide() : nextSlide()

                  return (
                     <Slide
                        key={book.id}
                        positionType={pos}
                        onClick={handleClick}
                     >
                        <SlideImage src={book.image} alt={book.title} />
                        {pos === 'center' && (
                           <TextOverlay>
                              <Text variant="title">
                                 {truncateText(book.title, 23)}
                              </Text>
                              <StyledBlock>
                                 <Text variant="author">{book.author}</Text>
                                 <Text variant="price">{book.price}</Text>
                              </StyledBlock>
                           </TextOverlay>
                        )}
                     </Slide>
                  )
               })}
            </SlideContainer>
         </SliderWrapper>
      </StyledCon>
   )
})

export default BookSlider
const StyledCon = styled(Box)({
   backgroundImage: `url(${Images.bgSlider})`,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'center',
   backgroundSize: 'cover',
})

const SliderWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   height: 'clamp(30rem, 60vw, 45.56rem)',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   overflow: 'hidden',

   '& .arrow-left-btn': {
      left: '5%',
      [theme.breakpoints.up('md')]: { left: '10%' },
      [theme.breakpoints.up('lg')]: { left: '21.88rem' },
   },
   '& .arrow-right-btn': {
      right: '5%',
      [theme.breakpoints.up('md')]: { right: '10%' },
      [theme.breakpoints.up('lg')]: { right: '21.88rem' },
   },
}))

const ArrowButton = styled(IconButton)({
   position: 'absolute',
   top: '46%',
   zIndex: 3,
   transform: 'translateY(-50%)',
   '& img': { width: '3.5rem' },
})

const SlideContainer = styled(Box)({
   position: 'relative',
   width: '100%',
   maxWidth: '18.25rem',
   height: 'auto',
   zIndex: 3,
   aspectRatio: '292 / 458',
})

const Slide = styled(Box)(({ positionType, theme }) => ({
   position: 'absolute',
   width: '100%',
   height: 'auto',
   aspectRatio: '293 / 526',
   overflow: 'hidden',
   transition: 'all 0.8s ease',
   zIndex: positionType === 'center' ? 3 : 1,
   transform: {
      left: 'translateX(-65%) scale(0.40)',
      right: 'translateX(65%) scale(0.40)',
      center: 'translateX(0) scale(1)',
   }[positionType],
   opacity: positionType === 'center' ? 1 : 0.6,
   cursor: positionType !== 'center' ? 'pointer' : 'default',
   marginTop: positionType === 'center' ? 0 : '-3rem',
   display: 'flex',
   flexDirection: 'column',

   [theme.breakpoints.down('sm')]: {
      transform: {
         left: 'translateX(-50%) scale(0.35)',
         right: 'translateX(50%) scale(0.35)',
         center: 'translateX(0) scale(0.95)',
      }[positionType],
   },
}))

const SlideImage = styled('img')({
   width: '100%',
   height: 'auto',
   objectFit: 'cover',
   objectPosition: 'center',
   aspectRatio: '293 / 468',
})

const TextOverlay = styled(Box)({
   width: '100%',
   paddingTop: '0.625rem',
   color: '#fff',
   textAlign: 'left',
})

const Text = styled(Typography)(({ variant }) => ({
   ...(variant === 'title' && {
      fontWeight: 400,
      maxWidth: '15.625rem',
      fontSize: '1rem',
   }),
   ...(variant === 'author' && {
      color: '#aaa',
      fontSize: '0.875rem',
   }),
   ...(variant === 'price' && {
      color: 'orange',
      fontSize: '0.9375rem',
      marginTop: '0.25rem',
   }),
}))

const StyledBlock = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
})
