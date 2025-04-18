import { useState } from 'react'
import { Box, Button } from '@mui/material'
import uploadIcon from '../../assets/icons/svgs/Frame.svg'
import CheckIcon from '@mui/icons-material/Check'
import { styled } from '@mui/system'

const UploadButton = ({ label, fileName, disabled }) => {
   const [status, setStatus] = useState('default')

   const loading = true

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
      switch (status) {
         case 'loading':
            return
         case 'uploaded':
            return <CheckIcon />
         default:
            return <IconImage component="img" alt="icon" src={uploadIcon} />
      }
   }

   return (
      <Container>
         <Label>Загрузите {label}</Label>
         <StyledButton
            onClick={handleUpload}
            disabled={disabled}
            startIcon={getIcon()}
            variant={status === 'uploaded' ? 'contained' : 'outlined'}
            status={status}
            loading={loading}
            loadingPosition="start"
         >
            {getButtonText()}
         </StyledButton>
      </Container>
   )
}

export default UploadButton

const Container = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
})

const Label = styled(Box)({
   marginBottom: '8px',
})

const StyledButton = styled(Button)(({ theme, status }) => ({
   width: 220,
   height: 40,
   color: status === 'uploaded' ? '#fff' : '#000',
   backgroundColor: status === 'uploaded' ? 'green' : 'transparent',
   borderColor: '#C4C4C4',
   fontSize: 14,
   textTransform: 'none',
   '&:hover': {
      backgroundColor: status === 'uploaded' ? '#009900' : '#f5f5f5',
   },
}))

const IconImage = styled(Box)({
   width: 20,
   height: 20,
})
