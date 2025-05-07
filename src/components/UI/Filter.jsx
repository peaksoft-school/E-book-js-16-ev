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
import Checkbox from './Checkbox'
import Radio from './Radio'
import Input from './Input'

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
               <Typography>Жанры</Typography>
            </NoShadowAccordionSummary>
            <NoShadowAccordionDetails>
               <Input type="search" placeholder="Я ищу... " />
               <FormGroup>
                  {genres.map((g, index) => (
                     <FormControlLabel
                        key={index}
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
               <Typography>Тип</Typography>
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
               <Typography>Стоимость</Typography>
            </NoShadowAccordionSummary>
            <NoShadowAccordionDetails>
               <Box display="flex" gap={1} mb={2}>
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
               <Typography>Язык издания</Typography>
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
   width: '266px',
   height: '935px',
   margin: '20px',
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

const NoShadowAccordion = styled(Accordion)(({ theme }) => ({
   boxShadow: 'none',
   '&:before': {
      display: 'none',
   },
   borderBottom: '1px solid #e0e0e0',
   '&:last-of-type': {
      borderBottom: 'none',
   },
}))

const NoShadowAccordionSummary = styled(AccordionSummary)(() => ({
   boxShadow: 'none',
}))

const NoShadowAccordionDetails = styled(AccordionDetails)(() => ({
   boxShadow: 'none',
}))
