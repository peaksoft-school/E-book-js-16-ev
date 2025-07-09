import { Box, Button as MUIButton, styled } from '@mui/material'
import { forwardRef } from 'react'
import { Icons } from '../../../assets/icons'

const Button = forwardRef(
   (
      {
         children,
         onClick,
         variant = 'contained',
         disabled,
         type = 'submit',
         color,
         icon = false,
         ...rest
      },
      ref
   ) => (
      <StyledButton
         disableRipple={true}
         onClick={onClick}
         type={type}
         disabled={disabled}
         variant={variant}
         color={color}
         ref={ref}
         {...rest}
      >
         {icon && <StyledImg component="img" src={Icons.plusw} alt="plus" />}
         {children}
      </StyledButton>
   )
)

export default Button

const StyledImg = styled(Box)`
   margin-right: 8px;
`
const StyledButton = styled(MUIButton)(({ variant }) => {
   const buttonStyles = {
      '&.MuiButton-root': {
         borderRadius: 0,
         height: '42px',
         width: '99px',
         padding: '10px 24px',
         textTransform: 'none',
         fontSize: '16px',
      },
   }

   if (variant === 'contained') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],

         backgroundColor: '#1c1c1c',
         color: '#fff',
         fontSize: '14px',
         marginTop: 0,

         '&:hover': {
            backgroundColor: '#484848',
            transition: 'all 0.3s',
         },

         '&:active': {
            backgroundColor: '#F34901',
         },

         '&.Mui-disabled': {
            backgroundColor: '#BDBDBD',
            color: 'white',
         },
      }
   } else if (variant === 'warning') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],
         width: '224px',
         height: '33px',
         padding: '8px 25px',
         fontSize: '14px',
         backgroundColor: '#F34901',
         color: '#ffffff',

         '&:hover': {
            backgroundColor: '#Fe6F33',
            color: '#ffffff',
         },

         '&:active': {
            backgroundColor: '#E54400',
            Color: '#ffffff',
         },

         '&.Mui-disabled': {
            color: '#1C1B1F1F',
            backgroundColor: '#ffffff',
         },
      }
   } else if (variant === 'outlined') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],
         padding: '10px',
         width: '160px',
         height: '39px',
         fontSize: '14px',
         backgroundColor: '#ffffff',
         border: '1px solid #C4C4C4',
         color: '#C4C4C4',

         '&:hover': {
            backgroundColor: '#FE6F33',
            color: '#ffffff',
            border: 'none',
         },

         '&:active': {
            backgroundColor: '#E54400',
            color: '#FFFFFF',
            border: 'none',
         },

         '&.Mui-disabled': {
            backgroundColor: '#1C1B1F1F',
            color: 'white',
            border: 'none',
         },
      }
   } else if (variant === 'borderOrg') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],
         width: '224px',
         height: '33px',
         padding: '8px 25px',
         fontSize: '14px',
         color: '#F34901',
         border: '1px solid #F34901',

         '&:hover': {
            backgroundColor: '#Fe6F33',
            color: '#ffffff',
         },

         '&:active': {
            backgroundColor: '#E54400',
            Color: '#ffffff',
         },

         '&.Mui-disabled': {
            color: '#1C1B1F1F',
            backgroundColor: '#ffffff',
         },
      }
   }else if (variant === 'borderOrgS') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],
         width: '180px',
         height: '42px',
         padding: '8px 25px',
         fontSize: '14px',
         color: '#F34901',
         border: '1px solid #F34901',

         '&:hover': {
            backgroundColor: '#Fe6F33',
            color: '#ffffff',
         },

         '&:active': {
            backgroundColor: '#E54400',
            Color: '#ffffff',
         },

         '&.Mui-disabled': {
            color: '#1C1B1F1F',
            backgroundColor: '#ffffff',
         },
      }
   } else if (variant === 'add') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],
         padding: '10px 19px',
         width: '209px',
         height: '42px',
         fontSize: '16px',
         backgroundColor: '#F34901',
         color: '#FFFFFF',

         '&:hover': {
            backgroundColor: '#F34901',
            color: '#ffffff',
         },

         '&:active': {
            backgroundColor: '#F34901',
            color: '#FFFFFF',
         },

         '&.Mui-disabled': {
            backgroundColor: '#1C1B1F1F',
            color: 'white',
            border: 'none',
         },
      }
   } else if (variant === 'large') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],
         padding: '10px',
         width: '1277px',
         height: '39px',
         fontSize: '14px',
         backgroundColor: '#ffffff',
         border: '1px solid #C4C4C4',
         color: '#969696',

         '&:hover': {
            backgroundColor: '#F34901',
            color: '#ffffff',
            border: 'none',
         },

         '&:active': {
            backgroundColor: '#F34901',
            color: '#FFFFFF',
            border: 'none',
         },

         '&.Mui-disabled': {
            backgroundColor: '#1C1B1F1F',
            color: 'white',
            border: 'none',
         },
      }
   } else if (variant === 'notbor') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],
         fontSize: '16px',
         border: 'none',
         color: '#969696',
         width: '200px',
         padding: 0,
         backgroundColor: 0,
         boxShadow: 0,
         outline: 0,
         transition: 0,

         '&:hover': {
            transition: 0,
            padding: 0,
            border: 'none',
         },

         '&:active': {
            color: '#F34901',
            padding: 0,
            border: 'none',
         },

         '&.Mui-disabled': {
            color: '#969696',
            padding: 0,
            border: 'none',
         },

         '&:focus': {
            transition: 0,
            padding: 0,
            border: 'none',
         },

         '&:focus-visible': {
            transition: 'none',
            padding: 0,
            border: 'none',
         },
      }
   } else if (variant === 'notboru') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],
         fontSize: '16px',
         border: 'none',
         color: '#1c1c1c',
         width: '200px',
         padding: 0,
         backgroundColor: 0,
         boxShadow: 0,
         outline: 0,
         transition: 0,
         textDecoration: 'underline',

         '&:hover': {
            transition: 'none',
         },

         '&:active': {
            color: '#F34901',
         },

         '&.Mui-disabled': {
            color: '#969696',
         },

         '&:focus': {
            transition: 'none',
         },

         '&:focus-visible': {
            transition: 'none',
         },
      }
   }

   return buttonStyles
})
