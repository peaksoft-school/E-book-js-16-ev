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
   useTheme,
} from '@mui/material'
import { Icons } from '../../assets/icons'
import Modal from './Modal'
import Button from './buttons/Button'
import { SELLERS } from '../../utils/constants'

const Table = ({ variant = 'B', onRowClick, onDeleteConfirm }) => {
   const theme = useTheme()
   const [modalOpen, setModalOpen] = useState(false)
   const [toDelete, setToDelete] = useState(null)
   const [sellers, setSellers] = useState(SELLERS)

   const handleDeleteClick = (seller) => {
      setToDelete(seller)
      setModalOpen(true)
   }

   const handleConfirmDelete = () => {
      if (toDelete) {
         onDeleteConfirm(toDelete.id)
      }
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
                       {' '}
            <StyledTableHead>
                              
               <StyledTableRowH variant={variant}>
                                    <TableCell>№</TableCell>                 {' '}
                  <TableCell>Имя</TableCell>                 {' '}
                  <TableCell>
                                          
                     {variant === 'A' ? 'Номер телефона' : 'Почта'}             
                        {' '}
                  </TableCell>
                                   {' '}
                  {variant === 'A' && <TableCell>Почта</TableCell>}             
                     {' '}
                  {variant === 'A' && <TableCell>Количество книг</TableCell>}   
                                <TableCell></TableCell>               
               </StyledTableRowH>
                          {' '}
            </StyledTableHead>
                       {' '}
            <StyledTableBody>
                              
               {sellers.map((seller, index) => (
                  <StyledTableRow
                     key={seller.id}
                     onClick={
                        onRowClick ? () => onRowClick(seller.id) : undefined
                     }
                     variant={variant}
                  >
                                          <TableCell>{index + 1}</TableCell>   
                                      <TableCell>{seller.name}</TableCell>     
                                    
                     <TableCell>
                                               {' '}
                        {variant === 'A' ? seller.phone : seller.email}         
                                   
                     </TableCell>
                                          
                     {variant === 'A' && <TableCell>{seller.email}</TableCell>} 
                                        
                     {variant === 'A' && <TableCell>{seller.books}</TableCell>} 
                                        
                     <TableCell onClick={(e) => e.stopPropagation()}>
                                               {' '}
                        <IconButton
                           className="iconBtn"
                           onClick={() => handleDeleteClick(seller)}
                        >
                                                      
                           <img src={Icons.del} alt="delete" />                 
                                {' '}
                        </IconButton>
                                             
                     </TableCell>
                                      {' '}
                  </StyledTableRow>
               ))}
                          {' '}
            </StyledTableBody>
                     
         </StyledTable>
                  
         <Modal open={modalOpen} handleClose={handleCloseModal}>
                       {' '}
            <StyledText>
                              Вы уверены, что хотите удалить                
               <strong>{toDelete?.name || 'этот элемент'}?</strong>         
                {' '}
            </StyledText>
                       {' '}
            <Stack
               direction="row"
               marginLeft="100px"
               alignItems="center"
               justifyContent="start"
               padding="10px"
            >
                              
               <StyledButton onClick={handleCloseModal}>Отмена</StyledButton>   
                          
               <Button
                  variant="contained"
                  color="error"
                  onClick={handleConfirmDelete}
               >
                                    Удалить                
               </Button>
                          {' '}
            </Stack>
                     
         </Modal>
              {' '}
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

const StyledTableContainer = styled(TableContainer)({
   boxShadow: 'none',
   width: '100%',
   margin: 0,
   overflowX: 'hidden',
   maxWidth: '100%',
})

const StyledTable = styled(MuiTable)({
   width: '100%',
   borderCollapse: 'collapse',
   '& .MuiTableCell-root': {
      border: 'none',
   },
})

const StyledTableHead = styled(TableHead)({
   display: 'flex',
   width: '100%',
   '& .MuiTableCell-root': {
      fontWeight: 700,
      fontSize: '1rem',
      whiteSpace: 'nowrap',
   },
})

const StyledTableRowH = styled(TableRow)(({ theme, variant }) => ({
   display: 'flex',
   width: '100%',
   '& th:nth-of-type(1)': { width: '5%' },
   '& th:nth-of-type(2)': { width: '25%' },
   '& th:nth-of-type(3)': { width: variant === 'A' ? '20%' : '50%' },
   '& th:nth-of-type(4)': { width: '25%' },
   '& th:nth-of-type(5)': { width: '15%' },
   '& th:nth-of-type(6)': {
      width: '10%',
      justifyContent: 'flex-end',
      paddingRight: '1rem',
   },

   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& th': {
         width: '100% !important',
         padding: '8px 0',
      },
   },
}))

const StyledTableBody = styled(TableBody)({
   display: 'flex',
   flexDirection: 'column',
   width: '100%',
})

const StyledTableRow = styled(TableRow)(({ theme, variant }) => ({
   display: 'flex',
   alignItems: 'center',
   width: '100%',
   '&:hover': {
      backgroundColor: 'rgba(255, 76, 0, 0.1)',
      cursor: 'pointer',
   },
   '& .iconBtn:hover': {
      backgroundColor: '#FFCEB7',
   },
   '& td': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1rem',
      flexShrink: 0,
   },
   '& td:nth-of-type(1)': { width: '5%' },
   '& td:nth-of-type(2)': { width: '25%' },
   '& td:nth-of-type(3)': { width: variant === 'A' ? '20%' : '60%' },
   '& td:nth-of-type(4)': { width: '25%' },
   '& td:nth-of-type(5)': { width: '15%' },
   '& td:nth-of-type(6)': {
      width: '10%',
      justifyContent: 'flex-end',
      paddingRight: '1rem',
   },

   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& td': {
         width: '100% !important',
         padding: '8px 0',
      },
      '& td:nth-of-type(6)': {
         justifyContent: 'flex-start',
         paddingRight: 0,
      },
   },
}))

const StyledButton = styled(Button)({
   '& .MuiButtonBase-root': {
      margin: 20,
   },
   marginRight: 30,
   backgroundColor: 'white !important',
   color: '#afafaf !important',
   boxShadow: 'none',
})
