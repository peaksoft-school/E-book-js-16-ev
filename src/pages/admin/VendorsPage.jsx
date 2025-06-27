import { Box, styled, Pagination, CircularProgress } from '@mui/material'
import Table from '../../components/UI/Table'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVendors, deleteVendor } from '../../store/slices/vendorThunk'

const VendorsPage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { vendors, isLoading, error, totalPages, totalElements } = useSelector(
      (state) => state.vendor
   )

   const [currentPage, setCurrentPage] = useState(1)
   const [rowsPerPage, setRowsPerPage] = useState(15)

   const handleRowClick = (id) => {
      navigate(`/admin/vendors/${id}`)
   }

   const handlePageChange = (event, value) => {
      setCurrentPage(value)
   }

   const handleDeleteVendor = (vendorId) => {
      dispatch(deleteVendor({ vendorId }))
   }

   useEffect(() => {
      dispatch(
         getAllVendors({ pageNumber: currentPage, pageSize: rowsPerPage })
      )
   }, [dispatch, currentPage, rowsPerPage])

   return (
      <Box sx={{ padding: '20px' }}>
         <ScrollableTableBox>
            {isLoading ? (
               <LoadingContainer>
                  <CircularProgress />
                  <div>Загрузка данных...</div>
               </LoadingContainer>
            ) : error ? (
               <ErrorContainer>
                  <div>Ошибка: {error}</div>
               </ErrorContainer>
            ) : vendors.length === 0 ? (
               <NoDataContainer>
                  <div>Поставщики не найдены.</div>
               </NoDataContainer>
            ) : (
               <Table
                  variant="A"
                  onRowClick={handleRowClick}
                  sellers={vendors}
                  onDeleteConfirm={handleDeleteVendor}
               />
            )}
         </ScrollableTableBox>
         {!isLoading && !error && totalPages > 1 && (
            <PaginationContainer>
               <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
               />
            </PaginationContainer>
         )}
      </Box>
   )
}

export default VendorsPage

const ScrollableTableBox = styled(Box)({
   marginTop: '97px',
   flex: 1,
   overflowY: 'auto',
   minHeight: 0,
   maxHeight: 'calc(100vh - 200px)',
   display: 'flex',
   flexDirection: 'column',
})

const LoadingContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '200px',
   gap: '10px',
   color: '#1976d2',
})

const ErrorContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '200px',
   color: 'red',
   fontSize: '1.2rem',
   fontWeight: 'bold',
})

const NoDataContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '200px',
   color: '#757575',
   fontSize: '1.2rem',
})

const PaginationContainer = styled(Box)({
   marginTop: '20px',
   display: 'flex',
   justifyContent: 'center',
   paddingBottom: '20px',
})
