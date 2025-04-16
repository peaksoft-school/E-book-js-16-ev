import React from 'react'
import { FormControlLabel, Radio } from '@mui/material'

const CustomRadio = ({ value, label, checked, onChange }) => {
   return (
      <FormControlLabel
         value={value}
         control={
            <Radio
               checked={checked}
               onChange={onChange}
               value={value}
               sx={{
                  color: '#C4C4C4',
                  '&.Mui-checked': {
                     color: '#F34901',
                  },
               }}
            />
         }
         label={label}
      />
   )
}

export default CustomRadio
