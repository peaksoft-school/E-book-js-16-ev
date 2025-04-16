import React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const MyCheckbox = ({ label = '', checked, onChange }) => {
   return (
      <FormGroup>
         <FormControlLabel
            control={
               <Checkbox
                  checked={checked}
                  onChange={onChange}
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
      </FormGroup>
   )
}

export default MyCheckbox
