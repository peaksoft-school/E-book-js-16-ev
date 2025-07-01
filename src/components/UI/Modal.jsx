import { forwardRef } from 'react'
import { Modal as MuiModal, Box, styled } from '@mui/material'

const Modal = forwardRef(({ open, handleClose, children }, ref) => (
   <MuiModal open={open} onClose={handleClose}>
      <StyleBox ref={ref}>{children}</StyleBox>
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
   minwidth: 500,
   padding: 20,
   backgroundColor: 'white',
})
