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
   Stack,
   styled,
} from '@mui/material'
import { Icons } from '../assets/icons'
import { SELLERS } from '../utils/constants'
import Modal from './UI/Modal'
import Button from './UI/buttons/Button'

const Table = ({ variant = 'big' }) => {
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
      <ResponsiveWrapper>
         <StyledTableContainer component={Paper}>
            <StyledTable>
               <StyledTableHead>
                  <TableRow>
                     <TableCell>№</TableCell>
                     <TableCell>Имя</TableCell>
                     <TableCell>
                        {variant === 'big' ? 'Номер телефона' : 'Почта'}
                     </TableCell>
                     {variant === 'big' && <TableCell>Почта</TableCell>}
                     {variant === 'big' && <TableCell>Количество книг</TableCell>}
                     <TableCell />
                  </TableRow>
               </StyledTableHead>
               <StyledTableBody>
                  {sellers.map((seller, index) => (
                     <StyledTableRow
                        key={seller.id}
                        selected={selectedId === seller.id}
                        onClick={() => setSelectedId(seller.id)}
                     >
                        <TableCell>{index + 1}</TableCell>
                        <StyledTextCell>{seller.name}</StyledTextCell>
                        <StyledTextCell>
                           {variant === 'big' ? seller.phone : seller.email}
                        </StyledTextCell>
                        {variant === 'big' && (
                           <StyledTextCell>{seller.email}</StyledTextCell>
                        )}
                        {variant === 'big' && (
                           <StyledTextCell>{seller.books}</StyledTextCell>
                        )}
                        <TableCell onClick={(e) => e.stopPropagation()}>
                           <IconButton className='iconBtn' onClick={() => handleDeleteClick(seller)}>
                              <img src={Icons.del} alt="delete" />
                           </IconButton>
                        </TableCell>
                     </StyledTableRow>
                  ))}
               </StyledTableBody>
            </StyledTable>
         </StyledTableContainer>

         <Modal open={modalOpen} handleClose={handleCloseModal}>
            <ConfirmText>
               Вы уверены, что хотите удалить <strong>{toDelete?.name}</strong>?
            </ConfirmText>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
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
      </ResponsiveWrapper>
   )
}

export default Table

// ============== СТИЛИ ==============

const ResponsiveWrapper = styled('div')(({ theme }) => ({
   overflowX: 'auto',
   width: '100%',
   [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2),
   },
}))

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
   marginTop: theme.spacing(2),
   boxShadow: 'none',
   minWidth: '600px', // для корректной прокрутки на малых экранах
}))

const StyledTableHead = styled(TableHead)(({ theme }) => ({
   '& .MuiTableCell-root': {
      fontWeight: 700,
      fontSize: 14,
      whiteSpace: 'nowrap',
   },
}))

const StyledTextCell = styled(TableCell)({
   maxWidth: '180px',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   whiteSpace: 'nowrap',
})

const StyledTableRow = styled(TableRow)(({ selected }) => ({
   backgroundColor: selected ? 'rgba(255, 76, 0, 0.1)' : 'inherit',
   cursor: 'pointer',
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
}))

const ConfirmText = styled('p')({
   fontSize: '16px',
   marginBottom: '20px',
})

const StyledTable = styled(MuiTable)({
   '& .MuiTableCell-root': {
      border: 'none',
   },
   '& thead .MuiTableCell-root': {
      borderBottom: '1px solid #ccc',
   },
})

const StyledTableBody = styled(TableBody)({
   display: 'flex',
   flexDirection: 'column'
   
})
