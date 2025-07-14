import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled, Typography, Pagination } from '@mui/material'
import { useSearchParams, useOutletContext } from 'react-router'
import ApplicationCard from '../../../components/UI/cards/ApplicationCard'
import {
   fetchBooks,
   searchBooksByName,
} from '../../../store/admin/applications/applicationThunk'

const PAGE_SIZE = 12

const Applications = () => {
   const dispatch = useDispatch()
   const [searchParams, setSearchParams] = useSearchParams()
   const currentPage = Number(searchParams.get('page')) || 1

   const [search] = useOutletContext()

   const { books, totalElements, totalSeen, loading, error } = useSelector(
      (state) => state.application
   )

   useEffect(() => {
      const params = {
         pageNumber: currentPage,
         pageSize: PAGE_SIZE,
      }

      if (search.trim()) {
         dispatch(searchBooksByName({ ...params, request: search }))
      } else {
         dispatch(fetchBooks(params))
      }
   }, [dispatch, currentPage, search])

   const totalPages = Math.ceil(totalElements / PAGE_SIZE)
   const unseenCount = totalElements - totalSeen

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
                     onChange={(e, value) =>
                        setSearchParams({ page: value.toString() })
                     }
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
   marginTop: 30,
})

const UnseenText = styled(Typography)({
   color: '#FF4C00',
})

const StyledBox = styled(Box)({
   display: 'flex',
   flexWrap: 'wrap',
   gap: 30,
   overflowX: 'hidden',
   width: '100%',
   marginTop: 30,
})

const PaginationWrapper = styled(Box)({
   marginTop: '2rem',
   display: 'flex',
   justifyContent: 'center',
})
