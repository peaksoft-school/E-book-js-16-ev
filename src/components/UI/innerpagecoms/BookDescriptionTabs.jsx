import { Box, Typography, styled } from '@mui/material'

const BookDescriptionTabs = ({ book, activeTab, setActiveTab, role }) => {
   
   return (
      <TabsContainer role={role}>
         <Box role={role}>
            <Tabs>
               <TabItem
                  $active={activeTab === 'description'}
                  onClick={() => setActiveTab('description')}
               >
                  О книге
               </TabItem>
               {(book.type === 'ELECTRONIC' || book.type === 'PAPER') && (
                  <TabItem
                     $active={activeTab === 'fragment'}
                     onClick={() => setActiveTab('fragment')}
                  >
                     Читать фрагмент
                  </TabItem>
               )}
            </Tabs>
            <TabContent role={role}>
               <Typography className="text" variant="body1">
                  {activeTab === 'description'
                     ? book.description
                     : book.fragment}
               </Typography>
            </TabContent>
         </Box>
      </TabsContainer>
   )
}

export default BookDescriptionTabs

const TabsContainer = styled(Box)(() => ({
   marginTop: 185,
}))

const Tabs = styled(Box)(() => ({
   display: 'flex',
   gap: 72,
   marginBottom: 84,
}))

const TabItem = styled(Typography)(({ theme, $active }) => ({
   cursor: 'pointer',
   color: $active
      ? theme.palette.secondary.main
      : theme.palette.secondary.strokeGray,
   fontWeight: 600,
   fontSize: '18px',
   lineHeight: '130%',
   transition: 'all 0.2s ease',
}))

const TabContent = styled(Box)(({ theme, role }) => ({
   width: role === "admin" ? 580 : 780,
   height: 290,
   '& .text': {
      fontSize: 16,
      color: theme.palette.primary.main,
      lineHeight: '150%',
   },
}))
