import { Box, Typography, styled } from '@mui/material'
import Modal from '../Modal'
import { Icons } from '../../../assets/icons/index'

const SuccessModal = ({ open, onClose, bookName }) => {
   return (
      <Modal open={open} handleClose={onClose}>
         <CenteredModalBox onClick={(e) => e.stopPropagation()}>
            <StyledGreenCircle>
               <img src={Icons.greenOk} alt="ok" width={32} height={32} />
            </StyledGreenCircle>
            <Typography fontWeight={600} fontSize={20}>
               “{bookName}”
            </Typography>
            <Typography fontSize={18}>был успешно принят!</Typography>
         </CenteredModalBox>
      </Modal>
   )
}

export default SuccessModal

const CenteredModalBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   textAlign: 'center',
}))

const StyledGreenCircle = styled(Box)(() => ({
   width: 46,
   height: 46,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))
