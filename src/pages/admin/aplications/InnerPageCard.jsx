import { Box, useTheme, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   infoBook,
   acceptBook,
   rejectBook,
} from '../../../store/applications/innerpage/bookThunk'
import { Link, useParams } from 'react-router'
import Button from '../../../components/UI/buttons/Button'
import Modal from '../../../components/UI/Modal'
import { Icons } from '../../../assets/icons'
import AudioPlayer from '../../../components/UI/AudioPlayer'

const InnerPageCard = () => {
   const dispatch = useDispatch()
   const { book, loading, error } = useSelector((state) => state.book)
   const { bookItemId } = useParams()
   const [activeIndex, setActiveIndex] = useState(0)
   const [activeTab, setActiveTab] = useState('description')
   const [openAcceptModal, setOpenAcceptModal] = useState(false)
   const [openCancelModal, setOpenCancelModal] = useState(false)
   const [cancelReason, setCancelReason] = useState('')
   const theme = useTheme()

   useEffect(() => {
      if (bookItemId) {
         dispatch(infoBook(bookItemId))
      }
   }, [bookItemId, dispatch])

   if (loading) return <p>Загрузка...</p>
   if (error) return <p>Ошибка: {error.message}</p>
   if (!book || !book.images || book.images.length < 2) return <p>Нет данных</p>

   const baseFields = [
      { label: 'Автор', value: book.authors },
      { label: 'Жанр', value: `${book.genres[0]}, ${book.genres[1]}` },
      { label: 'Язык', value: book.language },
      { label: 'Издательство', value: book.publisher },
      { label: 'Год выпуска', value: book.year },
   ]

   let infoFields = [...baseFields]

   if (book.type === 'ELECTRONIC') {
      infoFields.push({ label: 'Объем', value: `${book.valuePages} стр` })
      infoFields.push({ label: 'Смотреть PDF', value: book.pdfUrl })
   } else if (book.type === 'PAPER') {
      infoFields.push({ label: 'Объем', value: `${book.valuePages} стр` })
   } else if (book.type === 'AUDIO') {
      infoFields.push({ label: 'Длительность', value: `${book.audioDuration}` })
   }
   // else if (book.type === 'AUDIO') {
   //    infoFields.push({ label: 'Длительность', value: book.audioDuration })
   //    infoFields.push({ label: 'Аудио', value: book.audioUrl })
   //    infoFields.push({ label: 'Фрагмент', value: book.fragmentUrl })
   //    if (book.fragmentDuration) {
   //       infoFields.push({
   //          label: 'Длительность фрагмента',
   //          value: book.fragmentDuration,
   //       })
   //    }
   // }

   const handleCancelSubmit = () => {
      dispatch(rejectBook({ bookItemId, reason: cancelReason })).then(() => {
         setOpenCancelModal(false)
         setCancelReason('')
      })
   }

   return (
      <StyledContainer>
         <Typography variant="h6">Заявки / {book.bookName}</Typography>
         <StyledBlock1>
            <StyledBox>
               {[0, 1].map((index) => (
                  <ImageBox
                     key={index}
                     isActive={index === activeIndex}
                     onClick={() => setActiveIndex(index)}
                  >
                     {index === 0 && book.isNew && (
                        <StyledImg src={Icons.knew} alt="new" />
                     )}
                     <StyledImage
                        src={book.images[index]}
                        alt={`image-${index}`}
                     />
                  </ImageBox>
               ))}
            </StyledBox>
            <StyledCont>
               <Typography className="bookname">{book.bookName}</Typography>
               <Typography className="price">{book.price} c</Typography>
               <InfoGrid>
                  <LabelsColumn>
                     {infoFields.map(({ label }) => (
                        <LabelText key={label}>{label}</LabelText>
                     ))}
                  </LabelsColumn>
                  <ValuesColumn>
                     {infoFields.map(({ label, value }) => (
                        <ValueText key={label} sx={{
         color: label === 'Смотреть PDF' ? '#969696' : theme.palette.primary.main,
      }}>
                           {label === 'Смотреть PDF' && book.pdfUrl ? (
                              <a
                                 href={book.pdfUrl}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 style={{
                                    color: '#1976d2',
                                    textDecoration: 'none',
                                    fontWeight: 500,

                                 }}
                              >
                                 Document.pdf
                              </a>
                           ) : label === 'Аудио' && book.audioUrl ? (
                              'Слушать аудио'
                           ) : label === 'Фрагмент' && book.fragmentUrl ? (
                              'Фрагмент аудио'
                           ) : (
                              value
                           )}
                        </ValueText>
                     ))}
                  </ValuesColumn>
               </InfoGrid>

               {book.audioUrl && (
                  <AudioPlayer
                     audioUrl={book.audioUrl}
                     fragmentUrl={book.fragmentUrl}
                     // fragmentDuration={book.fragmentDuration}
                  />
               )}

               <Box className="btnCont">
                  <Button
                     variant="warning"
                     onClick={() => {
                        dispatch(acceptBook(bookItemId)).then(() => {
                           setOpenAcceptModal(true)
                        })
                     }}
                  >
                     Принять
                  </Button>
                  <Button
                     variant="borderOrg"
                     onClick={() => setOpenCancelModal(true)}
                  >
                     Отклонить
                  </Button>
               </Box>
            </StyledCont>
         </StyledBlock1>

         <Box className="styledBlock2">
            <Box>
               <Tabs>
                  <TabItem
                     active={activeTab === 'description'}
                     onClick={() => setActiveTab('description')}
                  >
                     О книге
                  </TabItem>
                  {(book.type === 'ELECTRONIC' || book.type === 'PAPER') && (
                     <TabItem
                        active={activeTab === 'fragment'}
                        onClick={() => setActiveTab('fragment')}
                     >
                        Читать фрагмент
                     </TabItem>
                  )}
               </Tabs>
               <TabContent>
                  <Typography className="text" variant="p">
                     {activeTab === 'description'
                        ? book.description
                        : book.fragment}
                  </Typography>
               </TabContent>
            </Box>
            <Box>
               <StyledLastImg component="img" src={book.images[2]} />
            </Box>
         </Box>

         <Modal
            open={openAcceptModal}
            handleClose={() => setOpenAcceptModal(false)}
         >
            <CenteredModalBox onClick={(e) => e.stopPropagation()}>
               <StyledGreenCircle>
                  <img src={Icons.greenOk} alt="ok" width={32} height={32} />
               </StyledGreenCircle>
               <Typography variant="p" fontWeight={600} fontSize={20}>
                  “{book.bookName}”
               </Typography>
               <Typography variant="p" fontSize={18}>
                  был успешно принят!
               </Typography>
            </CenteredModalBox>
         </Modal>

         <Modal
            open={openCancelModal}
            handleClose={() => setOpenCancelModal(false)}
         >
            <Box
               onClick={(e) => e.stopPropagation()}
               sx={{
                  bgcolor: 'white',
                  maxWidth: 523,
                  height: 247,
                  margin: 'auto',
               }}
            >
               <Typography sx={{ fontWeight: 600, fontSize: '18px', mb: 2 }}>
                  Причина вашего отклонения
               </Typography>
               <textarea
                  placeholder="Напишите причину отклонения..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  style={{
                     width: '100%',
                     height: '120px',
                     padding: '12px',
                     fontSize: '14px',
                     border: '1px solid grey',
                     resize: 'none',
                     marginBottom: 18,
                  }}
               />
               <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleCancelSubmit}>Отправить</Button>
               </Box>
            </Box>
         </Modal>
      </StyledContainer>
   )
}

