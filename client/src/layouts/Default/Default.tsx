import './Default.css'
import { Route, Routes } from 'react-router-dom'


// components
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

// pages
import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import NotFound from '../../pages/NotFound/NotFound'
import Cards from '../../pages/Cards/Cards'
import MyCards from '../../pages/MyCards/MyCards'
import Login from '../../pages/Login/Login'
import SignUp from '../../pages/SignUp/SignUp'
import CreateNewCard from '../../pages/CreateNewCard/CreateNewCard'
import ProductPage from '../../pages/ProductPage/ProductPage'
import EditUserDeatails from '../../pages/EditUserDeatails/EditUserDeatails'
import InventoryDashboard from '../../pages/InventoryDashboard/InventoryDashboard'





export default function Default() {

  return (
    <div className="Default">

      <Header />

      <div className="page-content" >
        <Routes >
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cards' element={<Cards />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/edituser' element={<EditUserDeatails />} />
          <Route path='/mycards' element={<MyCards />} />
          <Route path='/createnewcard' element={<CreateNewCard />} />
          <Route path='/inventorydashboard' element={<InventoryDashboard />} />
          <Route path="/productpage/:cardId" element={<ProductPage />} />

          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

