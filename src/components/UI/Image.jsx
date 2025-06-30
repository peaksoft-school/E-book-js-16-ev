import { useRef, useState, useEffect } from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import { Icons } from '../../assets/icons/index'

const UploadImageBox = ({ file, onChange }) => {
   const inputRef = useRef()
   const [image, setImage] = useState(() =>
      typeof file === 'string' ? file : file ? URL.createObjectURL(file) : null
   )

   const handleClick = () => inputRef.current.click()

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      if (selectedFile && selectedFile.type.startsWith('image/')) {
         const url = URL.createObjectURL(selectedFile)
         setImage(url)
         onChange(selectedFile)
         e.target.value = null
      }
   }

   useEffect(() => {
      if (typeof file === 'string') {
         setImage(file)
      } else if (file instanceof File) {
         const url = URL.createObjectURL(file)
         setImage(url)
         return () => URL.revokeObjectURL(url)
      }
   }, [file])

   return (
      <UploadBox onClick={handleClick}>
         <input
            type="file"
            accept="image/*"
            ref={inputRef}
            hidden
            onChange={handleFileChange}
         />
         {!image ? (
            <>
               <Button>
                  <img src={Icons.photo} alt="icon" />
               </Button>
               <StyledTypography>
                  Нажмите на иконку чтобы загрузить или перетащите фото
               </StyledTypography>
            </>
         ) : (
            <Preview src={image} alt="preview" />
         )}
      </UploadBox>
   )
}

export default UploadImageBox

const UploadBox = styled(Box)(({ theme }) => ({
   width: 235,
   height: 312,
   backgroundColor: '#ECECEC',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   flexDirection: 'column',
   cursor: 'pointer',
   overflow: 'hidden',
   position: 'relative',
   '&:hover': {
      borderColor: theme.palette.primary.main,
   },
}))

const Preview = styled('img')({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   position: 'absolute',
   top: 0,
   left: 0,
})

const StyledTypography = styled(Typography)(({ theme }) => ({
   fontSize: 14,
   textAlign: 'center',
   width: 150,
   marginTop: 200,
   position: 'absolute',
   color: theme.palette.secondary.placeholderGray,
}))
