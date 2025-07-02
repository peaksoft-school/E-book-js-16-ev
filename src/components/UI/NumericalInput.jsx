import Input from './Input'
import { styled, Typography } from '@mui/material'

const NumericInput = ({
   name,
   value,
   label,
   placeholder,
   width = 228.5,
   maxLength = 4,
   onChange,
   unit = '%',
   sx,
error,
helperText,
}) => {
   const handleChange = (e) => {
      const numericValue = e.target.value.replace(/\D/g, '')
      onChange(name, numericValue)
   }

   return (
     <StyledInput
   name={name}
   value={value || ''}
   placeholder={placeholder}
   label={label}
   type="info"
   sx={sx}
   width={width}
   onChange={handleChange}
   error={error}
   helperText={helperText}
   inputProps={{
      inputMode: 'numeric',
      pattern: '[0-9]*',
      maxLength,
   }}
   InputProps={{
      endAdornment: unit ? (
         <Typography sx={{ color: '#969696' }}>{unit}</Typography>
      ) : null,
   }}
/>

   )
}

export default NumericInput

const StyledInput = styled(Input)(() => ({
   '& .input': {
      margin: 10,
   },
}))
