export const saveStateToLocalStorage = (token, role, email, user) => {
   try {
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      if (email) localStorage.setItem('email', email)
      if (user) localStorage.setItem('user', JSON.stringify(user))
   } catch (e) {
      console.error('Ошибка при сохранении в localStorage', e)
   }
}
