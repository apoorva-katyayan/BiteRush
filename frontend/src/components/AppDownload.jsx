import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const AppDownload = () => {

  const msgFunction = () => {
    toast.error('We are working on it!!')
  }

  return (
    <div className='m-auto mt-24 rounded-3xl bg-[#15110d] px-6 py-12 text-center font-semibold text-white shadow-[0_24px_70px_rgba(58,34,10,0.16)]'>
      <p className='text-3xl leading-tight'>For Better Experience Download <br />Biterush App</p>
      <div className="flex justify-center items-center gap-2 mt-4">
        <img onClick={msgFunction} className='h-12 cursor-pointer hover:scale-105 transition-all duration-500' src={assets.play_store} alt="" />
        <img onClick={msgFunction} className='h-12 cursor-pointer hover:scale-105 transition-all duration-500' src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
