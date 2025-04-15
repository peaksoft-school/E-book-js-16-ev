// import { Button , styled } from '@mui/material'

import { Button, styled } from '@mui/material'

const Buttonf = ({
   children,
   onClick,
   variant = 'contained',
   disabled,
   type = 'submit',
   ...rest
}) => {
   return (
      <>
         <StyledButton
            onClick={onClick}
            type={type}
            disabled={disabled}
            variant={variant}
            {...rest}
         >
            {children}
         </StyledButton>
      </>
   )
}

export default Buttonf

const StyledButton = styled(Button)(({ variant }) => {
   const buttonStyles = {
      '&.MuiButton-root': {
         borderRadius: 0,
         height: '42px',
         width: '99px',
         padding: '10px 24px',
         marginTop: '20px',
         fontSize: '16px',
      },
   }

   if (variant === 'contained') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],

         backgroundColor: '#1c1c1c',
         color: '#fff',

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
         },
         '&:active': {
            backgroundColor: '#E54400',
            color: '#FFFFFF',
         },
         '&.Mui-disabled': {
            backgroundColor: '#1C1B1F1F',
            color: 'white',
            border: 'none',
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
   } else if (variant === 'notbor') {
      buttonStyles['&.MuiButton-root'] = {
         ...buttonStyles['&.MuiButton-root'],
         fontSize: '16px',
         border: 'none',
         color: '#969696',
         backgroundColor: 0,
         boxShadow: 0,
         outline: 0,
         transition: 0,

         '&:hover': {
            backgroundColor: 0,
            boxShadow: 0,
            transition: 0,
         },
         '&:active': {
            color: '#F34901',
            backgroundColor: 0,
            boxShadow: 0,
            transition: 0,
         },
         '&.Mui-disabled': {
            color: '#969696',
            backgroundColor: 0,
            boxShadow: 0,
            transition: 0,
         },
         '&:focus': {
            boxShadow: 0,
            outline: 0,
            backgroundColor: 0,
            transition: 0,
         },
         '&:focus-visible': {
            boxShadow: 0,
            outline: 0,
            backgroundColor: 0,
            transition: 'none',
         },
      }
   }

   return buttonStyles
})
