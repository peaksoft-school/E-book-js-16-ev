// import { Chip as MuiChip, styled } from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close' 
// import closeicon from '../../assets/icons/svgs/crest.svg'

// const Chip = ({
//   label,
//   onClick,
//   onDelete,
//   deleteIcon,
//   icon,
//   avatar,
//   color = 'default',
//   variant = 'filled',
//   ...rest
// }) => {
//   const finalDeleteIcon = deleteIcon ?? <StyledIcon sx={{ width: 16,color: "black"}} />

//   return (
//     <StyleChip
//       label={label}
//       onClick={onClick}
//       onDelete={onDelete}
//       deleteIcon={onDelete ? finalDeleteIcon : undefined}
//       icon={icon}
//       avatar={avatar}
//       color={color}
//       variant={variant}
//       clickable={!!onClick}
//       {...rest}
//     />
//   )
// }

// export default Chip

// const StyledIcon = styled(CloseIcon)`
//    border-color: black;
// `

// const StyleChip = styled(MuiChip, {
//    shouldForwardProp: (prop) => prop !== 'clickable',
//  })(({ clickable }) => ({
//    margin: '4px', 
//    fontWeight: 500,
//    cursor: clickable ? 'pointer' : 'default',
//    border: '1px solid #c4c4c4',
//    borderRadius: 0,
//    backgroundColor: '#ffffff',
//    '&:hover': {
//      borderColor: '#f34901',
//      color: '#f34901',
//      backgroundColor: '#ffffff',
//      '& .MuiChip-deleteIcon': {
//        color: '#f34901',
//      },
//      '& .MuiChip-icon': {
//        color: '#f34901',
//      },
//    },
//  }))
import { Chip as MuiChip, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close' 

const Chip = ({
  label,
  onClick,
  onDelete,
  deleteIcon,
  icon,
  avatar,
  color = 'default',
  variant = 'filled',
  ...rest
}) => {
  const finalDeleteIcon = deleteIcon ?? <CloseIcon className="custom-delete-icon" />

  return (
    <StyleChip
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

export default Chip

const StyleChip = styled(MuiChip, {
  shouldForwardProp: (prop) => prop !== 'clickable',
})(({ clickable }) => ({
  margin: '4px', 
  fontWeight: 500,
  boxShadow: "none",
  cursor: clickable ? 'pointer' : 'default',
  border: '1px solid #c4c4c4',
  borderRadius: 0,
  backgroundColor: '#ffffff',
  '& .custom-delete-icon': {
    color: 'black',
    width: '14px'
   //  transition: 'color 0.3s ease',
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
