import { useNavigate } from 'react-router'
import Table from '../../../components/UI/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { deleteUser, getAllUsers } from '../../../store/slices/admin/usersThunk'
import { useEffect } from 'react'
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
      <div>
         <Table
            variant="B"
            sellers={users}
            onRowClick={handleRowClick}
            onDeleteConfirm={handleDeleteUser}
         />
      </div>
   )
}

export default UsersPage
