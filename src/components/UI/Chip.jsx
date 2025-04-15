import React from 'react'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material'

const RChip = ({
   label,
   onClick,
   onDelete,
   deleteIcon,
   icon,
   avatar,
   color = 'default',
   variant = 'filled',
   sx = {},
   ...rest
}) => {
   return (
      <StyleChip
         label={label}
         onClick={onClick}
         onDelete={onDelete}
         deleteIcon={deleteIcon}
         icon={icon}
         avatar={avatar}
         color={color}
         variant={variant}
         sx={{
            m: 0.5,
            fontWeight: 500,
            cursor: onClick ? 'pointer' : 'default',
            ...sx,
         }}
         {...rest}
      />
   )
}

export default RChip

const StyleChip = styled(Chip)`
   border: 1px solid #c4c4c4;
   border-radius: 0;
   background-color: #ffffff;
   :hover {
      border-color: #f34901;
      color: #f34901;
      background-color: #ffffff;
   }
`
