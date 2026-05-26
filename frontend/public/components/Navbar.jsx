import { useState } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseItemQuantity, decreaseItemQuantity } from "../redux/CardSlice";
import { IoRestaurant } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const naggate=useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  

const handlebtn=(e)=>{
  console.log(e.target.value);
  
}

  return (
    <nav className="bg-[#f77219] p-4 h-[80px] shadow-lg fixed w-full z-50 top-0 left-0">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 py-2">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <IoRestaurant className="text-2xl text-white"/>
        <Link to="/" className="text-2xl font-bold text-white"><span className="text-red-600">My</span>Restaurant</Link>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-semibold">
          <li><Link to="/" className="hover:text-gray-200 transition duration-300">Home</Link></li>
          <li><Link to="/menu" className="hover:text-gray-200 transition duration-300">Menu</Link></li>
          <li><Link to="/about" className="hover:text-gray-200 transition duration-300">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200 transition duration-300">Contact</Link></li>
        </ul>
        
        {/* Icons and Auth Buttons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input type="text" placeholder="Search..." className="hidden md:block px-3 py-1 rounded-lg border-red-100 border-1 bg-amber-50" onChange={(e)=>handlebtn(e)} />
          
          {/* Shopping Bag with Notification */}
          <div className="relative cursor-pointer">
            <GrCart onClick={()=>naggate("/cart")} size={28} className="text-white" />
            <span className="absolute -top-1 -right-1 bg-red-600  text-white text-[13px] font-bold rounded-full px-1">{cart.length}</span>
          </div>
          
          {/* Profile Icon */}
          <div className="cursor-pointer">
            <User size={28} className="text-white" />
          </div>
          
          {/* Sign In / Log In */}
          <Link to="/signin" className="hidden md:block bg-white text-orange-500 px-4 py-1 rounded-lg font-semibold">Sign In</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} className="cursor-pointer" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-orange-600 text-white text-center transition-transform duration-800 ease-in-out ${isOpen ? '-translate-y-0' : '-translate-y-150'} pt-16`}>
        <ul className="px-6 py-4 space-y-3">
          <li><Link to="/" className="block py-2">Home</Link></li>
          <li><Link to="/menu" className="block py-2">Menu</Link></li>
          <li><Link to="/about" className="block py-2">About</Link></li>
          <li><Link to="/contact" className="block py-2">Contact</Link></li>
          <li><Link to="/signin" className="block py-2 bg-white text-orange-500 rounded-lg">Sign In</Link></li>
        </ul>
      </div>
    </nav>
  );
}
