import './App.css'
import { Typography, styled } from '@mui/material'
const App = () => <StyledTypography>eBook-js-16-ev</StyledTypography>

export default App

const StyledTypography = styled(Typography)(({ theme }) => ({
   color: theme.palette.primary.darkGray,
}))
