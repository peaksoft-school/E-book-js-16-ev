import React, { useRef, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/system'
import UploadIcon from '@mui/icons-material/CloudUpload'

const UploadBox = styled(Box)(({ theme }) => ({
  width: 130,
  height: 180,
  border: '2px dashed gray',
  borderRadius: '8px',
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

const UploadImageBox = ({ onChange }) => {
  const inputRef = useRef()
  const [image, setImage] = useState(null)

  const handleClick = () => inputRef.current.click()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setImage(url)
      onChange(file)
    }
  }

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
          <IconButton>
            <UploadIcon />
          </IconButton>
          <Typography fontSize={12} textAlign="center">
            Загрузить фото
          </Typography>
        </>
      ) : (
        <Preview src={image} alt="preview" />
      )}
    </UploadBox>
  )
}

export default UploadImageBox
