import { forwardRef } from 'react'
import { Chip as MuiChip, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Chip = forwardRef(
   ({
      label,
      onClick,
      onDelete,
      deleteIcon,
      icon,
      avatar,
      color = 'default',
      variant = 'filled',
      ...rest
   }, ref) => {
      const finalDeleteIcon = deleteIcon ?? (
         <CloseIcon className="custom-delete-icon" />
      )

      return (
         <StyleChip
         ref={ref}
            label={label}
            onClick={onClick}
            onDelete={onDelete}
            deleteIcon={onDelete ? finalDeleteIcon : undefined}
            icon={icon}
            avatar={avatar}
            color={color}
            variant={variant}
            clickable={!!onClick}
            {...rest}
         />
      )
   }
)

export default Chip

const StyleChip = styled(MuiChip, {
   shouldForwardProp: (prop) => prop !== 'clickable',
})(({ clickable }) => ({
   margin: '4px',
   fontWeight: 500,
   boxShadow: 'none',
   cursor: clickable ? 'pointer' : 'default',
   border: '1px solid #c4c4c4',
   borderRadius: 0,
   backgroundColor: '#ffffff',

   '& .custom-delete-icon': {
      color: 'black',
      width: '14px',
   },

   '&:hover': {
      borderColor: '#f34901',
      color: '#f34901',
      backgroundColor: '#ffffff',

      '& .custom-delete-icon': {
         color: '#f34901',
      },

      '& .MuiChip-icon': {
         color: '#f34901',
      },
   },
}))
