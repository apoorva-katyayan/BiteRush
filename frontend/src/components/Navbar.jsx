import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { BiSolidCategory } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
import { StoreContext } from '../context/StoreContext';

const Navbar = () => {

    const {token, setToken, userData} = useContext(AppContext);
    const location = useLocation();
  const {getTotalCartAmount, cartItems} = useContext(StoreContext);

    const navigate = useNavigate();
    const [sider, setSider] = useState(false);

    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const logout = () =>{
      setToken('');
      localStorage.removeItem('token');
      toast.success('Logout successfully');
      if(sider) setSider(false);
      
    }


  return (
    <div className='sticky top-0 z-40 mt-3 flex justify-between items-center rounded-2xl border border-orange-100/80 bg-white/90 px-3 py-2 shadow-[0_18px_45px_rgba(58,34,10,0.08)] backdrop-blur md:px-5'>
      <Link to={'/'}><img className='h-14' src={assets.logo} alt="" /></Link>
      <ul className='gap-2 hidden rounded-full bg-orange-50/80 p-1 text-sm font-medium text-stone-700 md:flex'>
        <Link to={'/'} className={`px-4 py-2 rounded-full transition ${location.pathname == '/'? 'bg-white text-orange-600 shadow-sm' : 'hover:text-orange-600'}`}>Home</Link>
        <Link to={'/menu'} className={`px-4 py-2 rounded-full transition ${location.pathname.startsWith('/menu')? 'bg-white text-orange-600 shadow-sm' : 'hover:text-orange-600'}`}>Menu</Link>
        <Link to={'/about'} className={`px-4 py-2 rounded-full transition ${location.pathname == '/about'? 'bg-white text-orange-600 shadow-sm' : 'hover:text-orange-600'}`}>About</Link>
        <Link to={'/contact'} className={`px-4 py-2 rounded-full transition ${location.pathname == '/contact'? 'bg-white text-orange-600 shadow-sm' : 'hover:text-orange-600'}`}>Contact</Link>
      </ul>
      <div className='flex items-center gap-4'>
      <div className='relative'>
  <img 
    className=' w-5 cursor-pointer hidden md:block' 
    src={assets.search_icon} 
    alt="search" 
    onClick={() => setShowSearch(prev => !prev)} 
  />
  {
    showSearch && (
      <input 
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search...'
        className='absolute hidden lg:block right-10 -top-2 p-2 border border-orange-100 outline-none rounded-full w-60 text-sm z-50 shadow-lg'
      />
    )
  }
</div>

            <div className='relative flex items-center'>
                <Link to={'/cart'} className='text-2xl p-2 text-orange-600 transition hover:text-orange-700'><CiShoppingCart /></Link>
                { Object.keys(cartItems).length > 0 &&
                  <div className='min-w-[18px] h-[18px] flex items-center justify-center text-xs font-bold text-white bg-orange-500 rounded-full absolute top-0 right-0 px-1 shadow'>
                    {Object.keys(cartItems).length}
                  </div>
                }
            </div>
        { 
        token? 
        <>
            <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='hidden md:flex w-8 h-8 rounded-full px-1 py-1' src={userData?.image?userData.image :assets.profile_icon} alt="" />

                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-white border border-orange-100 rounded-xl shadow-xl flex flex-col gap-4 p-4'>
                        <Link to={'/profile'} className='hover:text-black cursor-pointer duration-300'>My Profile</Link>
                        <Link to={'/orders'} className='hover:text-black cursor-pointer duration-300'>My Orders</Link>
                        <p onClick={logout} className='hover:text-black cursor-pointer duration-300'>Logout</p>
                    </div>
                </div>
            </div>
        </>:
            <button onClick={()=>navigate('/auth')} className='px-5 py-2 bg-orange-500 text-white rounded-full shadow-sm hover:bg-orange-600 duration-300'>Sign in</button>
        }

        <div className='relative group'>
          <p onClick={() =>setSider(prev=>!prev)} className='text-3xl mr-2 flex md:hidden'><BiSolidCategory /></p>
          {
            sider &&
            <div className='absolute flex flex-col gap-4 py-6 top-12 right-0 px-6
            w-[70vw] max-w-72 bg-orange-500 text-white z-50 rounded-2xl shadow-2xl md:hidden'>
              <Link onClick={()=>setSider(false)} to={'/'}  className={`border-[1px] flex items-center justify-center ${location.pathname == '/'? 'border-b-[2px] border-b-[#e6e5e4]' : ''}`}>Home</Link>
              <Link to={'/menu'} onClick={()=>setSider(false)} className={`border-[1px] flex items-center justify-center ${location.pathname.startsWith('/menu')? 'border-b-[2px] border-b-[#e6e5e4]' : ''}`}>Menu</Link>
              <Link to={'/about'} onClick={()=>setSider(false)} className={`border-[1px] flex items-center justify-center ${location.pathname == '/about'? 'border-b-[2px] border-b-[#e6e5e4]' : ''}`}>About</Link>
              <Link to={'/contact'} onClick={()=>setSider(false)} className={`border-[1px] flex items-center justify-center ${location.pathname == '/contact'? 'border-b-[2px] border-b-[#e6e5e4]' : ''}`}>Contact</Link>
              {token && <>
                <Link to={'/profile'} onClick={()=>setSider(false)} className={`border-[1px] flex items-center justify-center`}>Profile</Link>
                <Link to={'/orders'} onClick={()=>setSider(false)} className={`border-[1px] flex items-center justify-center`}>Orders</Link>
                <Link onClick={logout} className={`border-[1px] flex items-center justify-center`}>Logout</Link></>
                }     
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
