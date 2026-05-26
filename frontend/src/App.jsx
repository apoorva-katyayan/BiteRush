import { useContext } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Signin from './pages/Signin'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import Profile from './pages/Profile'
import Order from './pages/Order'
import Checkout from './pages/Checkout'
import { AppContext } from './context/AppContext'

const App = () => {

  const {token} = useContext(AppContext);

  return (
    <>
    <div className='px-4 md:px-10 lg:px-24 max-w-[1500px] mx-auto' >
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/menu/:category' element={<Menu />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/auth' element={<Signin />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/profile' element={token ? <Profile /> : <Signin />}/>
        <Route path='/orders' element={token ? <Order /> : <Signin />}/>
        <Route path='/order' element={token ? <Checkout /> : <Signin />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
