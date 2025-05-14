import { useState } from 'react'
import {
   Table as MuiTable,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   IconButton,
   Box,
   Stack,
   styled,
   Typography,
} from '@mui/material'
import { Icons } from '../assets/icons'
import { SELLERS } from '../utils/constants'
import Modal from './UI/Modal'
import Button from './UI/buttons/Button'

const Table = ({ variant = 'A' }) => {
   const [selectedId, setSelectedId] = useState(null)
   const [sellers, setSellers] = useState(SELLERS)
   const [modalOpen, setModalOpen] = useState(false)
   const [toDelete, setToDelete] = useState(null)

   const handleDeleteClick = (seller) => {
      setToDelete(seller)
      setModalOpen(true)
   }

   const handleConfirmDelete = () => {
      setSellers((prev) => prev.filter((s) => s.id !== toDelete.id))
      setModalOpen(false)
      setToDelete(null)
   }

   const handleCloseModal = () => {
      setModalOpen(false)
      setToDelete(null)
   }

   return (
      <StyledTableContainer component={Paper}>
         <StyledTable>
            <StyledTableHead>
               <StyledTableRowH>
                  <TableCell>№</TableCell>
                  <TableCell>Имя</TableCell>
                  <TableCell>
                     {variant === 'A' ? 'Номер телефона' : 'Почта'}
                  </TableCell>
                  {variant === 'A' && <TableCell>Почта</TableCell>}
                  {variant === 'A' && <TableCell>Количество книг</TableCell>}
                  <TableCell />
               </StyledTableRowH>
            </StyledTableHead>
            <StyledTableBody>
               {sellers.map((seller, index) => (
                  <StyledTableRow
                     key={seller.id}
                     selected={selectedId === seller.id}
                     onClick={() => setSelectedId(seller.id)}
                  >
                     <TableCell>{index + 1}</TableCell>
                     <TableCell>{seller.name}</TableCell>
                     <TableCell>
                        {variant === 'A' ? seller.phone : seller.email}
                     </TableCell>
                     {variant === 'A' && <TableCell>{seller.email}</TableCell>}
                     {variant === 'A' && <TableCell>{seller.books}</TableCell>}
                     <StyledBBox>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                           <IconButton
                              className="iconBtn"
                              onClick={() => handleDeleteClick(seller)}
                           >
                              <img src={Icons.del} alt="delete" />
                           </IconButton>
                        </TableCell>
                     </StyledBBox>
                  </StyledTableRow>
               ))}
            </StyledTableBody>
         </StyledTable>
         <Modal open={modalOpen} handleClose={handleCloseModal}>
            <StyledText>
               Вы уверены, что хотите удалить{' '}
               <strong>{toDelete?.name} ?</strong>
            </StyledText>
            <Stack direction="row" marginLeft="45px" justifyContent="start">
               <Button variant="notbor" onClick={handleCloseModal}>
                  Отмена
               </Button>
               <Button
                  variant="contained"
                  color="error"
                  onClick={handleConfirmDelete}
               >
                  Удалить
               </Button>
            </Stack>
         </Modal>
      </StyledTableContainer>
   )
}

export default Table

const StyledText = styled(Typography)({
   display: 'flex',
   flexDirection: 'column',
   width: 300,
   marginLeft: 77.5,
   alignItems: 'center',
})

const StyledBBox = styled(Box)({
   position: 'absolute',
   marginLeft: 1054,
})

const StyledTableContainer = styled(TableContainer)({
   boxShadow: 'none',
   width: 'calc(100% - 290px)',
   margin: 0,
   marginLeft: 290,
   overflowX: 'hidden',
})

const StyledTableHead = styled(TableHead)(({ theme }) => ({
   display: 'flex',
   '& .MuiTableCell-root': {
      fontWeight: 700,
      fontSize: '1rem',
      whiteSpace: 'nowrap',
   },
}))

const StyledTableRow = styled(TableRow)(({ selected }) => ({
   backgroundColor: selected ? 'rgba(255, 76, 0, 0.1)' : 'inherit',
   cursor: 'pointer',
   display: 'flex',
   alignItems: 'center',
   width: 1170,
   '&:hover': {
      backgroundColor: 'rgba(255, 76, 0, 0.1)',
   },
   '&.Mui-selected': {
      backgroundColor: 'rgba(255, 76, 0, 0.1)',
   },
   '&.Mui-selected:hover': {
      backgroundColor: 'rgba(255, 76, 0, 0.1)',
   },
   '& .iconBtn': {
      '&:hover': {
         backgroundColor: '#FFCEB7',
      },
   },
   '& td': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1rem',
   },
   '& td:nth-of-type(1)': {
      width: '6.875rem',
   },
   '& td:nth-of-type(2)': {
      width: '16.125rem',
   },
   '& td:nth-of-type(3)': {
      width: '13.3125rem',
   },
   '& td:nth-of-type(4)': {
      width: '17rem',
   },
   '& td:nth-of-type(5)': {
      width: '13rem',
   },
   '& td:nth-of-type(6)': {
      width: '4.75rem',
      justifyContent: 'flex-end',
      paddingRight: '1rem',
   },
}))

const StyledTable = styled(MuiTable)({
   '& .MuiTableCell-root': {
      border: 'none',
   },
})

const StyledTableBody = styled(TableBody)({
   display: 'flex',
   width: '100%',
   flexDirection: 'column',
})

const StyledTableRowH = styled(TableRow)({
   display: 'flex',
   alignItems: 'center',
   width: '100%',
   '& th:nth-of-type(1)': {
      width: '6.875rem',
   },
   '& th:nth-of-type(2)': {
      width: '16.125rem',
   },
   '& th:nth-of-type(3)': {
      width: '13.3125rem',
   },
   '& th:nth-of-type(4)': {
      width: '17rem',
   },
   '& th:nth-of-type(5)': {
      width: '13rem',
   },
   '& th:nth-of-type(6)': {
      width: '4.125rem',
   },
})
