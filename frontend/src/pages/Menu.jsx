import { useContext, useMemo, useState } from 'react'
import { assets, menu_list } from '../assets/assets'
import { Link, useLocation } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { AppContext } from '../context/AppContext';
import Loader2 from '../components/Loader2';

const Menu = () => {

  const location = useLocation();
  const currCategory = location.pathname.split("/")[2]; 

  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);
  const {items, loader_2} = useContext(AppContext);
  const [dietFilter, setDietFilter] = useState('both');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = item.category == currCategory || !currCategory;
      const matchesDiet = dietFilter === 'both' || item.foodType === dietFilter;
      return matchesCategory && matchesDiet;
    });
  }, [items, currCategory, dietFilter]);

  return (
    <div className='mt-8 flex flex-col'>
      <div className='flex flex-wrap gap-3 rounded-3xl bg-white p-4 shadow-[0_18px_45px_rgba(58,34,10,0.08)]'>
        {menu_list.map((item, index)=>{
            return (
              <Link key={index} to={`/menu/${item.menu_name}`} className={`flex items-center rounded-full px-4 py-2 transition ${currCategory === item.menu_name ? 'bg-orange-500 text-white shadow-sm' : 'bg-orange-50 text-stone-700 hover:text-orange-600'} cursor-pointer`}>
                <p className='font-medium'>{item.menu_name}</p>
              </Link> 
            )
        })}
      </div>

      <div className='mt-5 flex flex-wrap items-center gap-3'>
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

      <div className='grid md:grid-cols-2 lg:grid-cols-4 mt-10 gap-6'>
        { loader_2 ? <div className='h-[200px] w-full md:w-[83vw] flex justify-center items-center'><Loader2 /></div> :
          filteredItems.map((item, index) => (
            <div key={index} className='flex flex-col h-full overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_18px_45px_rgba(58,34,10,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(58,34,10,0.14)]'>
              <div className="relative">
                <img className='h-44 w-full object-cover' src={item.image} alt="" />
                {item.available && (!cartItems[item.id]
                  ? <img className='w-10 absolute bottom-3 right-1 cursor-pointer' onClick={() => addToCart(item.id)} src={assets.add_icon_white} alt="" />
                  : <div className='flex absolute bottom-3 right-1 items-center gap-1.5 bg-white rounded-full'>
                    <img className='w-8 cursor-pointer' onClick={() => removeFromCart(item.id)} src={assets.remove_icon_red} alt="" />
                    <p className='text-orange-400 font-semibold'>{cartItems[item.id]}</p>
                    <img className='w-8 cursor-pointer' onClick={() => addToCart(item.id)} src={assets.add_icon_green} alt="" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 px-4 py-5 flex-1 justify-between">
                <div className="flex justify-between items-center py-1">
                  <p className='font-bold text-lg text-neutral-800'>{item.name}</p>
                  <img className='h-4' src={assets.rating_starts} alt="" />
                </div>
                <div className="flex gap-2 items-center mb-1">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.foodType === 'non-veg' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{item.foodType === 'non-veg' ? 'Non-Veg' : 'Pure Veg'}</span>
                  {item.category && <span className='rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600'>{item.category}</span>}
                </div>
                <p className="min-h-10 text-sm leading-5 text-[#676767] mb-2">{item.desc}</p>
                <div className='flex justify-between items-center mt-auto'>
                  <p className="text-orange-500 text-xl font-bold">₹{item.price}</p>
                  {item.available
                    ? <span className='rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600'>Available</span>
                    : <span className='rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600'>Unavailable</span>
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Menu
