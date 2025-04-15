import { useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import CheckIcon from '@mui/icons-material/Check'

const UploadButton = ({ label, fileName, icon }) => {
   const [status, setStatus] = useState('default')
 
   const handleUpload = () => {
     setStatus('loading')
     setTimeout(() => {
       setStatus('uploaded')
     }, 2000)
   }
 
   const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
 
   const getButtonText = () => {
     if (status === 'uploaded') return `${capitalizeFirst(fileName)} загружен`
     return `Загрузить ${label}`
   }
 
   const getIcon = () => {
     if (status === 'loading') return <CircularProgress size={20} color="inherit" />
     if (status === 'uploaded') return <CheckIcon />
     return icon || <CloudDownloadIcon />
   }
 
   return (
     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
       <div>Загрузите {label}</div>
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
         {getButtonText()}
       </Button>
     </div>
   )
 }
 

export default UploadButton
