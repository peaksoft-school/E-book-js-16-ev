import { Box, Breadcrumbs, Link as MuiLink, Typography } from '@mui/material'
import { Link } from 'react-router'


const Cart = () => {
   return <Box>
    <Breadcrumbs aria-label="breadcrumb">
               <MuiLink
                  component={Link}
                  to="/admin/books"
                  underline="hover"
                  color="inherit"
               >
                  Главная
               </MuiLink>
               <Typography color="text.primary">
                  {/* { ? 'Избранные' : 'Корзина'} */}
               </Typography>
            </Breadcrumbs>
   </Box>
}

export default Cart
