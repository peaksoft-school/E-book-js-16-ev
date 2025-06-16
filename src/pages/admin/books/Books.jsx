import React, { useState } from 'react';
import {
  Box,
  Button,
  Popover,
  MenuItem,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const genres = [
  { name: 'Образование', count: 1234 },
  { name: 'Художественная лит...', count: 3453 },
  { name: 'Книги для детей', count: 3453 },
  { name: 'Наука и техника', count: 3453 },
  { name: 'Общество', count: 435 },
  { name: 'Деловая литература', count: 435 },
  { name: 'Красота. Здоровье.Спорт', count: 435 },
  { name: 'Увлечения', count: 435 },
  { name: 'Психология', count: 435 },
];

const formats = ['Бумажные книги', 'Аудиокниги', 'Электронные книги'];

const Books = () => {
  const [anchorGenres, setAnchorGenres] = useState(null);
  const [anchorFormats, setAnchorFormats] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const openGenres = Boolean(anchorGenres);
  const openFormats = Boolean(anchorFormats);

  return (
    <Box display="flex" gap={2} alignItems="center" sx={{ p: 2 }}>
      <Button
        variant="text"
        onClick={(e) => setAnchorGenres(e.currentTarget)}
        sx={{ fontWeight: 'bold' }}
      >
        Жанры ▾
      </Button>
      <Popover
        open={openGenres}
        anchorEl={anchorGenres}
        onClose={() => setAnchorGenres(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { maxHeight: 300, overflowY: 'auto', p: 1.5, width: 250 } }}
      >
        <List dense>
          {genres.map((genre) => (
            <ListItem
              button
              key={genre.name}
              onClick={() => setAnchorGenres(null)}
              sx={{ justifyContent: 'space-between' }}
            >
              <ListItemText
                primary={genre.name}
                primaryTypographyProps={{ noWrap: true }}
              />
              <Typography variant="body2" color="text.secondary">
                {genre.count}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Popover>

      
      <Button
        variant="text"
        onClick={(e) => setAnchorFormats(e.currentTarget)}
        sx={{ fontWeight: 'bold' }}
      >
        {selectedFormat || 'Аудиокниги'} ▾
      </Button>
      <Popover
        open={openFormats}
        anchorEl={anchorFormats}
        onClose={() => setAnchorFormats(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { width: 200, p: 1 } }}
      >
        {formats.map((format, idx) => (
          <Box key={format}>
            <MenuItem
              onClick={() => {
                setSelectedFormat(format);
                setAnchorFormats(null);
              }}
            >
              {format}
            </MenuItem>
            {idx < formats.length - 1 && <Divider />}
          </Box>
        ))}
      </Popover>
    </Box>
  );
}

export default Books