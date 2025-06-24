import { useState } from 'react'
import {
   Box,
   List,
   ListItem,
   styled,
   Typography,
   FormControl,
   FormLabel,
   RadioGroup,
   TextField,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addBook } from '../../../store/admin/books/addBookThunk'
import { uploadImages } from '../../../store/admin/books/imageThunk'
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

const AddBook = () => {
   const dispatch = useDispatch()
   const [authorsInput, setAuthorsInput] = useState('')

   const [formData, setFormData] = useState({
      bookName: '',
      description: '',
      fragment: '',
      discount: '',
      price: '',
      year: '',
      authors: [],
      images: ['', '', ''],
      genres: [],
      bestSeller: false,
      audio: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      publisher: '',
      pages: 0,
      count: 0,
      pdf: '',
   })
   const [photos, setPhotos] = useState([null, null, null])

   const [type, setType] = useState('PAPER')
   const [language, setLanguage] = useState('RUSSIAN')
   const types = ['PAPER', 'AUDIO', 'ELECTRONIC']
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [modalOpen, setModalOpen] = useState(false)
   const [modalMessage, setModalMessage] = useState('')

   const handleChange = (e) => {
      const { name, value, type: inputType, checked } = e.target

      if (inputType === 'checkbox') {
         setFormData((prev) => ({ ...prev, [name]: checked }))
      } else {
         let val = value
         if (
            [
               'pages',
               'count',
               'price',
               'discount',
               'year',
               'hours',
               'minutes',
               'seconds',
            ].includes(name)
         ) {
            val = val.replace(/\D/g, '')
         }
         setFormData((prev) => ({ ...prev, [name]: val }))
      }
   }

   const [selectedGenres, setSelectedGenres] = useState([])

   // const handleChangeGenres = (event) => {
   //    const {
   //       target: { value },
   //    } = event
   //    setSelectedGenres(typeof value === 'string' ? value.split(',') : value)

   //    setFormData((prev) => ({
   //       ...prev,
   //       genres: typeof value === 'string' ? value.split(',') : value,
   //    }))
   // }

   const handleSubmit = async () => {
      setLoading(true)
      setError(null)

      try {
         // ✅ Validate all 3 images
         if (
            photos.length !== 3 ||
            photos.some((p) => !p || !(p instanceof File))
         ) {
            setModalMessage('Пожалуйста, загрузите все 3 изображения книги.')
            setModalOpen(true)
            setLoading(false)
            return
         }

         const authorsArray = authorsInput
            .split(',')
            .map((a) => a.trim())
            .filter(Boolean)

      const extractUrl = (str) => {
   const match = str.match(/https?:\/\/[^\s]+/)
   return match ? match[0] : null
}

const uploadedImages = await dispatch(uploadImages(photos)).unwrap()

const imageUrls = uploadedImages
   .flatMap((i) => {
      if (Array.isArray(i)) {
         return i.map((x) => extractUrl(x.message))
      }
      return [extractUrl(i.message)] // 👈 оборачиваем в массив!
   })
   .filter(Boolean)


         const dataToSend = {
            ...formData,
            authors: authorsArray,
            images: imageUrls,
            genres: selectedGenres,
         }

         await dispatch(
            addBook({ type, language, formData: dataToSend })
         ).unwrap()

         setModalMessage('Книга успешно добавлена!')
         setModalOpen(true)

         // Reset form
         setFormData({
            bookName: '',
            description: '',
            fragment: '',
            discount: '',
            price: '',
            year: '',
            authors: [],
            genres: [],
            bestSeller: false,
            audio: '',
            hours: 0,
            minutes: 0,
            seconds: 0,
            publisher: '',
            pages: 0,
            count: 0,
            pdf: '',
            images: [],
         })
         setAuthorsInput('')
         setPhotos([null, null, null])
      } catch (err) {
         setModalMessage(`Ошибка: ${err}`)
         setModalOpen(true)
      } finally {
         setLoading(false)
      }
   }

   return (
      <StyledBox>
         <Typography className="imageT">Загрузите 3 фото *</Typography>
         <StyledImageBox>
            {photos.map((photo, i) => (
               <UploadImageBox
                  key={i}
                  onChange={(file) => {
                     const newPhotos = [...photos]
                     newPhotos[i] = file
                     setPhotos(newPhotos)
                  }}
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
                  placeholder="Название книги"
                  name="bookName"
                  value={formData.bookName || ''}
                  onChange={handleChange}
                  label="Название книги"
                  type="info"
               />

               <Input
                  name="authors"
                  placeholder="Напишите ФИО автора"
                  type="info"
                  value={formData.authors.join(', ')}
                  onChange={(e) => {
                     setFormData((prev) => ({
                        ...prev,
                        authors: e.target.value
                           .split(',')
                           .map((a) => a.trim())
                           .filter(Boolean),
                     }))
                  }}
                  label="ФИО автора"
               />

               <SelectField
                  label="Жанры"
                  value={selectedGenres}
                  onChange={setSelectedGenres}
                  options={GENRES}
                  multiple
                  placeholder="Выберите жанры..."
               />

               {type !== 'AUDIO' && (
                  <Input
                     placeholder="Напишите название издательства"
                     name="publisher"
                     value={formData.publisher || ''}
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
                  maxLength={100}
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
                        value={formData.year || ''}
                        onChange={(name, value) =>
                           setFormData((prev) => ({
                              ...prev,
                              [name]: value,
                           }))
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
                           value={formData.hours || ''}
                           onChange={(name, val) =>
                              setFormData((prev) => ({ ...prev, [name]: val }))
                           }
                           placeholder="0"
                           unit="ч"
                        />
                        <NumericInput
                           width={155.66}
                           name="minutes"
                           value={formData.minutes || ''}
                           onChange={(name, val) =>
                              setFormData((prev) => ({ ...prev, [name]: val }))
                           }
                           placeholder="0"
                           unit="мин"
                        />
                        <NumericInput
                           width={155.66}
                           name="seconds"
                           value={formData.seconds || ''}
                           onChange={(name, val) =>
                              setFormData((prev) => ({ ...prev, [name]: val }))
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
                        value={formData.pages || ''}
                        label="Объем"
                        unit="стр."
                        onChange={(name, value) =>
                           setFormData((prev) => ({ ...prev, [name]: value }))
                        }
                     />
                  )}
                  {type === 'ELECTRONIC' && (
                     <StyledCheckbox>
                        <Checkbox
                           name="bestSeller"
                           checked={formData.bestSeller || false}
                           onChange={handleChange}
                           label="Бестселлер"
                        />
                     </StyledCheckbox>
                  )}

                  {type === 'PAPER' && (
                     <NumericInput
                        unit="шт."
                        placeholder="0"
                        name="count"
                        value={formData.count || ''}
                        onChange={(name, value) =>
                           setFormData((prev) => ({ ...prev, [name]: value }))
                        }
                        label="Кол-во книг"
                     />
                  )}
                  {type !== 'PAPER' && (
                     <StyledCheckbox>
                        <Checkbox
                           name="bestSeller"
                           checked={formData.bestSeller || false}
                           onChange={handleChange}
                           label="Бестселлер"
                        />
                     </StyledCheckbox>
                  )}
               </Box>

               <Box className="therdRow">
                  <NumericInput
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
                     sx={type === 'ELECTRONIC' ? { marginRight: 100 } : {}}
                     name="discount"
                     label="Скидка"
                     unit="%"
                     value={formData.discount || ''}
                     onChange={(name, value) =>
                        setFormData((prev) => ({ ...prev, [name]: value }))
                     }
                  />
               </Box>

               {type === 'PAPER' && (
                  <Checkbox
                     name="bestSeller"
                     checked={formData.bestSeller || false}
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
                           onChange={(file) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 fragment: file,
                              }))
                           }
                        />{' '}
                        <span className="span">максимум 10 мин.</span>
                     </Box>
                     <UploadButton
                        label="аудиозапись"
                        fileName="audio"
                        onChange={(file) =>
                           setFormData((prev) => ({ ...prev, audio: file }))
                        }
                     />
                  </>
               )}

               {type === 'ELECTRONIC' && (
                  <UploadButton
                     label="PDF"
                     fileName="pdf"
                     onChange={(file) =>
                        setFormData((prev) => ({ ...prev, pdf: file }))
                     }
                  />
               )}
            </StyledRightBox>
         </StyledContainer>

         <Button
            className="addBtn"
            variant="warning"
            onClick={handleSubmit}
            disabled={loading}
         >
            {loading ? 'Загрузка...' : 'Добавить'}
         </Button>

         <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
            <h2>Сообщение</h2>
            <p>{modalMessage}</p>
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

   '& .firstRow': {
      display: 'flex',
      gap: 42,
   },
   '& .secondRow': {
      display: 'flex',
      gap: 42,
   },
   '& .therdRow': {
      display: 'flex',
      gap: 42,
   },
   '& .forth': {
      marginTop: '-1px',
   },
   '& .fragment': {
      display: 'flex',
      '& .span': {
         marginTop: 43,
         fontSize: 12,
         color: '#969696',
      },
   },
})

const StyledBox = styled(Box)(({ theme }) => ({
   width: 1190,
   '& .imageT': {
      marginBottom: 40,
   },
   '& .addBtn': {
      width: 130,
      height: 42,
      fontSize: 16,
   },
   '& .typeBox': {
      marginBottom: 20,
   },
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
