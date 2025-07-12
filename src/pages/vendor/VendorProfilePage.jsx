import { Typography, Box, styled, Button } from '@mui/material'
import Input from '../../components/UI/Input'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { VALIDATION_SCHEMA_UPDATE_PROFILE } from '../../utils/helpers/validate'
import {
   deletedProfileByVendor,
   updatePasswordForVendor,
   updateProfileVendor,
   getProfileVendor,
} from '../../store/vendor/profile/vendorProfileThunk'
import notify from '../../utils/helpers/notify'
import Modal from '../../components/UI/Modal'
import { AUTH_ACTION } from '../../store/slices/authSlice'
import { VENDOR_PROFILE_ACTION } from '../../store/vendor/profile/vendorProfileSlice'
import RoleBreadcrumbs from '../../components/UI/innerpagecoms/RoleBreadCrums'

const VendorProfilePage = () => {
   const [email, setEmail] = useState('')
   const [lastName, setLastName] = useState('')
   const [firstName, setFirstName] = useState('')
   const [currentPassword, setCurrentPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')

   const [validationErrors, setValidationErrors] = useState({})
   const [isModalOpen, setIsModalOpen] = useState(false)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { error, successMessage, isLoading, profile } = useSelector(
      (state) => state.vendorProfile
   )

   const fio = firstName + ' ' + lastName

   useEffect(() => {
      dispatch(getProfileVendor())
      return () => {
         dispatch(VENDOR_PROFILE_ACTION.clearVendorMessages())
      }
   }, [dispatch])

   useEffect(() => {
      if (profile) {
         setFirstName(profile.firstName || '')
         setLastName(profile.lastName || '')
         setPhoneNumber(profile.phoneNumber || '')
         setEmail(profile.email || '')
      }
   }, [profile])

   useEffect(() => {
      if (successMessage) {
         notify({ message: successMessage, type: 'success' })
         dispatch(VENDOR_PROFILE_ACTION.clearVendorMessages())
      }
      if (error) {
         const errorMessage =
            typeof error === 'string'
               ? error
               : error?.message || 'Произошла ошибка'
         notify({ message: errorMessage, type: 'error' })
         dispatch(VENDOR_PROFILE_ACTION.clearVendorMessages())
      }
   }, [successMessage, error, dispatch])

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()
         setValidationErrors({})

         const isProfileInfoChanged =
            firstName !== (profile?.firstName || '') ||
            lastName !== (profile?.lastName || '') ||
            phoneNumber !== (profile?.phoneNumber || '') ||
            email !== (profile?.email || '')

         const isPasswordChangeAttempted =
            currentPassword || newPassword || confirmPassword

         if (!isProfileInfoChanged && !isPasswordChangeAttempted) {
            notify({
               message: 'Нет изменений для сохранения.',
               type: 'info',
            })
            return
         }

         VALIDATION_SCHEMA_UPDATE_PROFILE.validate(
            {
               firstName,
               lastName,
               phoneNumber,
               email,
               currentPassword,
               newPassword,
               confirmPassword,
            },
            { abortEarly: false }
         )
            .then(() => {
               if (isProfileInfoChanged) {
                  dispatch(
                     updateProfileVendor({
                        firstName,
                        lastName,
                        phoneNumber,
                        email,
                     })
                  )
               }

               if (currentPassword && newPassword && confirmPassword) {
                  dispatch(
                     updatePasswordForVendor({
                        currentPassword,
                        newPassword,
                     })
                  )
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
               }
            })
            .catch((validationErr) => {
               const errors = {}
               if (validationErr.inner) {
                  validationErr.inner.forEach((err) => {
                     errors[err.path] = err.message
                  })
               }
               setValidationErrors(errors)
            })
      },
      [
         firstName,
         lastName,
         phoneNumber,
         email,
         currentPassword,
         newPassword,
         confirmPassword,
         profile,
         dispatch,
      ]
   )

   const handleDeleteProfileClick = () => {
      setIsModalOpen(true)
   }

   const handleCloseModal = () => {
      setIsModalOpen(false)
   }

   const handleConfirmDelete = async () => {
      const resultAction = await dispatch(deletedProfileByVendor())

      if (deletedProfileByVendor.fulfilled.match(resultAction)) {
         dispatch(AUTH_ACTION.logOut())
         navigate('/')
      }

      setIsModalOpen(false)
   }

   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
         }}
      >
         <StyledForm onSubmit={handleSubmit}>
            <RoleBreadcrumbs role="vendor" bookName={fio} />

            <FormWrapper>
               <StyledLeftForm>
                  <StyledText>Личная информация</StyledText>
                  <Input
                     type="info"
                     placeholder="Напишите ваше имя"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     label="Ваше имя"
                     error={Boolean(validationErrors.firstName)}
                     helperText={validationErrors.firstName}
                  />
                  <Input
                     type="info"
                     placeholder="Введите вашу фамилию"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     label="Ваша фамилия"
                     error={Boolean(validationErrors.lastName)}
                     helperText={validationErrors.lastName}
                  />
                  <Input
                     type="info"
                     placeholder="+996 (___) __ __ __"
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     label="Номер телефона"
                     error={Boolean(validationErrors.phoneNumber)}
                     helperText={validationErrors.phoneNumber}
                  />
                  <Input
                     type="info"
                     placeholder="Напишите email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     label="Email"
                     error={Boolean(validationErrors.email)}
                     helperText={validationErrors.email}
                  />
                  <StyledDeleteText onClick={handleDeleteProfileClick}>
                     Удалить профиль?
                  </StyledDeleteText>
               </StyledLeftForm>

               <StyledRightForm>
                  <StyledText>Изменить пароль</StyledText>
                  <Input
                     type="password"
                     placeholder="Напишите текущий пароль"
                     value={currentPassword}
                     onChange={(e) => setCurrentPassword(e.target.value)}
                     label="Текущий пароль"
                     error={Boolean(validationErrors.currentPassword)}
                     helperText={validationErrors.currentPassword}
                  />
                  <Input
                     type="password"
                     placeholder="Напишите новый пароль"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     label="Новый пароль"
                     error={Boolean(validationErrors.newPassword)}
                     helperText={validationErrors.newPassword}
                  />
                  <Input
                     type="password"
                     placeholder="Подтвердите пароль"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     label="Подтвердите пароль*"
                     InputLabelProps={{ sx: { color: '#ca3c3c' } }}
                     error={Boolean(validationErrors.confirmPassword)}
                     helperText={validationErrors.confirmPassword}
                  />
               </StyledRightForm>
            </FormWrapper>

            <ButtonWrapper>
               <StyledCencelButton
                  variant="outlined"
                  onClick={() => navigate(-1)}
               >
                  Отменить
               </StyledCencelButton>
               <StyledSaveButton
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
               >
                  {isLoading ? 'Сохранение...' : 'Сохранить'}
               </StyledSaveButton>
            </ButtonWrapper>

            <Modal open={isModalOpen} handleClose={handleCloseModal}>
               <ModalContentWrapper>
                  <Typography sx={{ mt: 2 }}>
                     Вы уверены, что хотите удалить профиль?
                  </Typography>
                  <ModalActions>
                     <StyledButton
                        onClick={handleCloseModal}
                        disabled={isLoading}
                     >
                        Отмена
                     </StyledButton>
                     <StyledSaveButton
                        onClick={handleConfirmDelete}
                        variant="contained"
                        disabled={isLoading}
                     >
                        {isLoading ? 'Удаление...' : 'Удалить'}
                     </StyledSaveButton>
                  </ModalActions>
               </ModalContentWrapper>
            </Modal>
         </StyledForm>
      </Box>
   )
}

