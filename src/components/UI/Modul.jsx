import React from 'react'
import { Modal, Box } from '@mui/material'

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 4,
   borderRadius: 2,
   minWidth: 300,
}

const CustomModal = ({ open, handleClose, children }) => {
   return (
      <Modal open={open} onClose={handleClose}>
         <Box sx={style}>{children}</Box>
      </Modal>
   )
}

export default CustomModal
