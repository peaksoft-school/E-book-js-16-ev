import { Outlet } from 'react-router'
import Footer from '../Footer'
import Header from '../Header'

const Home = () => {
   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   )
}

export default Home
