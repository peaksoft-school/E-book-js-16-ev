import { forwardRef, useState } from 'react'
import { Box, IconButton, Typography, styled } from '@mui/material'
import { useSwipeable } from 'react-swipeable'
import { Icons } from '../../assets/icons'
import { Images } from '../../assets/images'

const BookSlider = forwardRef(({ books }) => {
   const [currentIndex, setCurrentIndex] = useState(0)

   const prevSlide = () =>
      setCurrentIndex((prev) => (prev - 1 + books.length) % books.length)
   const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % books.length)

   const getIndex = (offset) =>
      (currentIndex + offset + books.length) % books.length

   const handlers = useSwipeable({
      onSwipedLeft: nextSlide,
      onSwipedRight: prevSlide,

      trackMouse: true,
   })

   return (
      <StyledCon {...handlers}>
         <SliderWrapper>
            <ArrowButton onClick={prevSlide} className="arrow-left-btn">
               <img src={Icons.leftfill} alt="left" />
            </ArrowButton>

            <ArrowButton onClick={nextSlide} className="arrow-right-btn">
               <img src={Icons.rightfill} alt="right" />
            </ArrowButton>

            <SlideContainer>
               {['left', 'center', 'right'].map((pos, i) => {
                  const offset = i - 1
                  const book = books[getIndex(offset)]

                  const handleClick = () =>
                     pos === 'left' ? prevSlide() : nextSlide()

                  const truncateText = (text, maxLength) => {
                     if (!text) return ''

                     return text.length > maxLength
                        ? text.slice(0, maxLength) + '...'
                        : text
                  }

                  return (
                     <Slide
                        key={book.title}
                        positionType={pos}
                        onClick={handleClick}
                     >
                        <SlideImage src={book.image} alt={book.title} />
                        {pos === 'center' && (
                           <TextOverlay>
                              <Title>{truncateText(book.title, 23)}</Title>

                              <StyledBlock>
                                 <Author>{book.author}</Author>
                                 <Price>{book.price}</Price>
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

const SliderWrapper = styled(Box)({
   position: 'relative',
   width: '100%',
   height: 729,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'center',
   backgroundSize: 'contain',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   overflow: 'hidden',

   '& .arrow-left-btn': {
      left: 350,
   },

   '& .arrow-right-btn': {
      right: 350,
   },
})

const ArrowButton = styled(IconButton)({
   position: 'absolute',
   top: '46%',
   zIndex: 3,
   transform: 'translateY(-50%)',
   '& img': {
      width: 56,
   },
})

const SlideContainer = styled(Box)({
   position: 'relative',
   width: 292,
   height: 458,
   zIndex: 3,
})

const Slide = styled(Box)(({ positionType }) => ({
   position: 'absolute',
   width: 293,
   height: 526,
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
   marginTop: positionType === 'center' ? 0 : -48,
   display: 'flex',
   flexDirection: 'column',
}))

const SlideImage = styled('img')({
   width: 293,
   height: 468,
   objectFit: 'cover',
   objectPosition: 'center',
})

const TextOverlay = styled(Box)({
   width: '100%',
   paddingTop: '10px',
   color: '#fff',
   textAlign: 'left',
})

const Title = styled(Typography)({
   fontWeight: '400',
   maxWidth: 250,
   fontSize: '16px',
})

const Author = styled(Typography)({
   color: '#aaa',
   fontSize: '14px',
})

const Price = styled(Typography)({
   color: 'orange',
   fontSize: '15px',
   marginTop: '4px',
})

const StyledBlock = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
})
