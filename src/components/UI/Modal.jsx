import { forwardRef } from 'react'
import { Modal as MuiModal, Box, styled } from '@mui/material'

const Modal = forwardRef(({ open, handleClose, children }) => (
   <MuiModal open={open} onClose={handleClose}>
      <StyleBox>{children}</StyleBox>
   </MuiModal>
))

export default Modal

const StyleBox = styled(Box)({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 4,
   borderRadius: 2,
   width: 500,
   padding: 20,
   backgroundColor: 'white',
})
