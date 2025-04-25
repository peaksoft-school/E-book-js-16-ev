// import './App.css'

// const App = () => <h1>eBook-js-16-ev</h1>

// export default App


import React from 'react'
import CategoryBook from './components/CatygoryBook'

const App = () => {
  return (
    <div>
        {/* <CatygoryBook/> */}
        <CategoryBook
  book={{
    image: "https://toppsta.com/images/covers/5/9/0/4/9781408855904.webp?t=1709095286",
    title: "История книги",
    description:
      "Предлагаемый перевод является первой попыткой обращения к творчеству Павла Орозия — римского христианского историка начала V века...",
    price: 456,
  }}
  categories={[
    "Бизнес-литература",
    "Детские книги",
    "Хобби и досуг",
    "Публицистика",
    "Учебная литература",
    "Поэзия",
  ]}
/>

    </div>
  )
}

export default App