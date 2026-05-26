import { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext';
import { AppContext } from '../context/AppContext';
import Loader2 from './Loader2';

const TopDishes = () => {

  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);
  const {items, loader_2} = useContext(AppContext);

  return ( loader_2 ? <div className='h-[200px] w-full flex justify-center items-center'><Loader2 /></div> :
    <div className='w-full flex flex-col gap-6 mt-14'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.25em] text-orange-500'>Most loved</p>
          <h1 className='text-3xl font-bold text-stone-900'>Top Dishes</h1>
        </div>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {
        items.slice(0, 8).map((item, index) => (
            <div className='overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_18px_45px_rgba(58,34,10,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(58,34,10,0.14)]' key={index}>
                <div className="relative">
                    <img className='h-44 w-full object-cover' src={item.image} alt="" />
                    {item.available && (!cartItems[item.id]
                        ?<img className='w-10 absolute bottom-3 right-1 cursor-pointer' onClick={()=>addToCart(item.id)} src={assets.add_icon_white} alt="" />
                        :<div className='flex absolute bottom-3 right-1 items-center gap-1.5 bg-white rounded-full'>
                            <img className='w-8 cursor-pointer' onClick={()=>removeFromCart(item.id)} src={assets.remove_icon_red} alt="" />
                            <p className='text-orange-400 font-semibold'>{cartItems[item.id]}</p>
                            <img className='w-8 cursor-pointer' onClick={()=>addToCart(item.id)} src={assets.add_icon_green} alt="" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2 px-4 py-5">
                    <div className="flex justify-between items-center py-1">
                        <p className='font-medium text-[20px]'>{item.name}</p>
                        <img className='h-4' src={assets.rating_starts} alt="" />
                    </div>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${item.foodType === 'non-veg' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {item.foodType === 'non-veg' ? 'Non-Veg' : 'Pure Veg'}
                    </span>
                    <p className="min-h-10 text-sm leading-5 text-[#676767]">{item.desc}</p>
                    <div className='flex justify-between items-center'>
                      <p className="text-orange-500 text-[22px]">₹{item.price}</p>
                      {item.available? <p className='rounded-full bg-green-50 px-3 py-1 text-[13px] font-semibold text-green-600'>Available</p> : <p className='rounded-full bg-red-50 px-3 py-1 text-[13px] font-semibold text-red-600'>Unavailable</p>}
                    </div>
                </div>
            </div>
        ))
      }
      </div>

      <div className='flex justify-center mt-3'><Link to={'/menu'} onClick={()=>scrollTo(0, 0)} className='px-8 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-sm hover:bg-orange-600 duration-300'>View more</Link></div>
    </div>
  )
}

export default TopDishes
