// import './App.css'


import Button from "./components/UI/Button"



// const App = () => <h1>eBook-js-16-ev</h1>

// export default App

// import React from 'react'
// import UploadButton from './components/UI/DButton'

// const App = () => {
//   return (
//     <div>
//         <UploadButton
//   label="паспорт"
//   fileName="паспорт"
//   uploadKey="passportUpload"
// />

// <UploadButton
//   label="ИНН"
//   fileName="ИНН"
//   uploadKey="innUpload"
// />

//     </div>
//   )
// }

// export default App

import UploadButton from "./components/UI/UploadButton"
// import con from "./assets/icons/svgs/Frame.svg"
const App = () => {
  return (
    <div>
        {/* <Button variant="warning">Добавить в корзину</Button>
        <Button variant="contained">Войти</Button>
        <Button variant="outlined">Личный кабинет</Button>
        <Button variant="add" icon={true}> Добавить книгу</Button>
        <Button variant="large">Смотреть больше</Button>
        <Button variant="notbor" >Очистить корзину</Button>
        <Button variant="notboru">Добавить в избранное</Button> */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <UploadButton label="аудиозапись" fileName="Аудиозапись" isLoading={true}/>
      <UploadButton label="книгу" fileName="PDF" />
    </div>
    </div>
  )
}
export default App