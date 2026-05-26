import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { food_list } from "../assets/assets";
import { increaseItemQuantity, decreaseItemQuantity } from "../redux/CardSlice";

const TopDishes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
console.log(cart);
  // Render star ratings
  const renderStars = (rating) => {
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
      stars.push(<BsStarFill key={`empty-${i}`} className="text-orange-600" />);
    }
    
    return stars;
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our <span className="text-orange-600">Best Sellers</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the dishes our customers love the most
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {food_list.slice(27,35).map((dish) => {
            const cartItem = cart.find((item) => item.id === dish._id);
            const itemQuantity = cartItem ? cartItem.itemQuantity : 0;

            return (
              <div 
                key={dish._id}
                className="w-full h-[460px] flex flex-col items-center gap-3 shadow-lg rounded-xl bg-white 
                          hover:scale-[1.02] hover:shadow-xl transition-all duration-300 ease-in-out
                          border border-gray-100 overflow-hidden group"
              >
                {/* Image Container */}
                <div className="h-[55%] w-full overflow-hidden relative">
                  <img 
                    src={dish.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={`Image of ${dish.name}`} 
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-sm">
                    <span className="text-yellow-500 text-sm font-bold"></span>
                    <FaStar className="text-yellow-500 ml-1" />
                  </div>
                </div>

                {/* Content Container */}
                <div className="w-full p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-gray-800 line-clamp-1">{dish.name}</h3>
                    <div className="flex">
                      {renderStars(dish.rating)}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish.description}</p>

                  <div className="mt-auto">
                    {/* Price and Quantity Controls */}
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-bold text-2xl text-orange-600">₹{dish.price}</p>
                      <div className="flex items-center gap-2">
                        <button 
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200" 
                          onClick={() => dispatch(decreaseItemQuantity(dish._id))} 
                          disabled={itemQuantity === 0}>
                          <FaMinus size={12} />
                        </button>
                        <span className="text-lg font-bold w-6 text-center">{itemQuantity}</span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white transition-all duration-200" 
                          onClick={() => dispatch(increaseItemQuantity(dish._id))}>
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
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/menu")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 transition-colors duration-300"
          >
            View Full Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDishes;