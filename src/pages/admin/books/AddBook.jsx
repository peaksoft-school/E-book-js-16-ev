import { useState, useEffect, useMemo } from 'react'
import {
   Box,
   List,
   ListItem,
   styled,
   Typography,
   FormControl,
   FormLabel,
   RadioGroup,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addBook } from '../../../store/admin/books/addBookThunk'
import { uploadImages } from '../../../store/admin/books/imageThunk'
import { uploadAudio } from '../../../store/admin/books/audioThunk'
import { uploadPDF } from '../../../store/admin/books/pdfThunk'
import {
   resetFileState,
   setAudio,
   setFragment,
   setPDF,
} from '../../../store/admin/books/fileSlice'
import UploadImageBox from '../../../components/UI/Image'
import Button from '../../../components/UI/buttons/Button'
import Radio from '../../../components/UI/Radio'
import Input from '../../../components/UI/Input'
import { GENRES } from '../../../utils/helpers'
import Checkbox from '../../../components/UI/Checkbox'
import UploadButton from '../../../components/UI/buttons/UploadButton'
import Modal from '../../../components/UI/Modal'
import NumericInput from '../../../components/UI/NumericalInput'
import SelectField from '../../../components/UI/SelectField'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Breadcrumbs, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router'

const AddBook = ({
   isEdit = false,
   initialData = null,
   onSubmitAction = addBook,
   bookItemId,
}) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const {
      images,
      pdf,
      audio,
      fragment,
      loading: fileLoading,
      error: fileError,
   } = useSelector((state) => state.files)

   const { loading, error, success } = useSelector((state) => state.addBook)

   const [formData, setFormData] = useState({
      bookName: '',
      description: '',
      fragment: '',
      discount: '',
      price: '',
      year: '',
      publisher: '',
      pages: '',
      count: '',
      hours: '',
      minutes: '',
      seconds: '',
      bestSeller: false,
   })
   const [authorsInput, setAuthorsInput] = useState('')
   const [selectedGenres, setSelectedGenres] = useState([])
   const [photos, setPhotos] = useState([null, null, null])
   const [type, setType] = useState('PAPER')
   const [language, setLanguage] = useState('RUSSIAN')
   const [modalOpen, setModalOpen] = useState(false)
   const [modalMessage, setModalMessage] = useState('')

   const types = ['PAPER', 'AUDIO', 'ELECTRONIC']

   useEffect(() => {
      if (initialData) {
         setFormData(initialData.formData)
         setAuthorsInput(initialData.authorsInput)
         setSelectedGenres(initialData.selectedGenres)
         setPhotos(initialData.images)
         setType(initialData.type)
         setLanguage(initialData.language)

         dispatch(resetFileState())
         if (initialData.audio) dispatch(setAudio(initialData.audio))
         if (initialData.fragment) dispatch(setFragment(initialData.fragment))
         if (initialData.pdf) dispatch(setPDF(initialData.pdf))
      }
   }, [initialData])

   const handleChange = (e) => {
      const { name, value, type: inputType, checked } = e.target
      let val = value

      if (inputType === 'checkbox') {
         val = checked
      } else if (['price', 'discount'].includes(name)) {
         val = value.replace(/[^0-9.]/g, '')
         const parts = val.split('.')
         if (parts.length > 2) val = parts[0] + '.' + parts[1]
      } else if (
         ['pages', 'count', 'year', 'hours', 'minutes', 'seconds'].includes(
            name
         )
      ) {
         val = value.replace(/\D/g, '')
      }

      setFormData((prev) => ({ ...prev, [name]: val }))
   }

   const handleImageChange = async (file, index) => {
      const newPhotos = [...photos]
      newPhotos[index] = file
      setPhotos(newPhotos)
      const allFilesSelected = newPhotos.every((photo) => photo instanceof File)

      if (allFilesSelected) {
         try {
            await dispatch(uploadImages(newPhotos)).unwrap()
         } catch (err) {
            setModalMessage(`Ошибка загрузки изображений: ${err}`)
            setModalOpen(true)
         }
      }
   }

   const finalImages =
      isEdit && photos.every((p) => !(p instanceof File))
         ? initialData.images
         : images

   const handleFileChange = (file, fileType) => {
      if (fileType === 'pdf') {
         dispatch(uploadPDF(file))
      } else if (fileType === 'audio') {
         dispatch(uploadAudio({ file, fileType: 'audio' }))
      } else if (fileType === 'fragment') {
         dispatch(uploadAudio({ file, fileType: 'fragment' }))
      }
   }

   const handleSubmit = async () => {
      if (!formData.bookName) {
         setModalMessage('Пожалуйста, заполните название книги.')
         setModalOpen(true)
         return
      }

      const authorsArray = authorsInput
         .split(',')
         .map((a) => a.trim())
         .filter(Boolean)
      if (authorsArray.length === 0) {
         setModalMessage('Пожалуйста, укажите хотя бы одного автора.')
         setModalOpen(true)
         return
      }

      if (!Array.isArray(selectedGenres) || selectedGenres.length === 0) {
         setModalMessage('Пожалуйста, выберите хотя бы один жанр.')
         setModalOpen(true)
         return
      }

      if (type === 'PAPER' || type === 'ELECTRONIC') {
         if (!formData.publisher) {
            setModalMessage('Пожалуйста, заполните поле издательства.')
            setModalOpen(true)
            return
         }
         if (!formData.pages) {
            setModalMessage('Пожалуйста, укажите количество страниц.')
            setModalOpen(true)
            return
         }
         if (type === 'PAPER' && !formData.count) {
            setModalMessage('Пожалуйста, укажите количество книг.')
            setModalOpen(true)
            return
         }
      }

      if (type === 'ELECTRONIC' && !pdf) {
         setModalMessage('Пожалуйста, загрузите PDF файл.')
         setModalOpen(true)
         return
      }

      if (type === 'AUDIO' && (!audio || !fragment)) {
         setModalMessage('Пожалуйста, загрузите аудиозапись и фрагмент.')
         setModalOpen(true)
         return
      }

      try {
         const dataToSend = {
            bookName: formData.bookName,
            description: formData.description,
            fragment: type === 'AUDIO' ? String(fragment) : formData.fragment,
            discount: parseFloat(formData.discount) || 0,
            price: parseFloat(formData.price) || 0,
            year: parseInt(formData.year, 10) || 0,
            authors: authorsArray,
            images: finalImages,
            genres: selectedGenres,
            bestSeller: formData.bestSeller,
            publisher: formData.publisher,
            pages: parseInt(formData.pages, 10) || 0,
            ...(type === 'PAPER' && {
               count: parseInt(formData.count, 10) || 0,
            }),
            ...(type === 'AUDIO' && {
               audio: String(audio),
               hours: parseInt(formData.hours, 10) || 0,
               minutes: parseInt(formData.minutes, 10) || 0,
               seconds: parseInt(formData.seconds, 10) || 0,
            }),
            ...(type === 'ELECTRONIC' && {
               pdf: pdf,
            }),
         }

         await dispatch(
            onSubmitAction(
               isEdit
                  ? { type, language, formData: dataToSend, bookItemId }
                  : { type, language, formData: dataToSend }
            )
         ).unwrap()

         navigate('/admin/books')

         toast.success(
            isEdit ? 'Книга успешно обновлена!' : 'Книга успешно добавлена!',
            {}
         )

         if (!isEdit) {
            setFormData({
               bookName: '',
               description: '',
               fragment: '',
               discount: '',
               price: '',
               year: '',
               publisher: '',
               pages: '',
               count: '',
               hours: '',
               minutes: '',
               seconds: '',
               bestSeller: false,
            })
            setAuthorsInput('')
            setSelectedGenres([])
            setPhotos([null, null, null])
            setType('PAPER')
            setLanguage('RUSSIAN')
            dispatch(resetFileState())
         }
      } catch (err) {
         setModalMessage(`Ошибка: ${err}`)
         setModalOpen(true)
      }
   }
   return (
      <StyledBox>
         <Box sx={{ marginBottom: 3 }}>
            <Breadcrumbs aria-label="breadcrumb">
               <MuiLink
                  component={Link}
                  to="/admin/books"
                  underline="hover"
                  color="inherit"
               >
                  Книги
               </MuiLink>
               <Typography color="text.primary">
                  {isEdit ? 'Редактировать' : 'Добавить книгу'}
               </Typography>
            </Breadcrumbs>
         </Box>

         <Typography className="imageT">Загрузите 3 фото *</Typography>
         <StyledImageBox>
            {photos.map((photo, i) => (
               <UploadImageBox
                  key={i}
                  onChange={(file) => handleImageChange(file, i)}
                  file={photo}
               />
            ))}
            <StyledCont>
               <Typography>
                  Публикации с качественными фото получают больше откликов!
               </Typography>
               <Typography className="trule">
                  Фотографии должны быть:
               </Typography>
               <List>
                  <StyledLi>
                     Фон должен быть нейтральным, без теней, рисунков,
                     посторонних объектов или засветов
                  </StyledLi>
                  <StyledLi>Фото обязательно должно быть цветным</StyledLi>
                  <StyledLi>Фото в хорошем качестве</StyledLi>
               </List>
            </StyledCont>
         </StyledImageBox>

         <FormControl className="typeBox" component="fieldset">
            <FormLabel
               component="legend"
               sx={{ mb: 1.5, fontWeight: 500, color: 'black' }}
            >
               Тип
            </FormLabel>
            <RadioGroup
               row
               name="bookType"
               value={type}
               onChange={(e) => setType(e.target.value)}
            >
               <Box display="flex" gap={4}>
                  {types.map((t) => (
                     <Radio
                        key={t}
                        value={t}
                        label={
                           t === 'PAPER'
                              ? 'Бумажная'
                              : t === 'AUDIO'
                                ? 'Аудиокнига'
                                : 'Электронная книга'
                        }
                     />
                  ))}
               </Box>
            </RadioGroup>
         </FormControl>

         <StyledContainer>
            <StyledLeftBox>
               <Input
                  placeholder="Название книги *"
                  name="bookName"
                  value={formData.bookName}
                  onChange={handleChange}
                  label="Название книги"
                  type="info"
               />
               <Input
                  name="authorsInput"
                  placeholder="Напишите ФИО автора (через запятую) *"
                  type="info"
                  value={authorsInput}
                  onChange={(e) => setAuthorsInput(e.target.value)}
                  label="ФИО автора"
               />
               <SelectField
                  label="Жанры *"
                  value={selectedGenres}
                  onChange={(value) =>
                     setSelectedGenres(
                        Array.isArray(value) ? value : [value].filter(Boolean)
                     )
                  }
                  options={GENRES}
                  multiple
                  placeholder="Выберите жанры..."
               />
               {type !== 'AUDIO' && (
                  <Input
                     placeholder="Напишите название издательства *"
                     name="publisher"
                     value={formData.publisher}
                     onChange={handleChange}
                     label="Издательство"
                     type="info"
                  />
               )}
               <Input
                  type="description"
                  placeholder="Напишите о книге"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  label="О книге"
                  multiline
                  rows={8}
                  maxLength={1000}
               />
               {type !== 'AUDIO' && (
                  <Input
                     type="description"
                     placeholder="Напишите фрагмент книги"
                     name="fragment"
                     value={formData.fragment}
                     onChange={handleChange}
                     label="Фрагмент книги"
                     multiline
                     rows={8}
                     maxLength={9234}
                  />
               )}
            </StyledLeftBox>

            <StyledRightBox>
               <Box className="firstRow">
                  <SelectField
                     width="228.5px"
                     label="Выберите язык"
                     value={language}
                     onChange={(val) => setLanguage(val)}
                     options={[
                        { value: 'RUSSIAN', label: 'Русский' },
                        { value: 'KYRGYZ', label: 'Кыргызский' },
                        { value: 'ENGLISH', label: 'Английский' },
                     ]}
                     placeholder="Русский, Кыргызский, Английский..."
                  />
                  <Box>
                     <NumericInput
                        unit="гг"
                        placeholder="0"
                        name="year"
                        value={formData.year}
                        onChange={(name, value) =>
                           setFormData((prev) => ({ ...prev, [name]: value }))
                        }
                        label="Год выпуска"
                     />
                  </Box>
               </Box>
               {type === 'AUDIO' && (
                  <Box className="forth">
                     <Typography sx={{ fontWeight: 500, marginBottom: '8px' }}>
                        Длительность
                     </Typography>
                     <InputsBox>
                        <NumericInput
                           width={155.66}
                           name="hours"
                           value={formData.hours}
                           onChange={(name, value) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 [name]: value,
                              }))
                           }
                           placeholder="0"
                           unit="ч"
                        />
                        <NumericInput
                           width={155.66}
                           name="minutes"
                           value={formData.minutes}
                           onChange={(name, value) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 [name]: value,
                              }))
                           }
                           placeholder="0"
                           unit="мин"
                        />
                        <NumericInput
                           width={155.66}
                           name="seconds"
                           value={formData.seconds}
                           onChange={(name, value) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 [name]: value,
                              }))
                           }
                           placeholder="0"
                           unit="сек"
                        />
                     </InputsBox>
                  </Box>
               )}
               <Box className="secondRow">
                  {type !== 'AUDIO' && (
                     <NumericInput
                        width="228.5px"
                        placeholder="0"
                        name="pages"
                        value={formData.pages}
                        label="Объем"
                        unit="стр."
                        onChange={(name, value) =>
                           setFormData((prev) => ({ ...prev, [name]: value }))
                        }
                     />
                  )}
                  {type === 'PAPER' && (
                     <NumericInput
                        unit="шт."
                        placeholder="0"
                        name="count"
                        value={formData.count}
                        onChange={(name, value) =>
                           setFormData((prev) => ({ ...prev, [name]: value }))
                        }
                        label="Кол-во книг"
                     />
                  )}
                  {(type === 'AUDIO' || type === 'ELECTRONIC') && (
                     <StyledCheckbox>
                        <Checkbox
                           name="bestSeller"
                           checked={formData.bestSeller}
                           onChange={handleChange}
                           label="Бестселлер"
                        />
                     </StyledCheckbox>
                  )}
               </Box>
               <Box className="therdRow">
                  <NumericInput
                     width={228.5}
                     name="price"
                     value={formData.price}
                     label="Цена"
                     placeholder="0"
                     unit="сом"
                     maxLength="10"
                     onChange={(name, value) =>
                        setFormData((prev) => ({ ...prev, [name]: value }))
                     }
                  />
                  <NumericInput
                     placeholder="0"
                     name="discount"
                     label="Скидка"
                     unit="%"
                     value={formData.discount}
                     onChange={(name, value) =>
                        setFormData((prev) => ({ ...prev, [name]: value }))
                     }
                  />
               </Box>
               {type === 'PAPER' && (
                  <Checkbox
                     name="bestSeller"
                     checked={formData.bestSeller}
                     onChange={handleChange}
                     label="Бестселлер"
                  />
               )}
               {type === 'AUDIO' && (
                  <>
                     <Box className="fragment">
                        <UploadButton
                           label="фрагмент аудиозаписи"
                           fileName="fragment"
                           accept="audio/*"
                           onFileSelect={handleFileChange}
                           initialFile={fragment}
                        />
                        <span className="span">максимум 10 мин.</span>
                     </Box>
                     <UploadButton
                        label="аудиозапись"
                        fileName="audio"
                        accept="audio/*"
                        onFileSelect={handleFileChange}
                        initialFile={audio}
                     />
                  </>
               )}
               {type === 'ELECTRONIC' && (
                  <UploadButton
                     label="PDF"
                     fileName="pdf"
                     accept="application/pdf"
                     onFileSelect={handleFileChange}
                     initialFile={pdf}
                  />
               )}
            </StyledRightBox>
         </StyledContainer>

         <Button
            className="addBtn"
            variant="warning"
            onClick={handleSubmit}
            disabled={
               loading ||
               fileLoading ||
               !formData.bookName ||
               !authorsInput ||
               selectedGenres.length === 0 ||
               (type === 'PAPER' &&
                  (!formData.publisher ||
                     !formData.pages ||
                     !formData.count)) ||
               (type === 'ELECTRONIC' &&
                  (!formData.publisher || !formData.pages || !pdf)) ||
               (type === 'AUDIO' && (!audio || !fragment))
            }
         >
            {loading || fileLoading
               ? 'Загрузка...'
               : isEdit
                 ? 'Сохранить'
                 : 'Добавить'}
         </Button>
         <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
            <h2>Сообщение</h2>
            <p className="modal-error">{modalMessage}</p>
            <button onClick={() => setModalOpen(false)}>Закрыть</button>
         </Modal>
      </StyledBox>
   )
}

