import { Box} from '@mui/material'
import { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import BasketCard from '../components/UI/cards/BasketCard'
import { axiosInstance} from '../configs/axiosInstance'
import { useSelector } from 'react-redux'
import Input from '../components/UI/Input.jsx'


const Applications = () => {
  const [books, setBooks] = useState([])

    const token = useSelector(state => state.auth.token)
  console.log('Токен из Redux:', token)

useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get('/api/book/getAllApplications')
      console.log("API response:", response.data)

      if (Array.isArray(response.data.content)) {
        setBooks(response.data.content)
      } else {
        console.error("Ожидался массив, но получено:", response.data.content)
        setBooks([])
      }
    } catch (error) {
      console.error('Ошибка при получении заявок:', error)
    }
  }

  fetchBooks()
}, [])


  return (
    <Box>
      <SideBar />

      {/* <Input variant='search' sx={{marginLeft: '50px'}} placeholder='Искать жанр, книги, авторов, издательства... '/> */}
 <Input
                     type="search"
                     placeholder="Искать жанр, книги, авторов, издательства..."
                  />
      <Box >
        
          {books.map((book) => (
            <>
              <BasketCard book={book} />
            </>
          ))}
      </Box>
    </Box>
  )
}

export default Applications
