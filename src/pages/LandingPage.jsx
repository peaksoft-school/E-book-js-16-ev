import { AppBar, Toolbar, Typography, Button, Box, styled } from '@mui/material'
import { Icons } from '../assets/icons/index'
import VendorFooter from '../layout/VendorFooter'
import VendorCard from '../components/UI/VendorCard'
import { VENDORCARDS, VENDORCARDS2 } from '../utils/constants'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const LandingPage = () => {
   const navigate = useNavigate()
   const { user, isAuth } = useSelector((state) => state.auth)

   const handleSignUp = () => {
      navigate('/sign-up-vendor')
   }
   const handleSignIn = () => {
      navigate('/sign-in')
   }
   const handleHome = () => {
      navigate('/')
   }

   return (
      <>
         <StyledAppBar>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
               <Box>
                  <img src={Icons.eBook} alt="" onClick={handleHome} />
               </Box>

               <NavButton onClick={handleSignIn}>Личный кабинет</NavButton>
            </Toolbar>
         </StyledAppBar>

         <StyledMain>
            <StyledSectionUp>
               <Box>
                  <Title>
                     Портал в <Orange>книжный</Orange> мир
                  </Title>

                  <Subtitle>Начните продавать свои книги на eBook</Subtitle>

                  <StyledButton onClick={handleSignUp}>
                     Стать продавцом
                  </StyledButton>
               </Box>

               <Box>
                  <StyledCircle>
                     <StyledImg src={Icons.knowledge} alt="" />
                  </StyledCircle>
               </Box>
            </StyledSectionUp>

            <StyledCardsBoxUp>
               <StyledCardTitle>Как начать продавать на eBook?</StyledCardTitle>

               <StyledCards>
                  {VENDORCARDS.map((item) => (
                     <VendorCard img={item.img} text={item.text} />
                  ))}
               </StyledCards>
            </StyledCardsBoxUp>

            <StyledCardsBoxDown>
               <StyledCardTitle>Условия</StyledCardTitle>

               <StyledCards>
                  {VENDORCARDS2.map((item) => (
                     <VendorCard img={item.img} text={item.text} />
                  ))}
               </StyledCards>
            </StyledCardsBoxDown>

            <StyledButtonBox>
               <StyledButton onClick={handleSignUp}>
                  Стать продавцом
               </StyledButton>
            </StyledButtonBox>
         </StyledMain>

         <VendorFooter />
      </>
   )
}

export default LandingPage

const StyledAppBar = styled(AppBar)({
   width: '100%',
   maxWidth: '80rem',
   margin: '0 auto',
   backgroundColor: '#fff',
   boxShadow: 'none',
   position: 'static',
})

const NavButton = styled(Button)({
   color: '#C4C4C4',
   backgroundColor: 'white',
   textTransform: 'none',
   fontSize: '1rem',
   width: '153px',
   height: '39px',
   border: '1px solid #C4C4C4',
   borderRadius: 0,
})

const StyledMain = styled(Box)({
   width: '100%',
   maxWidth: '80rem',
   margin: '0 auto',
   padding: '1.25rem',
})

const StyledSectionUp = styled(Box)({
   width: '100%',
   maxWidth: '80rem',
   margin: '0 auto',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
})

const Title = styled(Typography)(({ theme }) => ({
   fontFamily: 'VKHUETYPE, sans-serif',
   fontSize: '4.5rem',
   fontWeight: 400,
   marginBottom: theme.spacing(2),
}))

const Subtitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.25rem',
   color: '#000000',
   marginBottom: theme.spacing(3),
   fontFamily: 'Open Sans, sans-serif',
   fontWeight: 400,
   marginTop: '9px',
   marginBottom: '73px',
}))

const StyledButton = styled(Button)(({ theme }) => ({
   padding: theme.spacing(1.5, 4),
   fontSize: '1rem',
   borderRadius: 0,
   backgroundColor: '#F8DF00',
   color: '#000000',
   width: '14rem',
   height: '2.9rem',
   padding: '10px 24px',
   fontWeight: 600,
}))

const StyledCircle = styled(Box)({
   width: '35.5rem',
   height: '35.5rem',
   backgroundColor: '#DAEEC8',
   borderRadius: '100%',
   position: 'relative',
   overflow: 'visible',
})

const Orange = styled('span')({
   color: '#F34901',
   fontFamily: 'VKHUETYPE, sans-serif',
})

const StyledImg = styled('img')({
   position: 'absolute',
   left: '-50px',
   top: '60%',
   transform: 'translateY(-50%)',
})

const StyledCards = styled(Box)({
   display: 'flex',
   gap: '20px',
})

const StyledCardsBoxUp = styled(Box)({
   marginTop: '139px',
   marginBottom: '151px',
})

const StyledCardsBoxDown = styled(Box)({
   marginBottom: '235px',
})

const StyledButtonBox = styled(Box)({
   margin: '0 500px ',
   marginBottom: '84px',
})

const StyledCardTitle = styled(Typography)({
   fontSize: '24px',
   fontWeight: 600,
   fontFamily: 'Open Sans, sans-serif',
   marginBottom: '61px',
})
