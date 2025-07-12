import { useEffect, useState } from 'react'
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
import { GENRES } from '../utils/helpers'

const FilterPanel = ({ filterParams, onFilterChange }) => {
   const [selectedGenre, setSelectedGenre] = useState([])
   const [bookType, setBookType] = useState(filterParams.types[0] || '')
   const [price, setPrice] = useState([
      filterParams.startPrice,
      filterParams.endPrice,
   ])
   const [language, setLanguage] = useState([])

useEffect(() => {
   const newParams = {
      genres: selectedGenre,
      types: bookType ? [bookType] : [],
      languages: language.map((l) => {
         if (l.includes('Рус')) return 'RUSSIAN'
         if (l.includes('Англ')) return 'ENGLISH'
         if (l.includes('Кырг')) return 'KYRGYZ'
         return l.toUpperCase()
      }),
      startPrice: price[0],
      endPrice: price[1],
   }

   onFilterChange(newParams)
}, [selectedGenre, bookType, price, language])

useEffect(() => {
   setSelectedGenre(filterParams.genres || [])
   setBookType(filterParams.types[0] || '')
   setPrice([filterParams.startPrice, filterParams.endPrice])
   setLanguage(filterParams.languages || [])
}, [filterParams])


   const handleGenreChange = (genreValue) => {
      setSelectedGenre((prev) =>
         prev.includes(genreValue) ? [] : [genreValue]
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
               <Box className="genre-list-scroll">
                  <FormGroup>
                     {GENRES.map((genre) => (
                        <FormControlLabel
                           key={genre.value}
                           control={
                              <Checkbox
                                 checked={selectedGenre.includes(genre.value)}
                                 onChange={() => handleGenreChange(genre.value)}
                              />
                           }
                           label={genre.label}
                        />
                     ))}
                  </FormGroup>
               </Box>
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
                     value="PAPER"
                     control={<Radio />}
                     label="Бумажная книга"
                  />
                  <FormControlLabel
                     value="AUDIO"
                     control={<Radio />}
                     label="Аудиокнига"
                  />
                  <FormControlLabel
                     value="ELECTRONIC"
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
                  min={1}
                  max={10000}
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
   maxWidth: '280px',

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
      fontSize: 18,
   },
}))

const NoShadowAccordionDetails = styled(AccordionDetails)(() => ({
   padding: 0,
   position: 'relative',

   '& .genre-list-scroll': {
      maxHeight: '300px',
      overflowY: 'auto',
      paddingRight: '8px',
      marginTop: '10px',
   },
   '& .price-content': {
marginTop: '10px',
   },

   '& .MuiFormGroup-root': {
      '& .MuiFormControlLabel-root': {
         margin: 0,
         '& .MuiButtonBase-root': {
            padding: '9px 9px 9px 0',
         },
      },
   },
}))
