import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import AddBook from './AddBook'
import { fetchBookById } from '../../../store/admin/books/fetchBookByIdThunk'
import { updateBook } from '../../../store/admin/books/updateThunk'
import { resetFileState } from '../../../store/admin/books/fileSlice'

const UploadBook = () => {
   const dispatch = useDispatch()
   const { bookItemId } = useParams()
   const { bookData, loading, error } = useSelector((state) => state.findBook)
   const [initialData, setInitialData] = useState(null)

   useEffect(() => {
      if (bookItemId) {
         dispatch(fetchBookById(bookItemId))
      }
      return () => {
         dispatch(resetFileState())
      }
   }, [dispatch, bookItemId])

   useEffect(() => {
      if (bookData) {
         const {
            bookName,
            description,
            fragment,
            discount,
            price,
            year,
            authors,
            images,
            genres,
            publisher,
            valuePages,
            language,
            type,
            bestseller,
            audioUrl,
            fragmentUrl,
            pdfUrl,
            quantity,
         } = bookData

         const formData = {
            bookName: bookName || '',
            description: description || '',
            fragment: fragment || '',
            discount: discount || '',
            price: price || '',
            year: year || '',
            publisher: publisher || '',
            pages: valuePages || '',
            count:  quantity || '',
            hours: '',
            minutes: '',
            seconds: '',
            bestSeller: bestseller || false,
            quantity: quantity || '',
         }

         setInitialData({
            formData,
            authorsInput: authors.join(', ') || '',
            selectedGenres: genres || [],
            images: images || [],
            type: type || 'PAPER',
            language: language || 'RUSSIAN',
            audio: audioUrl || '',
            fragment: fragmentUrl || '',
            pdf: pdfUrl || '',
         })
      }
   }, [bookData])

   if (loading || !initialData) return <p>Загрузка...</p>
   if (error) return <p>Ошибка: {error}</p>

   return (
      <AddBook
         isEdit
         initialData={initialData}
         bookItemId={bookItemId}
         onSubmitAction={updateBook}
      />
   )
}

export default UploadBook
