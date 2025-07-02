import { forwardRef, useEffect, useRef, useState } from 'react'
import { Box, Button, styled } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { Icons } from '../../../assets/icons'

const UploadButton = forwardRef(
   ({ label, fileName, accept = '*', onFileSelect, initialFile }, ref) => {
      const fileInputRef = useRef()
      const [status, setStatus] = useState(initialFile ? 'uploaded' : 'default')
      const [selectedName, setSelectedName] = useState(
         initialFile ? initialFile.split('/').pop() : ''
      )

      const handleClick = () => {
         fileInputRef.current.click()
      }

      const handleFileChange = (event) => {
         const file = event.target.files[0]
         if (file) {
            setSelectedName(file.name)
            setStatus('uploaded')
            if (onFileSelect) onFileSelect(file, fileName)
         }
      }

      useEffect(() => {
         if (initialFile) {
            setSelectedName(getFileName(initialFile))
            setStatus('uploaded')
         }
      }, [initialFile])

      const getFileName = (url) => {
         try {
            return decodeURIComponent(url.split('/').pop())
         } catch {
            return ''
         }
      }

      const capitalizeFirst = (str) =>
         str.charAt(0).toUpperCase() + str.slice(1)

      const getButtonText = () => {
         if (status === 'uploaded') {
            return `${capitalizeFirst(fileName)} загружен`
         }
         return `Загрузить ${label === 'PDF' ? 'PDF' : 'аудиозапись'}`
      }

      const getIcon = () => {
         switch (status) {
            case 'uploaded':
               return <CheckIcon />
            default:
               return (
                  <IconImage component="img" alt="icon" src={Icons.download} />
               )
         }
      }

      return (
         <Container>
            <Label>Загрузите {label}</Label>
            <input
               ref={fileInputRef}
               type="file"
               accept={accept}
               onChange={handleFileChange}
               style={{ display: 'none' }}
            />
            <StyledButton
               onClick={handleClick}
               startIcon={getIcon()}
               variant={status === 'uploaded' ? 'contained' : 'outlined'}
            >
               {getButtonText()}
            </StyledButton>
         </Container>
      )
   }
)

export default UploadButton

const Container = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
})

const Label = styled(Box)({
   marginBottom: '4px',
   fontSize: 14,
})

const StyledButton = styled(Button)(({ status }) => ({
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
