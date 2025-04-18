import React, { useState } from 'react'
import Input from './components/UI/Input/Input'

const App = () => {
   const [value, setValue] = useState('')

   const handleChange = (event) => {
      setValue(event.target.value)
   }

   return (
      <div>
         <Input
            type="search"
            placeholder="Введите текст для поиска"
            value={value}
            onChange={handleChange}
            label="Поиск"
         />

         <Input
            type="password"
            placeholder="Введите пароль"
            value={value}
            onChange={handleChange}
            label="Пароль"
         />
         <Input
            type="info"
            placeholder="Информационное поле"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="ФИО"
         />
      </div>
   )
}

export default App
