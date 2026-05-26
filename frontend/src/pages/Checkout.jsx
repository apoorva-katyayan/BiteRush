import { useContext, useState } from "react";
import RazorpayButton from "../components/RazorpayButton";
import { StoreContext } from "../context/StoreContext";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Checkout = () => {
  const { getTotalCartAmount, orderItems, setCartItems} = useContext(StoreContext);
  const { currState , userData, backendUrl, token} = useContext(AppContext);
  const navigate = useNavigate();
  const [pmode, setPMode] = useState("Online");


  const totalBill = getTotalCartAmount() + 12 + 15;

  const placeOrderHandler = async () => {
    try {
      if (!userData.address || !userData.phone) {
        toast.error('Kindly fill the address and Contact Details');
        return navigate('/profile');
      }
      const doc = {
        mode: currState,
        items: orderItems,
        totalPrice: totalBill,
        payment: pmode,
      };
      const { data } = await axios.post(backendUrl + '/api/user/place-order', doc, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  // Handler for successful Razorpay payment
  const handleRazorpaySuccess = async () => {
    // After payment, just clear cart and navigate (order already created)
    setCartItems({});
    toast.success('Payment successful! Order placed.');
    navigate('/orders');
  };

  return (
      <div className='mt-14 flex flex-col md:flex-row justify-between gap-14 w-full px-4 md:px-14 lg:px-28'>
        <div className="flex flex-1 flex-col gap-5">
          <h2 className='text-[25px] font-medium'>Cart Totals</h2>
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
              <b>₹{totalBill}</b>
            </div>
          </div>
            <div className='flex flex-col md:flex-row gap-8 items-center justify-between'>
              <div className='flex items-center'>
                <p className='text-[15px] mr-2 font-medium text-[#555]'>Select Payment Mode</p>
                <button onClick={()=>setPMode('Cash')} className={`px-6 py-1.5 text-center border-[1px] rounded-l-md ${pmode === 'Cash' ? 'bg-orange-400 hover:bg-orange-600 duration-300 text-white' : ''}`}>Cash</button>
                <button onClick={()=>setPMode('Online')} className={`px-6 py-1.5 text-center border-[1px] rounded-r-md ${pmode === 'Online' ? 'bg-orange-400 hover:bg-orange-600 duration-300 text-white' : ''}`}>Online</button>
              </div>
              {pmode === 'Online' ? (
                <RazorpayButton
                  amount={totalBill}
                  user={userData}
                  backendUrl={backendUrl}
                  token={token}
                  orderItems={orderItems}
                  currState={currState}
                  onSuccess={handleRazorpaySuccess}
                  onError={(msg) => toast.error(msg)}
                />
              ) : (
                <button className='bg-orange-400 text-white px-6 py-1.5 rounded-md hover:bg-orange-600 duration-500' onClick={placeOrderHandler}>PLACE ORDER</button>
              )}
            </div>
          </div>
        
      </div>
  );
};

export default Checkout;
