// import './App.css'

// const App = () => <h1>eBook-js-16-ev</h1>

// export default App

import React from 'react'
import Chip from './components/UI/Chip'
import { Icons } from './assets/icons'
import { Box, styled } from '@mui/material'
// import vec from "./assets/icons/svgs/vector.svg"

const App = () => {
   return (
      <Box>
         <Chip
            label="Зарубежная литература"
            onDelete={() => console.log('delete')}
         />
         <Chip
            color="yellow"
            label="color"
            // deleteIcon={
            // <img src={vec} style={{ width: 16, height: 16 } />
            // }
            onDelete={() => alert('hello1')}
         />

         <img src={Icons.x} alt="" />
      </Box>
   )
}
export default App

const StyledBox = styled(Box)(() => ({}))
