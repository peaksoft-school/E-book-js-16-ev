// import './App.css'

// const App = () => <h1>eBook-js-16-ev</h1>

// export default App

import BookSlider from './components/UI/BookSlider.jsx'
import { BOOK_SLIDER } from './utils/constants/index.js'

function App() {
   return <BookSlider books={BOOK_SLIDER} />
}
export default App
