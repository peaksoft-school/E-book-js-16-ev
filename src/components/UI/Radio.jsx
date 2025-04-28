import { forwardRef } from 'react'
import { FormControlLabel, Radio as MuiRadio, styled } from '@mui/material'

const Radio = forwardRef(
   ({ value, label, checked, onChange, ...rest }, ref) => (
      <FormControlLabel
         value={value}
         control={
            <StyledRadio
               checked={checked}
               onChange={onChange}
               value={value}
               ref={ref}
               {...rest}
            />
         }
         label={label}
      />
   )
)

export default Radio

const StyledRadio = styled(MuiRadio)({
   '&.Mui-checked': {
      color: '#F34901',
   },

   '&:hover': {
      backgroundColor: 'transparent',
   },

   '&.Mui-focusVisible': {
      outline: 'none',
      boxShadow: 'none',
   },
})
