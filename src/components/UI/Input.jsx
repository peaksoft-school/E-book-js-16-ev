import { useState, forwardRef } from 'react'
import {
   TextField,
   InputAdornment,
   IconButton,
   InputLabel, // Keep this import
   styled,
   Box,
   Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useSelector } from 'react-redux'

const Input = forwardRef(
   (
      {
         type = 'search',
         withIcon = type !== 'info',
         placeholder,
         value = '',
         onChange,
         iconVariant = 'on',
         label, // Ensure label is destructured
         multiline = false,
         rows,
         inputProps,
         width = '100%',
         maxLength,
         error,
         helperText,
         customIcon,
         ...rest
      },
      ref
   ) => {
      const [isPasswordVisible, setIsPasswordVisible] = useState(false)
      const { role } = useSelector((state) => state.auth)
      if (!placeholder) {
         console.error('Ошибка: placeholder является обязательным пропсом')
      }

      const handleTogglePasswordVisibility = () =>
         setIsPasswordVisible((prev) => !prev)

      const getEndAdornment = () => {
         if (customIcon)
            return (
               <Box
                  component="img"
                  src={customIcon}
                  alt="icon"
                  sx={{ width: 20, height: 20 }}
               />
            )
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
         <Box
            width={type === 'description' ? 650 : '100%'}
            display="flex"
            flexDirection="column"
         >
            {label && (
               <InputLabel sx={{ color: '#5d5d5d', marginBottom: 1 }}>
                  {label}
               </InputLabel>
            )}

            <StyledInput
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               variant="outlined"
               type={resolvedInputType}
               autoComplete="off"
               inputType={type}
               ref={ref}
               multiline={multiline}
               rows={rows}
               sx={{ width }}
               error={error}
               helperText={helperText}
               InputProps={{
                  endAdornment: (
                     <InputAdornment position="end">
                        {getEndAdornment()}
                     </InputAdornment>
                  ),
               }}
               inputProps={{ maxLength, ...inputProps }}
               {...rest}
            />

            {type === 'description' && maxLength && (
               <Typography
                  sx={{
                     marginTop: '4px',
                     fontSize: 14,
                     color: value.length > maxLength * 0.9 ? 'red' : '#9E9E9E',
                     userSelect: 'none',
                     alignSelf: 'flex-end',
                  }}
               >
                  {value.length} / {maxLength}
               </Typography>
            )}
         </Box>
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
      },
   }

   if (inputType === 'search') {
      return {
         ...common,
         '& .MuiOutlinedInput-root': {
            ...common['& .MuiOutlinedInput-root'],
            borderRadius: '0px',
            backgroundColor: '#f7f7f7',
            maxWidth: '895px',
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
            height: '40px',
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

   if (inputType === 'description') {
      return {
         ...common,
         width: '650px',
         '& .MuiOutlinedInput-root': {
            ...common['& .MuiOutlinedInput-root'],
            backgroundColor: '#fff',
            borderRadius: '0px',
            height: 'auto',
            alignItems: 'flex-start',
            '& textarea': {
               padding: '1px',
               fontSize: '16px',
               lineHeight: 1.5,
               height: '200px',
               resize: 'none',
               boxSizing: 'border-box',
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
