import { useContext, useEffect } from 'react'
import { UsersRound, ShoppingCart, DollarSign, Package } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Order from './Order';

const Dashboard = () => {

  const {getAllUsers, aToken, stats} = useContext(AppContext);

  useEffect(() => {
    if(aToken) getAllUsers();
  }, [aToken])

  return (
    <div className='flex flex-col w-full overflow-y-scroll h-screen rounded-2xl bg-white/70'>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full p-5 md:p-8">
      <div className="bg-white border border-orange-100 shadow-[0_18px_45px_rgba(58,34,10,0.08)] rounded-2xl p-6 flex justify-center items-center gap-4 hover:shadow-xl transition">
        <UsersRound className="text-blue-600 w-8 h-8" />
        <div>
          <p className="text-sm text-gray-500">Users</p>
          <p className="text-xl font-semibold text-gray-800">{stats.users}</p>
        </div>
      </div>

      <div className="bg-white border border-orange-100 shadow-[0_18px_45px_rgba(58,34,10,0.08)] rounded-2xl p-6 flex justify-center items-center gap-4 hover:shadow-xl transition">
        <ShoppingCart className="text-green-600 w-8 h-8" />
        <div>
          <p className="text-sm text-gray-500">Orders</p>
          <p className="text-xl font-semibold text-gray-800">{stats.orders}</p>
        </div>
      </div>

      <div className="bg-white border border-orange-100 shadow-[0_18px_45px_rgba(58,34,10,0.08)] rounded-2xl p-6 flex justify-center items-center gap-4 hover:shadow-xl transition">
        <DollarSign className="text-yellow-500 w-8 h-8" />
        <div>
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-xl font-semibold text-gray-800">₹{stats.revenue}</p>
        </div>
      </div>

      <div className="bg-white border border-orange-100 shadow-[0_18px_45px_rgba(58,34,10,0.08)] rounded-2xl p-6 flex justify-center items-center gap-4 hover:shadow-xl transition">
        <Package className="text-purple-600 w-8 h-8" />
        <div>
          <p className="text-sm text-gray-500">Products</p>
          <p className="text-xl font-semibold text-gray-800">{stats.items}</p>
        </div>
      </div>
    </div>

    <hr />

    <div>
      <h2 className='text-lg font-semibold px-4 py-5'>Recent Orders</h2>

      <Order />
    </div>
    
    </div>
  )
}

export default Dashboard
