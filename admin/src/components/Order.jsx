import { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast';

const Order = () => {

  const {orders, getAllOrders, aToken, backendUrl} = useContext(AppContext);

  useEffect(() => {
    if(aToken) getAllOrders();
  }, [aToken]);

  const actionOnOrder = async (orderId, action) =>{
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/action', {orderId, action}, {headers:{aToken}});

      if(data.success){
        toast.success(data.message);
        getAllOrders();
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  }


  function formatOrderItems(rawString) {
    return rawString
      .split(',')
      .map(item => {
        const parts = item.split('->').map(str => str.trim());
  
        if (parts.length !== 2) return null;
  
        const [name, count] = parts;
  
        if (!name || !count) return null;
  
        const formattedName = name
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  
        return `• ${formattedName} - x${count} `;
      })
      .filter(Boolean)
      .join('\n'); // 4 spaces between items
  }

  return orders && (
    <div className='flex flex-col mt-5 w-full h-[85vh] overflow-y-scroll'>
      <h2 className='text-lg font-semibold ml-5'>All Orders</h2>
      <div className='hidden md:block w-full px-2 md:px-8 lg:px-14 mt-5'>
        <div className='grid grid-cols-[2.5fr_0.5fr_1fr_1fr_1fr_1fr] gap-6 py-1.5 text-[#7b7b7b] font-medium text-center'>
          <p className='text-left'>All Items</p>
          <p className='text-left'>User-Details</p>
          <p>Total</p>
          <p>Mode</p>
          <p>Payment</p>
          <p>Action</p>
        </div>
        <hr />
        <div>
          {
            orders.map((item, index) => (
              <>
              <div key={index} className='grid grid-cols-[2.5fr_0.5fr_1fr_1fr_1fr_1fr] gap-6 py-4 items-center border-b border-black'>
                <span className='text-left whitespace-pre-wrap pr-8'>{formatOrderItems(item.items)}</span>
                <div className='text-left'>
                  <p>{item.userId.fullName}</p>
                  <p>{item.userId.email}</p>
                  <p>{item.userId.phone}</p>
                  <p>{item.userId.address}</p>
                </div>
                <p className='text-center text-[15px] font-semibold'>₹{item.totalPrice}</p>
                <p className='text-center'>{item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}</p>
                <p className='text-center text-[15px] font-semibold'>
                  {item.payment_status === 'Refunded' ? 'Refunded' : (item.isPaid ? 'Paid' : 'Not Paid')}
                </p>
                <div className='flex flex-col gap-1 items-center'>
                  <button onClick={()=>actionOnOrder(item._id, 'Pending')} className={`w-20 py-1 rounded-md text-white ${item.status === 'Pending'? 'bg-orange-500' : 'bg-slate-500'}`}>Pending</button>
                  <button onClick={()=>actionOnOrder(item._id, 'Cancelled')} className={`w-20 py-1 rounded-md text-white ${item.status === 'Cancelled'? 'bg-red-600' : 'bg-slate-500'}`}>Cancelled</button>
                  <button onClick={()=>actionOnOrder(item._id, 'Accepted')} className={`w-20 py-1 rounded-md text-white ${item.status === 'Accepted'? 'bg-green-500' : 'bg-slate-500'}`}>Accepted</button>
                  <button onClick={()=>actionOnOrder(item._id, 'Completed')} className={`w-20 py-1 rounded-md text-white ${item.status === 'Completed'? 'bg-green-800' : 'bg-slate-500'}`}>Completed</button>
                </div>
              </div>
              </>
            ))
          }
        </div>
      </div>

      <div className='block md:hidden w-full mt-5'>
        <div className='flex flex-col gap-4'>
          {
            orders.map((item, index) => (
              <>
              <div key={index} className='flex flex-col justify-between py-5 gap-5 border-[1px] shadow-md px-2 rounded-md'>
                <span style={{ whiteSpace: 'pre-wrap' }}>{formatOrderItems(item.items)}</span>
                <hr className='h-[2px] bg-black' />
                <div>
                  <p>{item.userId.fullName}</p>
                  <p>{item.userId.email}</p>
                  <p>{item.userId.phone}</p>
                  <p>{item.userId.address}</p>
                </div>

                <div className='flex w-full justify-between items-center'>
                  <p className='text-[15px] font-semibold'>₹{item.totalPrice}</p>
                  <p className='hidden lg:block'>{item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}</p>
                  <p className='text-[15px] font-semibold'>{item.isPaid ? 'Paid' : 'Not Paid'}</p>
                </div>

                <div className='flex flex-col gap-1'>
                  <button onClick={()=>actionOnOrder(item._id, 'Pending')} className={`py-1 rounded-md text-white ${item.status === 'Pending'? 'bg-orange-500' : 'bg-slate-500'}`}>Pending</button>
                  <button onClick={()=>actionOnOrder(item._id, 'Cancelled')} className={`py-1 rounded-md text-white ${item.status === 'Cancelled'? 'bg-red-600' : 'bg-slate-500'}`}>Cancelled</button>
                  <button onClick={()=>actionOnOrder(item._id, 'Accepted')} className={`py-1 rounded-md text-white ${item.status === 'Accepted'? 'bg-green-500' : 'bg-slate-500'}`}>Accepted</button>
                  <button onClick={()=>actionOnOrder(item._id, 'Completed')} className={`py-1 rounded-md text-white ${item.status === 'Completed'? 'bg-green-800' : 'bg-slate-500'}`}>Completed</button>
                </div>
                
              </div> 
              <hr className='h-2 bg-black'/>
              </>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Order
