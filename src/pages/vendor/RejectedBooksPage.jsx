import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { CircularProgress, Typography, Paper, Box, styled } from '@mui/material'
import { getAllRejectionBookForVendor } from '../../store/vendor/rejectionBooksThunk'

const RejectedBooksPage = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { rejectionBooks, isLoading, error } = useSelector(
      (state) => state.rejectionBooks
   )

   const handleEdit = (bookItemId) => {
      navigate(`/vendor/innerpagevendor/uploadbook/${bookItemId}`)
   }

   useEffect(() => {
      dispatch(getAllRejectionBookForVendor())
   }, [dispatch])

   return (
      <PageContainer>
         <Title variant="h4">Отклонённые книги</Title>

         {isLoading && (
            <CenteredBox>
               <CircularProgress />
            </CenteredBox>
         )}

         {error && <ErrorText>Ошибка: {error}</ErrorText>}

         {!isLoading && !error && rejectionBooks.length === 0 && (
            <MessageText>Нет отклонённых книг.</MessageText>
         )}

         {!isLoading &&
            rejectionBooks.length > 0 &&
            rejectionBooks.map((book) => (
               <BookCard
                  key={book.bookItemId}
                  onClick={() => handleEdit(book.bookItemId)}
               >
                  <Typography variant="h6" fontWeight={600}>
                     Книга: {book.bookName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                     Причина отклонения: {book.rejectionReason}
                  </Typography>
               </BookCard>
            ))}
      </PageContainer>
   )
}

export default RejectedBooksPage

const PageContainer = styled(Box)(({ theme }) => ({
   padding: theme.spacing(4),
   maxWidth: '800px',
   margin: '0 auto',
}))

const Title = styled(Typography)(({ theme }) => ({
   fontWeight: 'bold',
   textAlign: 'center',
   marginBottom: theme.spacing(2),
}))

const CenteredBox = styled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginTop: theme.spacing(4),
}))

const MessageText = styled(Typography)(({ theme }) => ({
   textAlign: 'center',
   marginTop: theme.spacing(2),
}))

const ErrorText = styled(Typography)(({ theme }) => ({
   textAlign: 'center',
   marginTop: theme.spacing(2),
   color: theme.palette.error.main,
}))

const BookCard = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(3),
   marginBottom: theme.spacing(2),
   borderRadius: '16px',
   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
   transition: 'transform 0.2s ease-in-out',
   backgroundColor: theme.palette.background.paper,
   cursor: 'pointer',
   '&:hover': {
      transform: 'scale(1.01)',
   },
}))
