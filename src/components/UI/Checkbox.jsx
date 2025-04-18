import {
   FormGroup,
   FormControlLabel,
   Checkbox as MuiCheckbox,
   styled,
} from '@mui/material'
import { forwardRef } from 'react'

const Checkbox = forwardRef(
   ({ label = '', checked, onChange, ...rest }, ref) => {
      return (
         <FormGroup>
            <FormControlLabel
               control={
                  <StyledCheckbox
                     checked={checked}
                     onChange={onChange}
                     ref={ref}
                     {...rest}
                  />
               }
               label={label}
            />
         </FormGroup>
      )
   }
)

export default Checkbox

const StyledCheckbox = styled(MuiCheckbox)({
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
