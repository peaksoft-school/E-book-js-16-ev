import { useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import CheckIcon from '@mui/icons-material/Check'

const UploadButton = ({ children }) => {
   const [status, setStatus] = useState('default')

   const handleUpload = () => {
      setStatus('loading')
      setTimeout(() => {
         setStatus('uploaded')
      }, 2000)
   }

   const getIcon = () => {
      if (status === 'loading')
         return <CircularProgress size={20} color="inherit" />
      if (status === 'uploaded') return <CheckIcon />
      return <CloudDownloadIcon />
   }

   return (
      <Button
         onClick={handleUpload}
         disabled={status === 'loading'}
         startIcon={getIcon()}
         variant={status === 'uploaded' ? 'contained' : 'outlined'}
         sx={{
            width: '220px',
            height: '40px',
            color: status === 'uploaded' ? '#fff' : '#000',
            backgroundColor: status === 'uploaded' ? 'green' : 'transparent',
            borderColor: '#C4C4C4',
            fontSize: '14px',
            textTransform: 'none',
            '&:hover': {
               backgroundColor: status === 'uploaded' ? '#009900' : '#f5f5f5',
            },
         }}
      >
         {children}
      </Button>
   )
}
export default UploadButton
