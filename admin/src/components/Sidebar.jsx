import { NavLink } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { FiMessageSquare } from "react-icons/fi";


const Sidebar = () => {
  return (
    <div className='sticky top-24 min-h-[calc(100vh-7rem)] rounded-2xl border border-orange-100 bg-white shadow-[0_18px_45px_rgba(58,34,10,0.08)]'>
        <ul className='text-[#515151] py-6 flex flex-col gap-2'>

            <NavLink className={({isActive}) => `mx-2 flex items-center gap-3 rounded-xl py-3.5 px-3 md:px-6 lg:min-w-64 cursor-pointer transition ${isActive ? 'bg-orange-500 text-white shadow-sm' : 'hover:bg-orange-50 hover:text-orange-600'}`} to={'/'}>
                <MdDashboard/>
                <p className='hidden lg:block'>Dashboard</p>
            </NavLink>

            <NavLink to={'/orders'} className={({isActive}) => `mx-2 flex items-center gap-3 rounded-xl py-3.5 px-3 md:px-6 lg:min-w-64 cursor-pointer transition ${isActive ? 'bg-orange-500 text-white shadow-sm' : 'hover:bg-orange-50 hover:text-orange-600'}`}>
                <FaOpencart />
                <p className='hidden lg:block'>Orders</p>
            </NavLink>

            <NavLink to={'/add-item'} className={({isActive}) => `mx-2 flex items-center gap-3 rounded-xl py-3.5 px-3 md:px-6 lg:min-w-64 cursor-pointer transition ${isActive ? 'bg-orange-500 text-white shadow-sm' : 'hover:bg-orange-50 hover:text-orange-600'}`}>
                <MdOutlineAddCircle />
                <p className='hidden lg:block'>Add Item</p>
            </NavLink>

            <NavLink to={'see-items'} className={({isActive}) => `mx-2 flex items-center gap-3 rounded-xl py-3.5 px-3 md:px-6 lg:min-w-64 cursor-pointer transition ${isActive ? 'bg-orange-500 text-white shadow-sm' : 'hover:bg-orange-50 hover:text-orange-600'}`}>
                <MdOutlineRestaurantMenu />
                <p className='hidden lg:block'>See Items</p>
            </NavLink>

            <NavLink to={'/see-users'} className={({isActive}) => `mx-2 flex items-center gap-3 rounded-xl py-3.5 px-3 md:px-6 lg:min-w-64 cursor-pointer transition ${isActive ? 'bg-orange-500 text-white shadow-sm' : 'hover:bg-orange-50 hover:text-orange-600'}`}>
                <PiUsersThreeFill />
                <p className='hidden lg:block'>See Users</p>
            </NavLink>

            <NavLink to={'/message'} className={({isActive}) => `mx-2 flex items-center gap-3 rounded-xl py-3.5 px-3 md:px-6 lg:min-w-64 cursor-pointer transition ${isActive ? 'bg-orange-500 text-white shadow-sm' : 'hover:bg-orange-50 hover:text-orange-600'}`}>
                <FiMessageSquare />
                <p className='hidden lg:block'>All Messages</p>
            </NavLink>
        </ul>
    </div>
  )
}

export default Sidebar
