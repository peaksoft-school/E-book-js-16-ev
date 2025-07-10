import {
   Card,
   CardMedia,
   CardContent,
   Typography,
   Grid,
   Box,
   Button,
   styled,
} from '@mui/material'
import { Icons } from '../../assets/icons'

const AudiobookCard = ({ book }) => (
   <StyledCard>
      <StyledCardMedia image={book.image} title={book.title} />
      {book.isNew && <NewRibbon src={Icons.knew} alt="Новинка" />}

      <CardContentWrapper>
         <BookTitle>{book.title}</BookTitle>
         <BookAuthor>{book.author}</BookAuthor>
         <StyledAudiobookCardBox>
            <BookInfo>{book.duration}</BookInfo>
            <BookPrice>{book.price}</BookPrice>
         </StyledAudiobookCardBox>
      </CardContentWrapper>
   </StyledCard>
)

const AudioSlider = ({ audiobooks, onButtonClick }) => {
   return (
      <MainContainer>
         <StyledTitleBox>
            <StyledText>Аудиокниги</StyledText>
            <StyledUnderlineButton onClick={onButtonClick}>
               Смотреть все
            </StyledUnderlineButton>{' '}
         </StyledTitleBox>
         <StyledGridContainer container spacing={3}>
            {audiobooks.map((book, index) => (
               <StyledGridItem
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  index={index}
                  totalBooks={audiobooks.length}
               >
                  <AudiobookCard book={book} />
               </StyledGridItem>
            ))}
         </StyledGridContainer>
      </MainContainer>
   )
}

export default AudioSlider

const StyledCard = styled(Card)(({ theme }) => ({
   width: '308px',
   borderRadius: '0px',
   position: 'relative',
   overflow: 'hidden',
   boxShadow: 'none',
   transition:
      'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, z-index 0.3s ease-in-out',
   '&:hover': {
      transform: 'scale(1.08)',
      zIndex: 2,
   },
   marginRight: '80px',
}))

const StyledCardMedia = styled(CardMedia)({
   height: '409px',
   width: '100%',
   objectFit: 'cover',
   transition: 'height 0.3s ease-in-out',
})

const NewRibbon = styled('img')({
   position: 'absolute',
   top: '120px',
   right: '-10px',
   width: '120px',
   height: '120px',
   objectFit: 'contain',
   zIndex: 3,
   transform: 'rotate(45deg) translate(25%, -25%)',
   transformOrigin: 'top right',
})

const CardContentWrapper = styled(CardContent)({
   padding: '0px',
   transition: 'padding 0.2s ease-in-out',
})

const BookTitle = styled(Typography)({
   fontWeight: 600,
   fontSize: '14px',
   marginBottom: '4px',
   textTransform: 'uppercase',
   whiteSpace: 'nowrap',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
})

const BookAuthor = styled(Typography)({
   color: '#757575',
   fontSize: '14px',
   marginBottom: '4px',
   whiteSpace: 'nowrap',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
})

const BookInfo = styled(Typography)({
   color: '#212121',
   fontSize: '14px',
   marginBottom: '4px',
})

const StyledTitleBox = styled(Box)({
   width: '100%',
   maxWidth: '75rem',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '2.8rem',
})

const StyledText = styled(Typography)({
   fontSize: '1.5rem',
   fontWeight: 600,
   color: '#1C1C1C',
   fontFamily: 'Open-Sans',
})

const StyledUnderlineButton = styled(Button)({
   color: 'orangered',
   textTransform: 'none',
   fontWeight: 400,
   padding: 0,
   fontSize: '0.875rem',
   borderRadius: 0,
   borderBottom: '0.0625rem solid orangered',
   '&:hover': { borderBottom: '0.0625rem solid darkorange' },
})

const BookPrice = styled(Typography)({
   fontWeight: 'bold',
   fontSize: '16px',
   marginTop: '4px',
})

const StyledAudiobookCardBox = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const MainContainer = styled(Box)({
   height: 'auto',
   width: '100%',
   maxWidth: '1280px',
   margin: '0 auto',
   padding: '20px',
})

const StyledGridContainer = styled(Grid)({
   marginTop: '300px',
   marginLeft: '20px',
})

const StyledGridItem = styled(Grid)(({ index, totalBooks }) => ({
   display: 'flex',
   justifyContent: 'center',
   marginTop: `${index * -120}px`,
   zIndex: totalBooks - index,
   position: 'relative',
   transform: index === 1 ? 'scale(1.15)' : 'none',
   transition: 'transform 0.3s ease-in-out',
}))
