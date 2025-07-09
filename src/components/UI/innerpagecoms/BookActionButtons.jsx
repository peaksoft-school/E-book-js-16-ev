import { useNavigate } from 'react-router'
import Button from '../buttons/Button'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteVendorBook } from '../../../store/vendor/deleteVendorBookThunk'
import { Box, ClickAwayListener, Paper, Typography } from '@mui/material'
import { useState } from 'react'

const BookActionButtons = ({
   role,
   bookItemId,
   onAccept,
   onReject,
   type,
   audioBook,
   paperBook,
   electronicBook,
}) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [dropdownOpen, setDropdownOpen] = useState(false)

   const handleDelete = async () => {
      try {
         const result = await dispatch(deleteVendorBook(bookItemId)).unwrap()
         toast.success(result || 'Книга успешно удалена')
         navigate('/vendor')
      } catch (err) {
         toast.error(err || 'Ошибка при удалении')
      }
   }
   const handleSelectType = (selectedType) => {
      navigate(`/vendor/innerpagevendor/${bookItemId}/addtype`, { state: { selectedType } })
   }
   const handleEdit = () => {
      navigate(`/vendor/innerpagevendor/uploadbook/${bookItemId}`)
   }
   const getAvailableTypes = () => {
      const allTypes = ['PAPER', 'AUDIO', 'ELECTRONIC']
      const existingTypes = [type]
      if (audioBook) existingTypes.push('AUDIO')
      if (paperBook) existingTypes.push('PAPER')
         if (electronicBook) existingTypes.push('ELECTRONIC')

      return allTypes.filter((t) => !existingTypes.includes(t))
   }
   const availableTypes = getAvailableTypes()

   if (role === 'admin') {
      return (
         <>
            <Button variant="warning" onClick={onAccept}>
               Принять
            </Button>
            <Button variant="borderOrg" onClick={onReject}>
               Отклонить
            </Button>
         </>
      )
   }

   if (role === 'vendor') {
      return (
         <Box sx={{ display: 'flex', gap: availableTypes.length === 0 ? 11.5 : 2  }}>
            <Button variant="borderOrgS" onClick={handleDelete}>
               Удалить
            </Button>
            <Button variant="add" onClick={handleEdit}>
               Редактировать
            </Button>

            
            {availableTypes.length > 0 && (
               <Box sx={{ position: 'relative' }}>
                  <Button
                     variant="add"
                     icon
                     onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                     Добавить тип
                  </Button>

                  {dropdownOpen && (
                     <ClickAwayListener
                        onClickAway={() => setDropdownOpen(false)}
                     >
                        <Paper
                           elevation={3}
                           sx={{
                              position: 'absolute',
                              top: '100%',
                              mt: 1,
                              zIndex: 10,
                              width: 180,
                              backgroundColor: 'white',
                              border: '1px solid #ccc',
                           }}
                        >
                           {availableTypes.map((t) => (
                              <Box
                                 key={t}
                                 onClick={() => handleSelectType(t)}
                                 sx={{
                                    p: 1.5,
                                    cursor: 'pointer',
                                    '&:hover': {
                                       backgroundColor: '#f0f0f0',
                                    },
                                 }}
                              >
                                 <Typography>
                                    {t === 'AUDIO' && 'Аудиокнига'}
                                    {t === 'ELECTRONIC' && 'Электронная'}
                                    {t === 'PAPER' && 'Бумажная'}
                                 </Typography>
                              </Box>
                           ))}
                        </Paper>
                     </ClickAwayListener>
                  )}
               </Box>
            )}
         </Box>
      )
   }

   if (role === 'user') {
      return (
         <>
            <Button variant="borderOrg" onClick={onReject}>
               В избранное
            </Button>
            <Button variant="warning">Добавить в корзину</Button>
         </>
      )
   }

   return null
}

export default BookActionButtons
