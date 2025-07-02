import {
   FormControl,
   Typography,
   MenuItem,
   Select,
   ListItemText,
   OutlinedInput,
   styled,
} from '@mui/material'
import Checkbox from './Checkbox'
import { Icons } from '../../assets/icons'
import { useState } from 'react'

const SelectField = ({
   label,
   value = multiple ? [] : '',
   onChange,
   options = [],
   multiple = false,
   placeholder = 'Выберите...',
   width = '650px',
}) => {
   const toggleValue = (val) => {
      if (!multiple) {
         return onChange(val)
      }
      const exists = value.includes(val)
      const newValue = exists ? value.filter((v) => v !== val) : [...value, val]
      onChange(newValue)
   }

   const DownIcon = () => (
      <img
         src={Icons.down}
         alt="down arrow"
         style={{ width: 16, height: 16, right: 10, position: 'absolute' }}
      />
   )

   const UpIcon = () => (
      <img
         src={Icons.down}
         alt="down arrow"
         style={{ width: 16, height: 16, right: 10, position: 'absolute' }}
      />
   )
   const [openGenre, setOpenGenre] = useState(false)

   return (
      <StyledFormControl width={width}>
         {label && (
            <Typography sx={{ marginBottom: '7px' }}>{label}</Typography>
         )}

         <CustomSelect
            multiple={multiple}
            displayEmpty
            value={value}
            input={<OutlinedInput />}
            IconComponent={openGenre ? UpIcon : DownIcon}
            onOpen={() => setOpenGenre(true)}
            onClose={() => setOpenGenre(false)}
            renderValue={(selected) => {
               if (
                  !selected ||
                  (Array.isArray(selected) && selected.length === 0)
               ) {
                  return <span style={{ color: '#969696' }}>{placeholder}</span>
               }

               if (multiple) {
                  return selected
                     .map((val) => {
                        const found = options.find((opt) =>
                           typeof opt === 'string'
                              ? opt === val
                              : opt.value === val
                        )
                        return typeof found === 'string'
                           ? found
                           : found?.label || val
                     })
                     .join(', ')
               } else {
                  const found = options.find((opt) =>
                     typeof opt === 'string'
                        ? opt === selected
                        : opt.value === selected
                  )
                  return typeof found === 'string'
                     ? found
                     : found?.label || selected
               }
            }}
         >
            {options.map((opt) => {
               const val = typeof opt === 'string' ? opt : opt.value
               const labelText = typeof opt === 'string' ? opt : opt.label

               return (
                  <MenuItem
                     key={val}
                     value={val}
                     onClick={() => toggleValue(val)}
                  >
                     {multiple && (
                        <Checkbox
                           checked={value.includes(val)}
                           onChange={() => toggleValue(val)}
                        />
                     )}
                     <ListItemText primary={labelText} />
                  </MenuItem>
               )
            })}
         </CustomSelect>
      </StyledFormControl>
   )
}
export default SelectField

const StyledFormControl = styled(FormControl)(({ width }) => ({
   borderRadius: 0,
   '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      height: 40,
      width: width,
      '& fieldset': {
         borderRadius: 0,
      },
   },
}))

const CustomSelect = styled(Select)(() => ({
   '.MuiSelect-select': {
      padding: '8px 14px',
      fontSize: 16,
      display: 'flex',
      alignItems: 'center',
   },
   '& svg': {
      color: '#C4C4C4',
   },
}))
