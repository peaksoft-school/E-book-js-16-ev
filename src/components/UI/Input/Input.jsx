import { useState, forwardRef } from 'react'
import {
   TextField,
   InputAdornment,
   IconButton,
   InputLabel,
   styled,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const Input = forwardRef(
   (
      {
         type = 'search',
         withIcon = type !== 'info',
         placeholder,
         value,
         onChange,
         iconVariant = 'on',
         label,
         ...rest
      },
      ref
   ) => {
      const [isPasswordVisible, setIsPasswordVisible] = useState(false)

      if (!placeholder)
         return console.error(
            'Ошибка: placeholder является обязательным пропсом'
         )

      const handleTogglePasswordVisibility = () =>
         setIsPasswordVisible((prev) => !prev)

      const getEndAdornment = () => {
         if (!withIcon) return null

         if (type === 'search') return <SearchIcon />

         if (type === 'password') {
            return (
               <IconButton edge="end" onClick={handleTogglePasswordVisibility}>
                  {isPasswordVisible ? (
                     <RemoveRedEyeIcon />
                  ) : (
                     <VisibilityOffIcon />
                  )}
               </IconButton>
            )
         }

         return null
      }

      const resolvedInputType =
         type === 'password'
            ? isPasswordVisible
               ? 'text'
               : 'password'
            : 'text'

      return (
         <>
            {label && <InputLabel>{label}</InputLabel>}

            <StyledInput
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               variant="outlined"
               type={resolvedInputType}
               autoComplete="off"
               inputType={type}
               ref={ref}
               InputProps={{
                  endAdornment: (
                     <InputAdornment position="end">
                        {getEndAdornment()}
                     </InputAdornment>
                  ),
               }}
               {...rest}
            />
         </>
      )
   }
)

export default Input

const StyledInput = styled(TextField, {
   shouldForwardProp: (prop) => prop !== 'inputType',
})(({ inputType }) => {
   const common = {
      width: '100%',

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
               color: '#C4C4C4',
               opacity: 1,
               transition: 'opacity 0.2s ease',
            },

            '&:focus::placeholder': {
               opacity: inputType === 'search' ? 0 : 1,
            },
         },

         '&.Mui-focused .MuiSvgIcon-root': {
            color: '#f26522',
         },
      },
   }

   if (inputType === 'search') {
      return {
         ...common,

         '& .MuiOutlinedInput-root': {
            ...common['& .MuiOutlinedInput-root'],
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

   if (inputType === 'password') {
      return {
         ...common,
         '& .MuiOutlinedInput-root': {
            ...common['& .MuiOutlinedInput-root'],
            borderRadius: '0px',
            backgroundColor: '#fff',
            width: '514px',
            height: '38px',

            '& .MuiSvgIcon-root': {
               color: '#C4C4C4',
            },

            '&.Mui-focused .MuiSvgIcon-root': {
               color: '#C4C4C4',
            },

            '&.Mui-focused fieldset': {
               borderColor: '#C4C4C4',
               borderWidth: '2px',
            },
         },
      }
   }

   if (inputType === 'info') {
      return {
         ...common,
         '& .MuiOutlinedInput-root': {
            ...common['& .MuiOutlinedInput-root'],
            borderRadius: '0px',
            backgroundColor: '#fff',
            width: '514px',
            height: '38px',

            '& .MuiSvgIcon-root': {
               color: '#C4C4C4',
            },

            '&.Mui-focused .MuiSvgIcon-root': {
               color: '#C4C4C4',
            },

            '&.Mui-focused fieldset': {
               borderColor: '#C4C4C4',
               borderWidth: '2px',
            },
         },
      }
   }

   return common
})
