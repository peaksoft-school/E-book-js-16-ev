import { Outlet } from 'react-router'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Typography, styled, Avatar } from '@mui/material'
import SideBar from '../../components/SideBar'
import Input from '../../components/UI/Input'

const AdminLayout = () => {
   return (
      <PageWrapper>
         <SideBar />
         <ContentBox>
            <StyledHeaderBox>
               <Input
                  placeholder="Искать жанр, книги, авторов, издательства..."
                  type="search"
               />
               <Avatar sx={{ bgcolor: '#ddd', width: 40, height: 40 }}>
                  <PersonIcon sx={{ color: '#777' }} />
               </Avatar>
               <Typography variant="h6" fontWeight={500}>
                  Администратор
               </Typography>
            </StyledHeaderBox>
            <Box>
               <Outlet />
            </Box>
         </ContentBox>
      </PageWrapper>
   )
}

export default AdminLayout

const PageWrapper = styled(Box)({
   display: 'flex',
   width: '100vw',
   height: '100vh',
   overflow: 'hidden',
   margin: 0,
   padding: 0,
   boxSizing: 'border-box',
})

const ContentBox = styled(Box)({
   marginLeft: '250px',
   width: 'calc(100vw - 250px)',
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   padding: '20px',
   boxSizing: 'border-box',
   overflow: 'hidden',
})

const StyledHeaderBox = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '10px',
   minHeight: '50px',
   flexShrink: 0,
   gap: '8px',
})
