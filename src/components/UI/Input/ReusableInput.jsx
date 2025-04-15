import React from 'react'
import { TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { styled } from '@mui/material/styles'

{
   /*  3 вида инпута
    <ReusableInput type="search" />  поиск
    <ReusableInput type="info" />  инфо
      <ReusableInput type="info" withIcon={false} /> инфо без иконки */
}
const MyInput = styled(TextField)(({ type, width }) => {
   const commonStyles = {
      width: width || '100%',

      '& .MuiOutlinedInput-root': {
         backgroundColor: '#fafafa',
         borderRadius: '4px',
         height: '50px',
         fontSize: '16px',

         '& fieldset': {
            borderColor: '#C4C4C4',
         },
         '&:hover fieldset': {
            borderColor: '#C4C4C4',
         },
         '&.Mui-focused fieldset': {
            borderColor: '#f26522',
            borderWidth: '2px',
         },

         '& input': {
            padding: '12px 14px',
            fontSize: '16px',
            color: '#000',

            '&::placeholder': {
               color: type === 'search' ? '#C4C4C4' : '#C4C4C4',
               opacity: 1,
               transition: 'opacity 0.2s ease',
            },
            '&:focus::placeholder': {
               opacity: type === 'search' ? 0 : 1,
            },
         },
         '&.Mui-focused .MuiSvgIcon-root': {
            color: '#f26522',
         },
      },
   }

   if (type === 'search') {
      return {
         ...commonStyles,
         '& .MuiOutlinedInput-root': {
            ...commonStyles['& .MuiOutlinedInput-root'],
            borderRadius: '0px',
            backgroundColor: '#f7f7f7',
            width: '895px',
            height: '40px',
         },
         '& .MuiSvgIcon-root': {
            color: '#C4C4C4',
         },
         '&:hover .MuiSvgIcon-root': {
            color: '#C4C4C4',
         },
      }
   }

   if (type === 'info') {
      return {
         ...commonStyles,
         '& .MuiOutlinedInput-root': {
            ...commonStyles['& .MuiOutlinedInput-root'],
            borderRadius: '0px',
            backgroundColor: '#fff',
            width: '514px',
            height: '38px',

            '& .MuiSvgIcon-root': {
               color: '#C4C4C4',
            },
            '&.Mui-focused .MuiSvgIcon-root': {
               color: '#000000',
            },
            '&.Mui-focused fieldset': {
               borderColor: '#000000',
               borderWidth: '2px',
            },
         },
      }
   }

   return commonStyles
})

export const ReusableInput = ({ type = 'search', withIcon = true }) => {
   return (
      <MyInput
         placeholder={
            type === 'search'
               ? 'Искать жанр, книги, авторов, издательства...'
               : 'Напишите ваше имя'
         }
         InputProps={{
            endAdornment: withIcon ? (
               type === 'search' ? (
                  <SearchIcon />
               ) : (
                  <RemoveRedEyeIcon />
               )
            ) : null,
         }}
         variant="outlined"
         type={type}
         autoComplete="off"
      />
   )
}
