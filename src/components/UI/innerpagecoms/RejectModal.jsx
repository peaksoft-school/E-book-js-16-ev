import { Box, Typography } from '@mui/material'
import Modal from '../Modal'
import Button from '../buttons/Button'

const RejectModal = ({ open, onClose, reason, onChange, onSubmit }) => {
   return (
      <Modal open={open} handleClose={onClose}>
         <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
               bgcolor: 'white',
               width: 523,
               height: 247,
               margin: 'auto',
            }}
         >
            <Typography sx={{ fontWeight: 600, fontSize: '18px', mb: 2 }}>
               Причина вашего отклонения
            </Typography>
            <textarea
               placeholder="Напишите причину отклонения..."
               value={reason}
               onChange={(e) => onChange(e.target.value)}
               style={{
                  width: '100%',
                  height: '120px',
                  padding: '12px',
                  fontSize: '14px',
                  border: '1px solid grey',
                  resize: 'none',
                  marginBottom: 18,
               }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
               <Button onClick={onSubmit}>Отправить</Button>
            </Box>
         </Box>
      </Modal>
   )
}

export default RejectModal
