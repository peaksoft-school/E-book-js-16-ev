import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled, Typography, Pagination } from '@mui/material'
import { useSearchParams } from 'react-router'
import ApplicationCard from '../../../components/UI/cards/ApplicationCard.jsx'
import { fetchBooks } from '../../../store/admin/applications/applicationThunk.js'

const PAGE_SIZE = 12

const Applications = () => {
   const dispatch = useDispatch()
   const [searchParams, setSearchParams] = useSearchParams()
   const currentPage = Number(searchParams.get('page')) || 1

   const { books, totalElements, totalSeen, loading, error } = useSelector(
      (state) => state.application
   )

   const totalPages = Math.ceil(totalElements / PAGE_SIZE)

   const unseenCount = totalElements - totalSeen

   useEffect(() => {
      dispatch(fetchBooks({ pageNumber: currentPage, pageSize: PAGE_SIZE }))
   }, [dispatch, currentPage])

   const handlePageChange = (event, value) => {
      setSearchParams({ page: value })
   }

   return (
      <PageWrapper>
         <ContentWrapper>
            <StyledStats>
               <Typography variant="h6">Всего: {totalElements}</Typography>
               <UnseenText variant="h6">
                  Непросмотренные: {unseenCount}
               </UnseenText>
            </StyledStats>

            {loading && <Typography>Загрузка...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <StyledBox>
               {Array.isArray(books) &&
                  books.map((book) => (
                     <Box key={book.bookItemId}>
                        <ApplicationCard book={book} />
                     </Box>
                  ))}
            </StyledBox>

            {totalPages > 1 && (
               <PaginationWrapper>
                  <Pagination
                     count={totalPages}
                     page={currentPage}
                     onChange={handlePageChange}
                     color="primary"
                  />
               </PaginationWrapper>
            )}
         </ContentWrapper>
      </PageWrapper>
   )
}

export default Applications

const PageWrapper = styled(Box)({
   display: 'flex',
   overflow: 'hidden',
   width: '100%',
   height: '100%',
   boxSizing: 'border-box',
   position: 'sticky',
   flexDirection: 'column',
})

const ContentWrapper = styled(Box)({
   width: '100%',
   boxSizing: 'border-box',
   overflowX: 'hidden',
   paddingBottom: '2rem',
})

const StyledStats = styled(Box)({
   display: 'flex',
   gap: 30,
   flexWrap: 'wrap',
   color: '#B5B5B5',
})

const UnseenText = styled(Typography)({
   color: '#FF4C00',
})

const StyledBox = styled(Box)({
   display: 'flex',
   flexWrap: 'wrap',
   gap: 20,
   overflowX: 'hidden',
   width: '100%',
})

const PaginationWrapper = styled(Box)({
   marginTop: '2rem',
   display: 'flex',
   justifyContent: 'center',
})
