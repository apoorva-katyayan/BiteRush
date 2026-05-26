import { useContext } from 'react'
import logo from '../assets/logo.png'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const {setAToken} = useContext(AppContext);
  const logoutHandler = () => {
    localStorage.removeItem('aToken');
    setAToken('');
  }

  return (
    <div className='sticky top-0 z-30 mx-3 my-3 flex justify-between items-center rounded-2xl border border-orange-100 bg-white/90 px-4 py-2 shadow-[0_18px_45px_rgba(58,34,10,0.08)] backdrop-blur md:mx-6 md:px-6'>
      <div className='flex items-center gap-4'>
        <img className='h-14' src={logo} alt="" />
        <span className='rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600'>Admin</span>
      </div>
      <button onClick={logoutHandler} className='bg-orange-500 px-5 py-2 text-white rounded-full shadow-sm hover:bg-orange-600 transition'>Logout</button>
    </div>
  )
}

export default Navbar