export default VendorProfilePage

const StyledForm = styled('form')({
   width: '100%',
   maxWidth: '1250px',
   backgroundColor: '#fff',
   padding: '32px',
   borderRadius: '8px',
   boxShadow: 'none',
})

const StyledRightForm = styled(Box)({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '7px',
})

const StyledLeftForm = styled(Box)({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '7px',
})

const FormWrapper = styled(Box)({
   width: '100%',
   display: 'flex',
   gap: '160px',
   margin: '60px auto',
})

const ButtonWrapper = styled(Box)({
   width: '100%',
   display: 'flex',
   justifyContent: 'flex-end',
   gap: '10px',
   marginTop: '20px',
})

const StyledText = styled(Typography)({
   fontSize: '18px',
   fontWeight: 600,
   marginBottom: '40px',
})

const StyledDeleteText = styled(Typography)({
   marginBottom: '40px',
   color: 'red',
   marginTop: '30px',
   cursor: 'pointer',
})

const StyledSaveButton = styled(Button)({
   borderRadius: 0,
   padding: '10px 24px',
})
const StyledCencelButton = styled(Button)({
   borderRadius: 0,
   padding: '10px 24px',
   border: 'none',
})
const ModalContentWrapper = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '15px',
})

const ModalActions = styled(Box)({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'flex-end',
   gap: '10px',
   marginTop: '20px',
   alignItems: 'center',
})
const StyledButton = styled(Button)({
   backgroundColor: 'white !important',
   color: '#afafaf !important',
   boxShadow: 'none',
})
