import { useState } from 'react'
import {
   Accordion,
   AccordionSummary,
   AccordionDetails,
   FormControlLabel,
   FormGroup,
   RadioGroup,
   Slider,
   TextField,
   Typography,
   Box,
   styled,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Checkbox from './UI/Checkbox'
import Radio from './UI/Radio'
import Input from './UI/Input'

const FilterPanel = () => {
   const [genre, setGenre] = useState(['Зарубежная литература'])
   const [bookType, setBookType] = useState('paper')
   const [price, setPrice] = useState([500, 10000])
   const [language, setLanguage] = useState(['Русский язык'])

   const genres = new Array(7).fill('Зарубежная литература')

   const handleGenreChange = (genreValue) => {
      setGenre((prev) =>
         prev.includes(genreValue)
            ? prev.filter((g) => g !== genreValue)
            : [...prev, genreValue]
      )
   }

   const handleLanguageChange = (lang) => {
      setLanguage((prev) =>
         prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
      )
   }

   return (
      <StyledBox>
         <NoShadowAccordion defaultExpanded>
            <NoShadowAccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography className="title">Жанры</Typography>
            </NoShadowAccordionSummary>

            <NoShadowAccordionDetails>
               <Input
                  type="search"
                  placeholder="Я ищу... "
                  className="search-input"
               />

               <FormGroup>
                  {genres.map((g, i) => (
                     <FormControlLabel
                        key={i}
                        control={
                           <Checkbox
                              checked={genre.includes(g)}
                              onChange={() => handleGenreChange(g)}
                           />
                        }
                        label={g}
                     />
                  ))}
               </FormGroup>
            </NoShadowAccordionDetails>
         </NoShadowAccordion>

         <NoShadowAccordion defaultExpanded>
            <NoShadowAccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography className="title">Тип</Typography>
            </NoShadowAccordionSummary>

            <NoShadowAccordionDetails>
               <RadioGroup
                  value={bookType}
                  onChange={(e) => setBookType(e.target.value)}
               >
                  <FormControlLabel
                     value="paper"
                     control={<Radio />}
                     label="Бумажная книга"
                  />
                  <FormControlLabel
                     value="audio"
                     control={<Radio />}
                     label="Аудиокнига"
                  />
                  <FormControlLabel
                     value="ebook"
                     control={<Radio />}
                     label="Электронная книга"
                  />
               </RadioGroup>
            </NoShadowAccordionDetails>
         </NoShadowAccordion>

         <NoShadowAccordion defaultExpanded>
            <NoShadowAccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography className="title">Стоимость</Typography>
            </NoShadowAccordionSummary>

            <NoShadowAccordionDetails>
               <Box display="flex" gap={1} mb={2} className="price-content">
                  <TextField
                     size="small"
                     type="number"
                     value={price[0]}
                     onChange={(e) => setPrice([+e.target.value, price[1]])}
                     label="от"
                  />

                  <TextField
                     size="small"
                     type="number"
                     value={price[1]}
                     onChange={(e) => setPrice([price[0], +e.target.value])}
                     label="до"
                  />
               </Box>

               <StyledSlider
                  value={price}
                  onChange={(e, newValue) => setPrice(newValue)}
                  min={0}
                  max={20000}
               />
            </NoShadowAccordionDetails>
         </NoShadowAccordion>

         <NoShadowAccordion defaultExpanded noDivider>
            <NoShadowAccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography className="title">Язык издания</Typography>
            </NoShadowAccordionSummary>
            <NoShadowAccordionDetails>
               <FormGroup>
                  {['Кыргызский язык', 'Русский язык', 'Английский язык'].map(
                     (lang) => (
                        <FormControlLabel
                           key={lang}
                           control={
                              <Checkbox
                                 checked={language.includes(lang)}
                                 onChange={() => handleLanguageChange(lang)}
                              />
                           }
                           label={lang}
                        />
                     )
                  )}
               </FormGroup>
            </NoShadowAccordionDetails>
         </NoShadowAccordion>
      </StyledBox>
   )
}
export default FilterPanel

const StyledBox = styled(Box)(() => ({
   maxWidth: '266px',
   margin: '20px',

   '& .css-rpwreu-MuiPaper-root-MuiAccordion-root.Mui-expanded': {
      margin: 0,
   },
}))

const StyledSlider = styled(Slider)(() => ({
   color: '#FF4C00',

   '& .MuiSlider-track': {
      backgroundColor: '#FF4C00',
   },

   '& .MuiSlider-rail': {
      backgroundColor: '#C4C4C4',
      opacity: 1,
   },
}))

const NoShadowAccordion = styled(Accordion)(() => ({
   boxShadow: 'none',

   '&:before': {
      display: 'none',
   },

   '&:last-of-type': {
      borderBottom: 'none',
   },
}))

const NoShadowAccordionSummary = styled(AccordionSummary)(() => ({
   boxShadow: 'none',
   padding: 0,
   borderBottom: '1px solid #C4C4C4',

   '& .MuiAccordionSummary-content': {
      margin: 0,
   },

   '& .title': {
      fontFamily: 'Open Sans',
      fontWeight: '600',
      lineHeight: '120%',
   },
}))
const NoShadowAccordionDetails = styled(AccordionDetails)(() => ({
   padding: 0,
   position: 'relative',
   overflowY: 'auto',
   maxHeight: '276px',

   scrollbarWidth: 'thin',
   scrollbarColor: ' #f1f1f1',

   '&::-webkit-scrollbar': {
      width: '2px',
   },

   '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
   },

   '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '10px',
      border: '2px solid #f1f1f1',
   },

   '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
   },

   '& .search-input': {
      paddingTop: '10px',

      '& .MuiInputBase-root': {
         backgroundColor: 'white',
      },
   },

   '& .MuiFormGroup-root': {
      paddingRight: '10px',

      '& .MuiFormControlLabel-root': {
         margin: 0,

         '& .MuiButtonBase-root': {
            padding: '9px 9px 9px 0',
         },
      },
   },

   '& .price-content': {
      paddingTop: '20px',
      overflowY: 'visible',
   },
}))
