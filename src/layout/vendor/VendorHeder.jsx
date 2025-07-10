import Modal from '../../components/UI/Modal'
import PersonIcon from '@mui/icons-material/Person'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AUTH_ACTION } from '../../store/slices/authSlice'
import {
   Box,
   Menu,
   MenuItem,
   Tooltip,
   useTheme,
   Avatar,
   tooltipClasses,
   styled,
} from '@mui/material'
import MuiButton from '@mui/material/Button'
import Input from '../../components/UI/Input'
import { Icons } from '../../assets/icons'
import Button from '../../components/UI/buttons/Button'
import { useNavigate } from 'react-router'
import { resetPromoState } from '../../store/vendor/promoSandSlice'
import { createPromoCodeThunk } from '../../store/vendor/createPromoCodeThunk'
import { toast } from 'react-toastify'
const VendorHeder = () => {
   const [anchorEl, setAnchorEl] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [promoData, setPromoData] = useState({
      code: '',
      discount: '',
      startDate: '',
      endDate: '',
   })
   const open = Boolean(anchorEl)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const theme = useTheme()

   const { loading, successMessage, errorMessage } = useSelector(
      (state) => state.promoCode
   )

const handleSubmitPromoCode = () => {
  const { code, discount, startDate, endDate } = promoData

  if (!code || !discount || !startDate || !endDate) {
    return toast.error('Пожалуйста, заполните все поля.')
  }

  const discountNumber = Number(discount)
  if (isNaN(discountNumber) || discountNumber < 1 || discountNumber > 100) {
    return toast.error('Скидка должна быть числом от 1 до 100.')
  }

  if (new Date(startDate) > new Date(endDate)) {
    return toast.error('Дата начала не может быть позже даты окончания.')
  }

  dispatch(createPromoCodeThunk(promoData)).then((res) => {
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success(res.payload || 'Промокод успешно создан!')
      setPromoData({ code: '', discount: '', startDate: '', endDate: '' })
      handleCloseModal()
    } else {
      toast.error(res.payload || 'Ошибка при создании промокода')
    }
  })
}

   const handleOpenModal = () => setIsModalOpen(true)
   const handleCloseModal = () => {
  setIsModalOpen(false)
  dispatch(resetPromoState())
}


   const handleLogout = () => {
      dispatch(AUTH_ACTION.logOut())
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   const handleClick = () => {
      navigate('addbook')
   } 
   return (
      <StyledHeader>
         <StyledBox1>
            <img src={Icons.eBook} alt="logo" />
            <Input
               width="895px"
               placeholder="Искать жанр, книги, авторов, издательства... "
            />
            <Box
               component="img"
               src={Icons.ball}
               alt="!"
               sx={{
                  width: 24,
                  height: 24,
                  cursor: 'pointer',
               }}
            />
            <Box>
               <StyledButton
                  aria-label="settings"
                  size="small"
                  onClick={handleMenuOpen}
               >
                  <Avatar sx={{ bgcolor: '#ddd', width: 40, height: 40 }}>
                     <PersonIcon sx={{ color: '#777' }} />
                  </Avatar>
                  <Box component="img" src={Icons.down} alt="down"></Box>
               </StyledButton>

               <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  disableScrollLock
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
               >
                  <MenuItem onClick={handleClose}>Профиль</MenuItem>
                  <MenuItem onClick={handleLogout}>Выйти</MenuItem>
               </Menu>
            </Box>
         </StyledBox1>
         <StyledBox2>
            <Box className="block1">
            
<Button variant="borderOrgS" onClick={handleOpenModal}>
  Создать промокод
</Button>

               <Modal open={isModalOpen} handleClose={handleCloseModal} disableScrollLock>
                  <Box
                  onClick={(e) => e.stopPropagation()}
                     sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                     }}
                  >
                     <Input
                        width="485px"
                        label="Промокод"
                        placeholder="Введите промокод"
                        value={promoData.code}
                        type='info'
                        onChange={(e) =>
                           setPromoData({ ...promoData, code: e.target.value })
                        }
                     />
                     <Box sx={{ display: 'flex', gap: 2 }}>
                        <Input
                           width="160px"
                           label="Дата начала"
                           placeholder="гг-мм-дд"
                           type="info"
                           value={promoData.startDate}
                           onChange={(e) =>
                              setPromoData({
                                 ...promoData,
                                 startDate: e.target.value,
                              })
                           }
                        />
                        <Input
                           width="160px"
                           label="Дата завершения"
                           placeholder="гг-мм-дд"
                           type="info"
                           value={promoData.endDate}
                           onChange={(e) =>
                              setPromoData({
                                 ...promoData,
                                 endDate: e.target.value,
                              })
                           }
                        />
                        <Input
                           width="133px"
                           label="Процент скидки"
                           placeholder="0"  
                           type='info'
                           customIcon={Icons.prosent}
                           value={promoData.discount}
                           onChange={(e) =>
                              setPromoData({
                                 ...promoData,
                                 discount: e.target.value,
                              })
                           }
                        />
                     </Box>
                     <StyledBtn onClick={handleSubmitPromoCode}>Создать</StyledBtn>
                  </Box>
               </Modal>

               <StyledTooltip
                  title="Промокод применится ко всем вашим книгам"
                  placement="bottom-start"
                  arrow
               >
                  <Box
                     component="img"
                     src={Icons.exclg}
                     alt="!"
                     sx={{
                        width: 24,
                        height: 24,
                        border: '0',
                     }}
                  />
               </StyledTooltip>
            </Box>
            <Button variant="add" onClick={handleClick} icon>
               Добавить книгу
            </Button>
         </StyledBox2>
      </StyledHeader>
   )
}

export default VendorHeder

const StyledTooltip = styled(({ className, ...props }) => (
   <Tooltip arrow classes={{ popper: className }} {...props} />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#ffffff',
      color: '#969696',
      border: `1px solid #969696`,
      fontSize: 12,
      padding: '8px 12px',
      borderRadius: 0,
   },
   [`& .${tooltipClasses.arrow}`]: {
      '&:before': {
         backgroundColor: '#ffffff',
         border: '1px solid #969696',
         transform: 'rotate(45deg)',
         boxSizing: 'border-box',
      },
   },
}))

const StyledBox1 = styled(Box)({
   display: 'flex',
   gap: 45,
   textAlign: 'center',
   justifyContent: 'center',
   alignItems: 'center',
})

const StyledBox2 = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   '& .block1': {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
   },
})
const StyledHeader = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: 40,
   paddingRight: 100,
   paddingLeft: 100,
})

const StyledButton = styled(MuiButton)({
   color: '#B4B4B4',
   textTransform: 'none',
   display: 'flex',
   alignItems: 'center',
})


const StyledBtn = styled(Button)({
marginLeft: 386,
} )