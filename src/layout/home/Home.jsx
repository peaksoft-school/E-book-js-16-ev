import LatestPublications from '../../components/LatestPublications'
import Mailing from '../../components/Mailing'
import Slider from '../../components/Slider'
import BookSlider from '../../components/UI/BookSlider'
import { SLIDER_BOOKS } from '../../utils/constants'
import Footer from '../Footer'
import Header from '../Header'

const Home = () => {
   return (
      <>
         <Header />
         <BookSlider />
         <Slider books={SLIDER_BOOKS} />
         <LatestPublications />
         <Slider books={SLIDER_BOOKS} title="Электронные книги" />
         <Mailing />
         <Footer />
      </>
   )
}

export default Home