export default AddBook

const InputsBox = styled(Box)({
   display: 'flex',
   gap: 16,
})

const StyledContainer = styled(Box)({
   maxWidth: 1190,
   display: 'flex',
   flexDirection: 'row',
   gap: 42,
})

const StyledLeftBox = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: 25,
   width: 650,
})

const StyledRightBox = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   width: '100%',
   gap: 25,
   '& .firstRow': { display: 'flex', gap: 42 },
   '& .secondRow': { display: 'flex', gap: 42 },
   '& .therdRow': { display: 'flex', gap: 42, width: 400 },
   '& .forth': { marginTop: '-1px' },
   '& .fragment': {
      display: 'flex',
      '& .span': { marginTop: 43, fontSize: 12, color: '#969696' },
   },
})

const StyledBox = styled(Box)(({ theme }) => ({
   width: 1190,
   '& .imageT': { marginBottom: 40 },
   '& .addBtn': { width: 130, height: 42, fontSize: 16 },
   '& .typeBox': { marginBottom: 20 },
   '& .modal-error': { color: 'red', fontSize: '14px' },
}))

const StyledImageBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: 30,
   marginBottom: 40,
}))

const StyledCont = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   width: 395,
   backgroundColor: '#ECECEC',
   padding: '30px 35px 26px 30px',
   '& .trule': {
      fontWeight: 600,
      marginTop: 20,
      color: theme.palette.primary.main,
   },
}))

const StyledLi = styled(ListItem)(({ theme }) => ({
   position: 'relative',
   paddingLeft: '1.5rem',
   fontSize: 14,
   '&::before': {
      content: '""',
      position: 'absolute',
      left: '0.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: theme.palette.secondary.main,
   },
}))

const StyledCheckbox = styled(Box)({
   paddingRight: 350,
   paddingTop: 30,
})
