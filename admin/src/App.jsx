import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar'
import { Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Order from './components/Order'
import AddItem from './components/AddItem'
import Menu from './components/Menu'
import Users from './components/Users'
import Message from './components/Message'

const App = () => {

  const {aToken} = useContext(AppContext)

  return (
    !aToken ? 
    <div>
      <Toaster />
      <LoginPage />
    </div>
    :
    <div className='min-h-screen bg-[#f8f5ef]'>
      <Toaster />
      <Navbar />
      <div className='flex items-start gap-4 px-3 pb-4 md:px-6'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/orders' element={<Order />}/>
          <Route path='/add-item' element={<AddItem />}/>
          <Route path='/see-items' element={<Menu />}/>
          <Route path='/see-users' element={<Users />}/>
          <Route path='/message' element={<Message />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
