import LatestPublications from '../components/LatestPublications'
import Mailing from '../components/Mailing'
import Slider from '../components/Slider'
import AudioSlider from '../components/UI/AudioSlider'
import BookSlider from '../components/UI/BookSlider'
import { AUDIO_BOOKS, SLIDER_BOOKS } from '../utils/constants'

const SlidersPage = () => {
   return (
      <>
         <BookSlider />
         <Slider books={SLIDER_BOOKS} />
         <LatestPublications />
         <AudioSlider audiobooks={AUDIO_BOOKS} />
         <Slider books={SLIDER_BOOKS} title="Электронные книги" />
         <Mailing />
      </>
   )
}

export default SlidersPage
