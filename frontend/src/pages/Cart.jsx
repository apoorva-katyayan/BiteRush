import { useContext, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

const Cart = () => {

  const {getTotalCartAmount, cartItems, removeFromCart, setOrderItems} = useContext(StoreContext);
  const navigate = useNavigate();

  const {currState, setCurrState, items} = useContext(AppContext);

  const promoError = () =>{
    toast.error('Invalid Promo code')
  }

  const f = () => {
    let allItems = ""
    for(const item in cartItems){
      if(cartItems[item] > 0){
  const itemInfo = items.find((product) => String(product.id) === String(item));
        if (itemInfo) {
          allItems += itemInfo.name + " -> " + cartItems[item] + ",  ";
        }
      }
    }
    setOrderItems(allItems);
  }

  useEffect(() => {
    f();
  }, [])


  return (
    getTotalCartAmount() === 0 ? 
    <div className='flex justify-center gap-2 items-center min-h-[54vh] lg:min-h-screen'> 
      <p className='text-lg font-light'>Cart is Empty add Some Item</p>
      <span className='text-orange-400 text-lg font-medium underline hover:text-orange-600 duration-300 cursor-pointer' onClick={()=>{navigate('/menu'); scrollTo(0, 0)} }>View Menu</span>
    </div>
    :
    <div className='mt-10 px- md:px-14 min-h-[52vh] lg:min-h-[82vh]'>
        <div className="">
          <div className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr] md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr]">
            <p className='hidden md:block'>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p className='hidden md:block'>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {items.map((item, index) => {
            if(cartItems[String(item.id)]>0){
              return (
              <div className='flex flex-col' key={index}>
                <div className='grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr] md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center py-2'>
                  <img className='w-10 h-10 rounded-md hidden md:block' src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p className='px-5'>{cartItems[item.id]}</p>
                  <p className='hidden md:block'>₹{item.price*cartItems[item.id]}</p>
                  <p onClick={()=> removeFromCart(item.id)} className='cursor-pointer px-5 text-red-600'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>

      <div className='flex justify-start mt-20'>
        <button onClick={()=>setCurrState('dinein')} className={`px-6 py-1.5 text-center border-[1px] rounded-l-md ${currState === 'dinein' ? 'bg-orange-400 hover:bg-orange-600 duration-300 text-white' : ''}`}>Dine-In</button>
        <button onClick={()=>setCurrState('takeaway')} className={`px-6 py-1.5 text-center border-[1px] rounded-r-md ${currState === 'takeaway' ? 'bg-orange-400 hover:bg-orange-600 duration-300 text-white' : ''}`}>Takeaway</button>
      </div>

      <div className='mt-5 flex flex-col md:flex-row justify-between gap-14'>
        <div className="flex flex-1 flex-col gap-5">
          <h2>Cart Totals</h2>
          <div className='flex flex-col gap-3'>
            <div className="flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            { currState === 'takeaway' &&
              <div className="flex justify-between text-[#555]">
                <p>Packing Fee</p>
                <p>₹15</p>
              </div>
              
            }
            {currState === 'takeaway' && <hr />}
            <div className="flex justify-between text-[#555]">
                <p>Gst & Taxes</p>
                <p>₹12</p>
            </div>
            <hr />
            <div className="flex justify-between text-[#555]">
              <b>Totals</b>
              <b>₹{(currState == 'takeaway' ? 15 : 0)+ getTotalCartAmount() + 12}</b>
            </div>
          </div>
            <button className='bg-orange-400 text-white px-6 py-1.5 rounded-md hover:bg-orange-600 duration-500' onClick={()=>navigate('/order')}>PROCEED TO CKECKOUT</button>
          </div>
        <div className="flex-1">
          <div>
            <p className='text-[#555]'>If you have a promo code, Enter it here</p>
            <div className="mt-2 flex justify-between items-center rounded-md bg-[#eaeaea]">
              <input className='outline-none px-3 py-1.5 rounded-md bg-transparent w-full' type="text" placeholder='promo code'/>
              <button onClick={promoError} className='px-7 py-1.5 bg-black text-white border-none rounded-md'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
