import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, styled, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Input from '../../components/UI/Input'
import DiscountCard from '../../components/UI/cards/DiscountCard'
import { fetchBooksByPromoCode } from '../../store/user/promo/promoThunk'
import { Icons } from '../../assets/icons'
import { orange } from '@mui/material/colors'

const Promo = () => {
   const dispatch = useDispatch()
   const { books, isLoading, error } = useSelector((state) => state.promo)

   const [promoCode, setPromoCode] = useState('')
   const [submitted, setSubmitted] = useState(false)

   const handleSubmit = () => {
      if (!promoCode.trim()) return
      setSubmitted(true)
      dispatch(fetchBooksByPromoCode({ code: promoCode.trim() }))
   }

   return (
      <StyledBox>
         <StyledFirstBox>
            <img src={Icons.promo} alt="promo" />
            <Typography variant="h5" mb={2}>
               Активация промокода eBook
            </Typography>

            <StyledSearchBox>
               <TextField
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Введите промокод"
                  variant="outlined"
                  size="small"
                  sx={{
                     width: 600,
                     '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                     },
                  }}
               />
               <StyledButton
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
               >
                  Активировать
               </StyledButton>
            </StyledSearchBox>

            <Typography className="text" variant="body2">
               Промокоды eBook на скидки и подарки вы можете получить в
               рассылках.
            </Typography>
         </StyledFirstBox>

         {submitted && (
            <StyledSecondBox>
               {isLoading && <Typography>Загрузка...</Typography>}
               {error && <Typography color="error">{error}</Typography>}
               {!isLoading && !error && (
                  <>
                     <Typography
                        sx={{ marginBottom: '30px', color: 'lightgray' }}
                        mb={2}
                     >
                        Найдено {books.length} книг:
                     </Typography>
                     <StyledBooksBox>
                        {books.map((book) => (
                           <DiscountCard
                              key={book.bookId}
                              title={book.bookName}
                              authors={book.authors}
                              image={book.image}
                              price={book.priceWithDiscount}
                              discount={parseInt(
                                 book.discount.replace('%', '').replace('-', '')
                              )}
                           />
                        ))}
                     </StyledBooksBox>
                  </>
               )}
            </StyledSecondBox>
         )}
      </StyledBox>
   )
}

export default Promo

const StyledSearchBox = styled(Box)({
   display: 'flex',
})

const StyledBox = styled(Box)({
   marginRight: 80,
   marginLeft: 80,
})

const StyledFirstBox = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   marginTop: 40,
   marginBottom: 85,
   '& .text': {
      marginTop: 20,
   },
})

const StyledButton = styled(Button)({
   '&.MuiButton-root': {
      borderRadius: 0,
      textTransform: 'none',
      padding: '10px 19px',
      width: '250px',
      height: '40px',
      fontSize: '16px',
      backgroundColor: '#F34901',
      color: '#FFFFFF',
   },

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
})

const StyledSecondBox = styled(Box)({
   marginBottom: 150,
})

const StyledBooksBox = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 45,
})