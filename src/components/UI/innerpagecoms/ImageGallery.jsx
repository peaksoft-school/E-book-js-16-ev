import { Box, styled } from '@mui/material'
import { Icons } from '../../../assets/icons/index'

const ImageGallery = ({ images, isNew, activeIndex, onImageClick }) => {
   return (
      <GalleryContainer>
         {[0, 1].map((index) => (
            <ImageBox
               key={index}
               isActive={index === activeIndex}
               onClick={() => onImageClick(index)}
            >
               {index === 0 && isNew && (
                  <StyledImg src={Icons.knew} alt="new" />
               )}
               <StyledImage src={images[index]} alt={`image-${index}`} />
            </ImageBox>
         ))}
      </GalleryContainer>
   )
}

export default ImageGallery

const GalleryContainer = styled(Box)(() => ({
   display: 'flex',
   gap: 20,
   width: 580,
}))

const ImageBox = styled(Box)(({ isActive }) => ({
   width: isActive ? '357px' : '201px',
   height: isActive ? '571px' : '321px',
   overflow: 'visible',
   position: 'relative',
   transition: 'all 0.3s ease-in-out',
   cursor: isActive ? 'default' : 'pointer',
}))

const StyledImage = styled('img')({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   position: 'relative',
})

const StyledImg = styled('img')({
   position: 'absolute',
   zIndex: 2,
   bottom: 80,
   right: -105,
})
