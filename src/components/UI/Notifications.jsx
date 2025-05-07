import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Alert, styled } from '@mui/material'

const Notifications = () => {
   return (
      <StyledToastContainer
         position="top-right"
         autoClose={3000}
         hideProgressBar
      />
   )
}

export const notify = (message, type = 'info') => {
   toast(
      <Alert
         severity={type}
         sx={{
            width: '100%',
            boxShadow: 'none',
            background: 'transparent',
            p: 0,
            m: 0,
         }}
      >
         {message}
      </Alert>
   )
}

export default Notifications
const StyledToastContainer = styled(ToastContainer)(({ theme }) => ({
   '.Toastify__toast': {
      borderRadius: theme.shape.borderRadius,
      fontFamily: theme.typography.fontFamily,
      boxShadow: theme.shadows[4],
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      minHeight: '64px',
      transition: 'all 0.3s ease-in-out',
   },
   '.Toastify__toast--success': {
      backgroundColor: theme.palette.success[100],
      color: theme.palette.success.dark,
      borderLeft: `6px solid ${theme.palette.success.main}`,
   },
   '.Toastify__toast--error': {
      backgroundColor: theme.palette.error[100],
      color: theme.palette.error.dark,
      borderLeft: `6px solid ${theme.palette.error.main}`,
   },
   '.Toastify__toast--info': {
      backgroundColor: theme.palette.info[100],
      color: theme.palette.info.dark,
      borderLeft: `6px solid ${theme.palette.info.main}`,
   },
   '.Toastify__toast--warning': {
      backgroundColor: theme.palette.warning[100],
      color: theme.palette.warning.dark,
      borderLeft: `6px solid ${theme.palette.warning.main}`,
   },
   '.Toastify__close-button': {
      color: theme.palette.grey[700],
      opacity: 0.8,
      '&:hover': {
         opacity: 1,
      },
   },
}))
