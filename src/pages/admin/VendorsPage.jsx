import { Box, styled } from '@mui/material'
import Table from '../../components/UI/Table'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVendors } from '../../store/slices/vendorThunk'

const VendorsPage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { vendors, isLoading, error } = useSelector((state) => state.vendor)

   const handleRowClick = (id) => {
      navigate(`/admin/vendors/${id}`)
   }

   useEffect(() => {
      dispatch(getAllVendors({ pageNumber: 1, pageSize: 15 }))
   }, [dispatch])

   return (
      <Box>
         <ScrollableTableBox>
            <Table
               variant="A"
               onRowClick={handleRowClick}
               sellers={vendors}
               setSellers={() => {}}
            />
            {isLoading && <div>Загрузка...</div>}
            {error && <div>Ошибка: {error}</div>}
         </ScrollableTableBox>
      </Box>
   )
}

export default VendorsPage

const ScrollableTableBox = styled(Box)({
   marginTop: '97px',
   flex: 1,
   overflow: 'auto',
   minHeight: 0,
})
