import { Breadcrumbs, Typography, styled } from '@mui/material'
import { Link } from 'react-router'

const RoleBreadcrumbs = ({ role, bookName }) => {
   let homeLink = '/'
   let homeText = 'Главная'

   if (role === 'admin') {
      homeLink = '/admin/application'
      homeText = 'Заявки'
   } else if (role === 'vendor') {
      homeLink = '/vendor'
      homeText = 'Главная'
   } else if (role === 'user') {
      homeLink = '/catalog'
      homeText = 'Каталог'
   }

   return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3, marginTop: '20px' }}>
         <StyledLink to={homeLink}>{homeText}</StyledLink>
         <Typography sx={{ fontWeight: 500 }} color="text.primary">
            {bookName}
         </Typography>
      </Breadcrumbs>
   )
}

export default RoleBreadcrumbs

const StyledLink = styled(Link)(({ theme }) => ({
   textDecoration: 'none',
   color: theme.palette.primary.darkGray,
   fontWeight: 400,
   '&:hover': {
      textDecoration: 'underline',
   },
}))
