import { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast'

const Menu = () => {

  const {items, getAllItems, aToken, backendUrl} = useContext(AppContext);
  const [dietFilter, setDietFilter] = useState('both');

  const filteredItems = useMemo(() => {
    return items.filter((item) => dietFilter === 'both' || item.foodType === dietFilter);
  }, [items, dietFilter]);

  const removeItemHandler = async (itemId) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/remove-item', {itemId}, {headers:{aToken}});

      if(data.success){
        toast.success(data.message);
        getAllItems();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  }

  const setSellingMode = async (mode) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/selling-mode', {mode}, {headers:{aToken}});

      if(data.success){
        toast.success(data.message);
        getAllItems();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  }

  const changeAvailability = async (itemId) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/change-availability', {itemId}, {headers:{aToken}});

      if(data.success){
        toast.success(data.message);
        getAllItems();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  }

  useEffect(() => {
    if(aToken) getAllItems();
  }, [aToken]);

  return items && (
    <div className='m-5 w-full h-screen overflow-y-scroll'>
      <p className='text-xl font-semibold'>All Items</p>

      <div className='my-5 flex flex-wrap gap-3'>
        {[
          ['both', 'Both'],
          ['veg', 'Pure Veg'],
          ['non-veg', 'Non-Veg'],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setDietFilter(value)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${dietFilter === value ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-stone-700 hover:bg-orange-50 hover:text-orange-600'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className='mb-6 rounded-2xl border border-orange-100 bg-white p-4 shadow-[0_18px_45px_rgba(58,34,10,0.08)]'>
        <p className='mb-3 text-sm font-semibold text-stone-600'>Selling mode</p>
        <div className='flex flex-wrap gap-3'>
          <button onClick={() => setSellingMode('veg')} className='rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600'>Sell Pure Veg Only</button>
          <button onClick={() => setSellingMode('non-veg')} className='rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600'>Sell Non-Veg Only</button>
          <button onClick={() => setSellingMode('both')} className='rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600'>Sell Both</button>
        </div>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {filteredItems.map((item, index) => (
          <div key={index} className='flex flex-col h-full overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_18px_45px_rgba(58,34,10,0.08)]'>
            <img className='h-44 w-full object-cover rounded-t-2xl' src={item.image} alt="" />
            <div className='px-4 py-5 flex flex-col gap-2 flex-1 justify-between'>
              <div className='flex justify-between items-center py-1'>
                <p className='font-bold text-lg text-neutral-800'>{item.name}</p>
                <p className='text-orange-500 text-xl font-bold'>₹{item.price}</p>
              </div>
              <div className='flex gap-2 items-center mb-1'>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.foodType === 'non-veg' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{item.foodType === 'non-veg' ? 'Non-Veg' : 'Pure Veg'}</span>
                {item.category && <span className='rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600'>{item.category}</span>}
              </div>
              <p className="min-h-10 text-sm leading-5 text-[#676767] mb-2">{item.desc.length > 50 ? item.desc.slice(0, 50) + "..." : item.desc}</p>
              <div className='flex justify-between items-center mt-auto'>
                <button onClick={()=>removeItemHandler(item._id)} className='px-4 py-1.5 rounded-full bg-orange-400 text-white font-semibold hover:bg-orange-500 transition'>Remove</button>
                {item.available
                  ? <span className='rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 cursor-pointer' onClick={()=>changeAvailability(item._id)}>Available</span>
                  : <span className='rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 cursor-pointer' onClick={()=>changeAvailability(item._id)}>Unavailable</span>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
