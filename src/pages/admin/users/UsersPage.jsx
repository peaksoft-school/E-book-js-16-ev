import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Table from '../../../components/UI/Table'
import { deleteUser, getAllUsers } from '../../../store/slices/admin/usersThunk'
import { Pagination, Typography, Box, styled } from '@mui/material'
import Loading from '../../../components/UI/Loading'

const UsersPage = () => {
   const [currentPage, setCurrentPage] = useState(1)
   const [rowsPerPage, setRowsPerPage] = useState(12)

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { users, isLoading, error, totalPages, totalElements } = useSelector(
      (state) => state.users
   )

   const handleRowClick = (id) => {
      navigate(`/admin/users/${id}`)
   }

   const handlePageChange = (event, value) => {
      setCurrentPage(value)
   }

   const handleDeleteUser = (clientId) => {
      dispatch(deleteUser({ clientId }))
   }

   useEffect(() => {
      dispatch(getAllUsers({ pageNumber: currentPage, pageSize: rowsPerPage }))
   }, [dispatch, currentPage, rowsPerPage])

   return (
      <Wrapper>
         {isLoading && (
            <LoadingWrapper>
               <Loading />
            </LoadingWrapper>
         )}

         {error && (
            <ErrorText color="error" align="center">
               Ошибка загрузки данных: {error}
            </ErrorText>
         )}

         {!isLoading && !error && (
            <>
               <Table
                  variant="B"
                  sellers={users}
                  onRowClick={handleRowClick}
                  onDeleteConfirm={handleDeleteUser}
               />

               <PaginationWrapper>
                  <Pagination
                     count={totalPages || 1}
                     page={currentPage}
                     onChange={handlePageChange}
                     color="primary"
                     showFirstButton
                     showLastButton
                  />
               </PaginationWrapper>
            </>
         )}
      </Wrapper>
   )
}

export default UsersPage

const Wrapper = styled(Box)({
   padding: 0,
})

const LoadingWrapper = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   marginTop: '-50px',
   marginLeft: '-60px',
})

const PaginationWrapper = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   marginTop: 24,
})

const ErrorText = styled(Typography)({
   marginTop: 32,
   marginBottom: 32,
   textAlign: 'center',
   color: 'red',
})
