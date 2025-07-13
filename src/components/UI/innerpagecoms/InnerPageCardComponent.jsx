import { useEffect, useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
   infoBook,
   acceptBook,
   rejectBook,
} from '../../../store/admin/applications/innerpage/bookThunk'
import { vendorBookById } from '../../../store/vendor/vendorBookThunk'
import { fetchBookClientById } from '../../../store/user/userBookById'
import ImageGallery from './ImageGallery'
import BookInfoFields from './BookInfoFields'
import BookDescriptionTabs from './BookDescriptionTabs'
import BookActionButtons from './BookActionButtons'
import SuccessModal from './SuccessModal'
import RejectModal from './RejectModal'
import SimpleAudioPlayerColumn from '../AudioPlayer'
import RoleBreadcrumbs from './RoleBreadCrums'

const InnerPageCardComponent = ({ role = 'client' }) => {
   const dispatch = useDispatch()
   const { bookItemId } = useParams()
   const { book, loading, error } = useSelector((state) => {
      if (role === 'admin') return state.book
      if (role === 'vendor') return state.vendorBook
      if (role === 'client') return state.bookClient
      return { book: null, loading: false, error: null }
   })

   const [activeImageIndex, setActiveImageIndex] = useState(0)
   const [activeTab, setActiveTab] = useState('description')
   const [openAcceptModal, setOpenAcceptModal] = useState(false)
   const [openCancelModal, setOpenCancelModal] = useState(false)
   const [cancelReason, setCancelReason] = useState('')
   useEffect(() => {
      if (!bookItemId) return

      if (role === 'admin') {
         dispatch(infoBook(bookItemId))
      } else if (role === 'vendor') {
         dispatch(vendorBookById(bookItemId))
      } else  {
         dispatch(fetchBookClientById(bookItemId))
      }
   }, [bookItemId, dispatch, role])

   const handleAccept = () => {
      dispatch(acceptBook(bookItemId)).then(() => setOpenAcceptModal(true))
   }

   const handleReject = () => {
      dispatch(rejectBook({ bookItemId, reason: cancelReason })).then(() => {
         setOpenCancelModal(false)
         setCancelReason('')
      })
   }

   if (loading) return <p>Загрузка...</p>
   if (error) return <p>Ошибка: Нет книги{error.message}</p>
   if (!book || !book.images || book.images.length < 2) return <p>Нет данных</p>

   return (
      <StyledContainer role={role}>
         <RoleBreadcrumbs role={role} bookName={book.bookName} />

         <StyledBlock1 role={role}>
            <ImageGallery
               images={book.images}
               isNew={book.isNew}
               activeIndex={activeImageIndex}
               onImageClick={setActiveImageIndex}
            />

            <StyledCont role={role}>
               <Typography className="bookname">{book.bookName}</Typography>
               <Typography className="price">{book.price} c</Typography>

               <BookInfoFields book={book} />

               {(book.audioUrl || book.fragmentUrl) && (
                  <SimpleAudioPlayerColumn
                     audioUrl={book.audioUrl}
                     fragmentUrl={book.fragmentUrl}
                  />
               )}

               <Box className="btnCont">
                  <BookActionButtons
                     role={role}
                     bookItemId={bookItemId}
                     onAccept={handleAccept}
                     onReject={() => setOpenCancelModal(true)}
                     type={book.type}
                     audioBook={book.audioBook}
                     paperBook={book.paperBook}
                     electronicBook={book.electronicBook}
                  />
               </Box>
            </StyledCont>
         </StyledBlock1>

         <Box role={role} className="styledBlock2">
            <BookDescriptionTabs
               role={role}
               book={book}
               activeTab={activeTab}
               setActiveTab={setActiveTab}
            />
            {book.images[2] && <StyledLastImg src={book.images[2]} />}
         </Box>

         <SuccessModal
            open={openAcceptModal}
            onClose={() => setOpenAcceptModal(false)}
            bookName={book.bookName}
         />

         <RejectModal
            open={openCancelModal}
            onClose={() => setOpenCancelModal(false)}
            reason={cancelReason}
            onChange={setCancelReason}
            onSubmit={handleReject}
         />
      </StyledContainer>
   )
}

export default InnerPageCardComponent

const StyledContainer = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   marginBottom: 110,
   '& .styledBlock2': {
      display: 'flex',
      gap: 84,
   },
}))

const StyledBlock1 = styled(Box)((role) => ({
   display: 'flex',
   gap: role === 'admin' ? 40 : 100,
   marginTop: role === 'admin' ? 50 : 80,
}))

const StyledCont = styled(Box)((role) => ({
   padding: '76px 0px 65px 0px',
   '& .bookname': {
      color: 'black',
      fontSize: 28,
      lineHeight: '130%',
   },
   '& .price': {
      color: '#F53E3E',
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '120%',
      marginTop: 55,
   },
   '& .btnCont': {
      display: 'flex',
      gap: role === 'admin' ? 47 : 15,
      marginTop: '50px',
   },
}))

const StyledLastImg = styled('img')(() => ({
   width: 385,
   height: 615,
   marginTop: 128,
}))
