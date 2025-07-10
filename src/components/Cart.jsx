import { Box } from '@mui/material'
import React from 'react'

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
                  {isEdit ? 'Редактировать' : 'Добавить книгу'}
               </Typography>
            </Breadcrumbs>
   </Box>
}

export default Cart
