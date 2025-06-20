import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addBook } from '../../../store/admin/books/addBookThunk'
import UploadImageBox from '../../../components/UI/Image'

const genres = [
  'Фантастика',
  'Детективы',
  'Роман',
  'Биографии',
  'Приключения',
  'Научная литература',
  'Поэзия',
  'Публицистика',
  'Детские книги',
]

const languages = ['Русский', 'Кыргызский', 'Английский']
const types = ['PAPER', 'AUDIO', 'ELECTRONIC']

const AddBook = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const [photos, setPhotos] = useState([])
  const [type, setType] = useState('PAPER')
  const [language, setLanguage] = useState('Русский')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setPhotos(files)
    setFormData((prev) => ({ ...prev, photos: files }))
  }

  const handleSubmit = () => {
    dispatch(addBook({ type, language, formData }))
  }

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={600} mb={2}>Добавить книгу</Typography>
   <Box display="flex" gap={2} mb={2}>
  {[0, 1, 2].map((i) => (
    <UploadImageBox
      key={i}
      onChange={(file) => {
        const newPhotos = [...photos]
        newPhotos[i] = file
        setPhotos(newPhotos)
        setFormData((prev) => ({ ...prev, photos: newPhotos }))
      }}
    />
  ))}
      </Box>

      <Box display="flex" gap={4}>
        <Box flex={1}>
          <Box display="flex" gap={2} mb={2}>
            {types.map((t) => (
              <Button
                key={t}
                variant={type === t ? 'contained' : 'outlined'}
                onClick={() => setType(t)}
              >
                {t === 'PAPER' ? 'Бумажная' : t === 'AUDIO' ? 'Аудиокнига' : 'Электронная книга'}
              </Button>
            ))}
          </Box>

          <TextField
            label="Название книги"
            fullWidth
            name="title"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="ФИО автора"
            fullWidth
            name="author"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>ЖанрA</InputLabel>
            <Select name="genre" value={formData.genre || ''} onChange={handleChange}>
              {genres.map((g) => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Издательство"
            fullWidth
            name="publisher"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="О книге"
            fullWidth
            multiline
            rows={4}
            name="description"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Фрагмент книги"
            fullWidth
            multiline
            rows={4}
            name="fragment"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Box>

        <Box flex={0.8}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Язык</InputLabel>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>{lang}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Год выпуска"
            fullWidth
            name="year"
            type="number"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Объем (стр.)"
            fullWidth
            name="volume"
            type="number"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Кол-во книг"
            fullWidth
            name="quantity"
            type="number"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Стоимость (сом)"
            fullWidth
            name="price"
            type="number"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Скидка (%)"
            fullWidth
            name="discount"
            type="number"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox name="bestseller" onChange={handleChange} />
            <Typography>Бестселлер</Typography>
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="error"
        onClick={handleSubmit}
        sx={{ mt: 4, fontWeight: 'bold', px: 4, py: 1 }}
      >
        Добавить
      </Button>
    </Box>
  )
}

export default AddBook
