import { Box, styled, Typography } from "@mui/material"
import Button from "./UI/buttons/Button"

const CatygoryBook = () => {
  return (
    <StyledCont>
      <StyledBox>
        <Typography variant="h4">
        Последние публикации
        </Typography>
        <Button variant='outlined' icon={true}>Смотреть все</Button>
      </StyledBox>

    </StyledCont>
  )
}

export default CatygoryBook

const StyledCont = styled(Box)({
  height: 960,
  padding: '150px 80px',
  backgroundColor: '#1c1c1c'
})

const StyledBox = styled(Box)({
  color: '#ffffff',

})