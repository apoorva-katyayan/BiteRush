import { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

const Order = () => {

  const {orders, getAllOrders, token, backendUrl} = useContext(AppContext);
  const navigate = useNavigate();

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
  
  const cancelOrder = async (orderId) => {
    try {

      const {data}  = await axios.post(backendUrl+'/api/user/cancel-order', {orderId}, {headers:{token}});

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
  
  useEffect(() => {
    if(token) getAllOrders();
  }, [token])


  const initPay = async (order, key) => {
    const options = {
      key: key,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-payment', response, { headers: { token } })
          if (data.success) {
            getAllOrders();
            navigate('/orders')
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const paymentRazorpay = async (orderId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { orderId }, { headers: { token } });
      if (data.success && data.response && data.key) {
        initPay(data.response, data.key);
      } else {
        toast.error(data.message || 'Payment initialization failed');
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-700 hover:bg-emerald-800';
      case 'Pending':
        return 'bg-amber-700 hover:bg-amber-800';
      case 'Cancelled':
        return 'bg-rose-700 hover:bg-rose-800';
      case 'Completed':
        return 'bg-indigo-700 hover:bg-indigo-800';
      default:
        return 'bg-gray-700 hover:bg-gray-800';
    }
  };
  return (
    <div className='flex flex-col mt-5 w-full min-h-[52vh]'>
      <h2 className='text-lg font-semibold'>My Orders</h2>
      <div className='hidden md:block w-full px-2 md:px-8 lg:px-14 mt-5'>
        <div className='grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr] py-1.5 text-[#7b7b7b] font-medium'>
          <p>All Items</p>
          <p>Total</p>
          <p className='hidden lg:block'>Mode</p>
          <p>Payment</p>
          <p>Action</p>
          <p>Status</p>
        </div>
        <hr />
        <div className=''>
          {
            orders.map((item, index) => (
              <>
              <div key={index} className='grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr] py-2.5 items-center'>
                <span style={{ whiteSpace: 'pre-wrap' }}>{formatOrderItems(item.items)}</span>

                <p className='text-[15px] font-semibold'>₹{item.totalPrice}</p>
                <p className='hidden lg:block'>{item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}</p>
                <div>
                    <p>
                      {item.payment === 'Online' ? (
                        item.payment_status === 'Refunded' ? (
                          <button className='px-6 py-1 text-white bg-rose-700 hover:bg-rose-800 rounded-md text-center'>Refunded</button>
                        ) : item.isPaid ? (
                          <button className='px-6 py-1 text-white bg-green-800 hover:bg-green-600 rounded-md text-center'>Paid</button>
                        ) : (
                          <button onClick={() => paymentRazorpay(item._id)} className='px-6 py-1 text-white bg-orange-400 hover:bg-orange-600 rounded-md text-center'>Pay</button>
                        )
                      ) : (
                        <button className='px-5 py-1 bg-orange-400 text-white hover:bg-orange-600 rounded-md text-center'>Cash</button>
                      )}
                    </p>
                  </div>
                <p onClick={()=>cancelOrder(item._id)} className='px-2 py-1 text-red-400 hover:text-red-600 cursor-pointer'>Cancel</p>
                <button className={`px-3 py-1.5 rounded-md text-white text-sm font-medium text-center ${getStatusClass(item.status)}`}>{item.status}</button>
              </div> 
              <hr />
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

                <div className='flex w-full justify-between items-center'>
                  <p className='text-[15px] font-semibold'>₹{item.totalPrice}</p>
                  <p className='hidden lg:block'>{item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}</p>
                  <div>
                    <p>
                      {item.payment === 'Online' ? (
                        item.payment_status === 'Refunded' ? (
                          <button className='px-6 py-1 text-white bg-rose-700 hover:bg-rose-800 rounded-md text-center'>Refunded</button>
                        ) : item.isPaid ? (
                          <button className='px-6 py-1 text-white bg-green-800 hover:bg-green-600 rounded-md text-center'>Paid</button>
                        ) : (
                          <button onClick={() => paymentRazorpay(item._id)} className='px-6 py-1 text-white bg-orange-400 hover:bg-orange-600 rounded-md text-center'>Pay</button>
                        )
                      ) : (
                        <button className='px-5 py-1 bg-orange-400 text-white hover:bg-orange-600 rounded-md text-center'>Cash</button>
                      )}
                    </p>
                  </div>
                  <p onClick={()=>cancelOrder(item._id)} className='px-2 py-1 text-red-400 hover:text-red-600 cursor-pointer'>Cancel</p>
                  <button className={`px-3 py-1.5 rounded-md text-white text-sm font-medium text-center ${getStatusClass(item.status)}`}>{item.status}</button>
                </div>
                
              </div> 
              <hr />
              </>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Order
