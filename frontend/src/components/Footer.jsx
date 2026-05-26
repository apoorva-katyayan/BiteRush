import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className='w-full bg-[#120f0c] text-[#d9d9d9] px-4 md:px-24 py-12 flex flex-col items-center mt-16'>
      <div className="grid max-w-[1300px] md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-20">
        <div className="flex flex-col items-start gap-5">
            <img onClick={()=>{navigate('/'); scrollTo(0, 0)}} className='h-16 w-48 cursor-pointer' src={assets.logo} alt="" />
            <p>At BiteRush, we bring you the finest flavors from your favorite restaurants, made fresh for you. Enjoy a seamless food experience that satisfies your cravings with just a few clicks!</p>
        </div>
        <div className="flex flex-col items-start gap-5">
            <h2 className='text-white'>COMPANY</h2>
            <ul className='flex flex-col gap-2'>
                <li className='cursor-pointer hover:text-white' onClick={()=>{navigate('/'); scrollTo(0, 0)}}>Home</li>
                <li className='cursor-pointer hover:text-white' onClick={()=>{navigate('/about'); scrollTo(0, 0)}}>About us</li>
                {/* <li className='cursor-pointer hover:text-white' onClick={()=>{navigate('/about'); scrollTo(0, 0)}}>Delivery</li> */}
                <li className='cursor-pointer hover:text-white' onClick={()=>{navigate('/about'); scrollTo(0, 0)}}>Privacy policy</li>
                <li className='cursor-pointer hover:text-white' onClick={()=>{navigate('/about'); scrollTo(0, 0)}}>Terms & Conditions</li>
            </ul>
        </div>
        <div className="flex flex-col items-start gap-5">
            <h2 className='text-white'>GET IN TOUCH</h2>
            <ul className='flex flex-col gap-2'>
                <li className='cursor-pointer'>Phone: +91 9801119898</li>
                <li>📧 Email: </li>
                <li className='cursor-pointer'>support@biterush.com</li>
                <li>📍 Address: </li>
                <li className='cursor-pointer'>Aurangabad, Bihar (India)</li>
            </ul>
        </div>
      </div>
      <hr />
      <div className="flex items-center gap-5 mt-5">
          <a href="https://www.facebook.com/" target='_blank'><img className='w-8 cursor-pointer hover:scale-95 duration-300' src={assets.facebook_icon} alt="" /></a>
          <a href="https://x.com/home?lang=en" target='_blank'><img className='w-8 cursor-pointer hover:scale-95 duration-300' src={assets.twitter_icon} alt="" /></a>
          <a href="https://www.linkedin.com/feed/" target='_blank'><img className='w-8 cursor-pointer hover:scale-95 duration-300' src={assets.linkedin_icon} alt="" /></a>
      </div>
      <p className='footer-copyright mt-5'>
        Copyright 2026 © Biterush.com - All Right Reserved.
      </p>
    </div>
  )
}

export default Footer
