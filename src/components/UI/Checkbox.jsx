import { forwardRef } from 'react'
import {
   FormGroup,
   FormControlLabel,
   Checkbox as MuiCheckbox,
   styled,
} from '@mui/material'
import { Icons } from '../../assets/icons'

const Checkbox = forwardRef(
   ({ label = '', checked, onChange, ...rest }, ref) => (
      <FormGroup>
         <FormControlLabel
            control={
               <StyledCheckbox
                  checked={checked}
                  onChange={onChange}
                  ref={ref}
                  checkedIcon={<img src={Icons.checked} />}
                  icon={<img src={Icons.noneChecked} />}
                  {...rest}
               />
            }
            label={label}
         />
      </FormGroup>
   )
)

export default Checkbox

const StyledCheckbox = styled(MuiCheckbox)({
   '&.Mui-checked': {
      color: '#F34901',
      borderRadius: 'none',
   },

   '&:hover': {
      backgroundColor: 'transparent',
   },

   '&.Mui-focusVisible': {
      outline: 'none',
      boxShadow: 'none',
   },
})
