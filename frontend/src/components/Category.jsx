import { menu_list } from '../assets/assets'
import { Link } from 'react-router-dom'

const Category = () => {
  return (
    <div className='flex flex-col gap-4 mt-14'>
      <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.25em] text-orange-500'>Crave by category</p>
          <h1 className='text-3xl font-bold text-[#262626]'>Explore our menu</h1>
        </div>
        <p className='w-full leading-7 text-[#6f6a64] lg:max-w-[52%]'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      </div>
      <div className="flex items-center mt-5 overflow-x-scroll gap-5 rounded-3xl bg-white p-4 shadow-[0_20px_50px_rgba(58,34,10,0.08)] md:gap-8">
        {menu_list.map((item, index)=>{
            return (
               <div key={index} className='flex min-w-28 flex-col items-center gap-3 rounded-2xl p-3 transition hover:bg-orange-50'>
                <Link to={`/menu/${item.menu_name}`} onClick={()=>scrollTo(0, 0)} ><img className='h-24 w-24 cursor-pointer rounded-full border-4 border-orange-100 object-cover shadow-md duration-500 transition-all hover:scale-95 hover:border-orange-300' src={item.menu_image} alt="" /></Link>
                <p className='text-sm font-semibold text-stone-700'>{item.menu_name}</p>
               </div> 
            )
        })}
      </div>
    </div>
  )
}

export default Category
