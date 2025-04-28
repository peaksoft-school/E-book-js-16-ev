import { Box, Typography, styled } from '@mui/material'
import { useState } from 'react'
import { keyframes } from '@mui/system'
import bgOrange from '../assets/images/pngs/bgOrange.png'
import { CATEGORIES } from '../utils/helpers'
import { LATEST_PUBLICATIONS_BOOKS } from '../utils/constants'

const LatestPublications = () => {
   const [activeCategory, setActiveCategory] = useState(CATEGORIES[0])

   const activeBook = LATEST_PUBLICATIONS_BOOKS.find(
      ({ category }) => category === activeCategory
   )

   return (
      <StyledWrapper>
         <Styledhad>
            <Typography>Последние публикации</Typography>

            <Typography>Смотреть все</Typography>
         </Styledhad>

         <StyledContent>
            <CategoryList>
               {CATEGORIES.map((cat) => (
                  <CategoryItem
                     key={cat}
                     active={activeCategory === cat}
                     onClick={() => setActiveCategory(cat)}
                  >
                     <span className="dash">
                        {activeCategory === cat && '⸻'}
                     </span>
                     {cat}
                  </CategoryItem>
               ))}
            </CategoryList>

            <StyledContent2>
               <StyledBoxImage>
                  <BookImage src={activeBook?.image} alt={activeBook?.title} />
               </StyledBoxImage>

               <StyledContent3>
                  <Typography variant="h6" fontSize="1.5rem" mb={1}>
                     {activeBook?.title}
                  </Typography>

                  <Typography variant="body2" mb={2}>
                     {activeBook?.description || 'Описание недоступно.'}
                  </Typography>

                  <Box
                     display="flex"
                     justifyContent="space-between"
                     alignItems="center"
                  >
                     <MoreButton>Подробнее</MoreButton>

                     <Typography color="orange" fontWeight={600}>
                        {activeBook?.price || '—'} c
                     </Typography>
                  </Box>
               </StyledContent3>
            </StyledContent2>
         </StyledContent>
      </StyledWrapper>
   )
}

export default LatestPublications

const StyledContent3 = styled(Box)({
   width: 400,
})

const StyledContent2 = styled(Box)({
   display: 'flex',
   gap: 60,
   alignItems: 'center',
})

const StyledContent = styled(Box)({
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const floatAnimation = keyframes`
  0% { transform: rotate(-10deg) translateY(0); }
  50% { transform: rotate(10deg) translateY(-10px); }
  100% { transform: rotate(-10deg) translateY(0); }
`

const BookImage = styled('img')({
   width: '21.9rem',
   height: '37rem',
   objectFit: 'contain',
   animation: `${floatAnimation} 3s ease-in-out infinite`,
   transition: 'all 0.5s ease',
})

const StyledWrapper = styled(Box)({
   padding: '5rem',
   backgroundColor: '#1c1c1c',
   color: 'white',
})

const CategoryList = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
})

const CategoryItem = styled('button')(({ active }) => ({
   background: 'transparent',
   color: active ? '#fff' : '#aaa',
   border: 'none',
   fontSize: '1rem',
   cursor: 'pointer',
   position: 'relative',
   transition: 'all 0.3s ease',
   textAlign: 'left',
   paddingLeft: active ? '1rem' : '0',
   transform: active ? 'translateX(10px)' : 'translateX(0)',
   '.dash': {
      display: 'inline-block',
      marginRight: '0.5rem',
   },
}))

const StyledBoxImage = styled(Box)({
   backgroundImage: `url(${bgOrange})`,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'center',
   backgroundSize: 'cover',
   width: '25rem',
   height: '38rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   margin: '0 2rem',
})

const MoreButton = styled('button')({
   background: 'transparent',
   border: '1px solid #fff',
   padding: '0.5rem 1.25rem',
   color: '#fff',
   borderRadius: '4px',
   cursor: 'pointer',
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
   },
})

const Styledhad = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   width: '100%',
})