export default InnerPageCard

const CenteredModalBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   textAlign: 'center',
}))

const StyledGreenCircle = styled(Box)(() => ({
   width: 46,
   height: 46,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const StyledLastImg = styled('img')(() => ({
   width: 385,
   height: 615,
   marginTop: 128,
}))

const StyledCont = styled(Box)(() => ({
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
      gap: 50,
   },
}))

const StyledContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   '& .styledBlock2': {
      display: 'flex',
      gap: 84,
   },
})

const StyledBox = styled(Box)({
   display: 'flex',
   gap: 20,
   width: 580,
})

const ImageBox = styled(Box)(({ isActive }) => ({
   width: isActive ? '357px' : '201px',
   height: isActive ? '571px' : '321px',
   overflow: 'visible',
   position: 'relative',
   transition: 'all 0.3s ease-in-out',
   cursor: isActive ? 'default' : 'pointer',
}))

const StyledImage = styled('img')({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   position: 'relative',
})

const StyledImg = styled('img')({
   position: 'absolute',
   zIndex: 2,
   bottom: 80,
   right: -105,
})

const StyledBlock1 = styled(Box)({
   display: 'flex',
   gap: 40,
   marginTop: 72,
})

const InfoGrid = styled(Box)({
   display: 'flex',
   gap: '24px',
   marginTop: 47,
})

const LabelsColumn = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   minWidth: '245px',
})

const ValuesColumn = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
})

const LabelText = styled(Typography)({
   fontSize: '14px',
   lineHeight: '130%',
   fontWeight: 600,
})

const ValueText = styled(Typography)(({ theme}) => ({
   color: theme.palette.primary.main,
   fontWeight: 400,
   fontSize: '14px',
   lineHeight: '130%',
}))

const Tabs = styled(Box)({
   display: 'flex',
   gap: 72,
   marginBottom: 84,
   marginTop: 185,
})

const TabItem = styled(Typography)(({ active, theme }) => ({
   cursor: 'pointer',
   color: active
      ? theme.palette.secondary.main
      : theme.palette.secondary.strokeGray,
   fontWeight: 600,
   fontSize: '18px',
   lineHeight: '130%',
   transition: 'all 0.2s ease',
}))

const TabContent = styled(Box)(({ theme }) => ({
   width: 580,
   height: 290,
   '& .text': {
      fontSize: 16,
      color: theme.palette.primary.main,
      lineHeight: '150%',
   },
}))
