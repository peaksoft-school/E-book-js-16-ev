import './App.css'
import Header from './layout/Header'

const App = () => (
   <h1>
      <Header
         onSearchChange={(val) => console.log(val)}
         navLinks={[
            { label: 'Электронные книги', to: '/ebooks' },
            { label: 'Audio books', to: '/audio' },
            { label: 'Промокоды', to: '/promo' },
            { label: 'Начать продавать на eBook', to: '/sell' },
         ]}
         onLogin={() => console.log('Login clicked')}
      />
   </h1>
)

export default App
