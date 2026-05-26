import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseItemQuantity, decreaseItemQuantity } from "../redux/CardSlice";
import { useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

const Card1 = ({ id, name, image, desc, price, rating = 5 }) => { 
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const item = cart.find((item) => item.id === id);
  const itemQuantity = item ? item.itemQuantity : 0;
  const navigate = useNavigate();

  // Render star ratings
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" className="text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStarFill key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="w-[300px] h-[460px] flex flex-col items-center gap-3 shadow-lg rounded-xl bg-white 
                    hover:scale-[1.02] hover:shadow-xl transition-all duration-300 ease-in-out
                    border border-gray-100 overflow-hidden group">
      
      {/* Image Container with Hover Effect */}
      <div className="h-[55%] w-full overflow-hidden relative">
        <img 
          src={image} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={`Image of ${name}`} 
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-sm">
          <span className="text-yellow-500 text-sm font-bold">{rating.toFixed(1)}</span>
          <FaStar className="text-yellow-500 ml-1" />
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-gray-800 line-clamp-1">{name}</h3>
          <div className="flex">
            {renderStars()}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{desc}</p>

        <div className="mt-auto">
          {/* Price and Quantity Controls */}
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-2xl text-orange-600">₹{price}</p>
            <div className="flex items-center gap-2">
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200" 
                onClick={() => dispatch(decreaseItemQuantity(id))} 
                disabled={itemQuantity === 0}>
                <FaMinus size={12} />
              </button>
              <span className="text-lg font-bold w-6 text-center">{itemQuantity}</span>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white transition-all duration-200" 
                onClick={() => dispatch(increaseItemQuantity(id))}>
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* Order Button */}
          <button 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg 
                      hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium
                      shadow-md hover:shadow-orange-200 flex items-center justify-center gap-2"
            onClick={() => navigate("/cart")}>
            <span>Order Now</span>
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card1;