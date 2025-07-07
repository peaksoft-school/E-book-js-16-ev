import { Box, Container, Typography, styled } from '@mui/material'
import { Link as RouterLink } from 'react-router'

const Footer = ({ variant = 'full' }) => (
   <FooterWrapper>
      <FooterContainer maxWidth="lg" disableGutters variant={variant}>
         <FooterColumn>
            <LogoLink to="/">eBooK</LogoLink>

            {variant === 'compact' && (
               <FooterLink>Политика конфиденциальности</FooterLink>
            )}
         </FooterColumn>

         {variant === 'full' && (
            <>
               <FooterColumn>
                  <FooterLink>Жанры</FooterLink>
                  <FooterLink>Аудиокниги</FooterLink>
                  <FooterLink>Электронные книги</FooterLink>
               </FooterColumn>

               <FooterColumn>
                  <FooterLink>Бестселлеры</FooterLink>
                  <FooterLink>Промокоды</FooterLink>
                  <FooterLink>Политика конфиденциальности</FooterLink>
               </FooterColumn>
            </>
         )}

         <FooterColumn>
            <FooterTitle>Свяжитесь с нами</FooterTitle>
            <FooterLink>+996707123456</FooterLink>
            <FooterLink>г. Бишкек ул. Исанова 45</FooterLink>
         </FooterColumn>
      </FooterContainer>
   </FooterWrapper>
)

export default Footer

const FooterWrapper = styled(Box)`
   background-color: #1c1c1c;
   color: white;
   padding: 4.6875rem 14.1875rem 4.6875rem 5rem;
   height: 16.25rem;
`

const FooterContainer = styled(Container, {
   shouldForwardProp: (prop) => prop !== 'variant',
})(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   flexWrap: 'wrap',
   margin: 0,
}))

const FooterColumn = styled(Box)`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`

const LogoLink = styled(RouterLink)`
   font-size: 1.875rem;
   color: white;
   text-decoration: none;
   font-weight: bold;
   margin-bottom: 1rem;

   &:hover {
      text-decoration: underline;
   }
`

const FooterTitle = styled(Typography)`
   font-size: 1.25rem;
   font-weight: 500;
   margin-bottom: 0.5rem;
`

const FooterLink = styled(RouterLink)`
   font-size: 1rem;
   color: white;
   text-decoration: none;
   line-height: 2rem;

   &:hover {
      text-decoration: underline;
   }
`
