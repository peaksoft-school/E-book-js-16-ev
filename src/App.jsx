
// import './App.css'

// const App = () => <h1>eBook-js-16-ev</h1>

// export default App

import React from 'react'
import { Container, Typography} from '@mui/material'
import Table from './components/Table'

function App() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Таблица — Вариант Big
      </Typography>
      <Table variant="big" />

      <Typography variant="h4" gutterBottom sx={{ marginTop: 6 }}>
        Таблица — Вариант B
      </Typography>
      <Table variant="B" />
    </Container>
  )
}

export default App
