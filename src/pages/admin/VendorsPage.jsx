import { Box, styled } from '@mui/material'
import Table from '../../components/UI/Table'
import { useNavigate } from 'react-router'

const VendorsPage = () => {
   const navigate = useNavigate()

   const handleRowClick = (id) => {
      navigate(`/admin/vendors/${id}`)
   }

   return (
      <Box>
         <ScrollableTableBox>
            <Table variant="A" onRowClick={handleRowClick} />
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
