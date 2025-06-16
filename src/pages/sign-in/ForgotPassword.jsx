import { useDispatch } from 'react-redux'
import Modal from '../../components/UI/Modal'
import { forgotPassword } from '../../store/slices/authThunk'
import { useState } from 'react'
import { Button, Typography, styled, Stack } from '@mui/material'
import Input from '../../components/UI/Input'

const ForgotPassword = ({ onClose }) => {
   const [modalOpen, setModalOpen] = useState(false)
   const [successMsg, setSuccessMsg] = useState('')
   const [errorMsg, setErrorMsg] = useState('')
   const [email, setEmail] = useState('')
   const dispatch = useDispatch()

   const handleCloseModal = () => {
      setModalOpen(false)
      setSuccessMsg('')
      setErrorMsg('')
      onClose()
   }

   const handleSendEmail = () => {
      dispatch(forgotPassword({ email }))
   }
   console.log(email + '   hjkl;')

   return (
      <Modal open={true} handleClose={handleCloseModal}>
         <Typography mb={2}>Введите вашу почту</Typography>
         <Input
            type="info"
            placeholder="Напишите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
         />

         {successMsg && <Typography color="green">{successMsg}</Typography>}
         {errorMsg && <Typography color="red">{errorMsg}</Typography>}

         <Button variant="contained" onClick={handleSendEmail}>
            Отправить
         </Button>
      </Modal>
   )
}

export default ForgotPassword
