import React from "react";
import { menu_list } from "../assets/assets";

const ExploreMenu = ({ Updated_food_list }) => {
  return (
    <div className="mt-5 w-full flex flex-col p-5 gap-5 justify-center items-center">
       <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-orange-600">
          Explore Our Menu
        </h1>
        <p className="text-gray-700 text-sm md:text-lg max-w-3xl mx-auto mt-2 md:mt-4 px-2 md:px-6">
          Welcome to MyRestaurant, where passion meets flavor! Indulge in our delicious dishes crafted with fresh ingredients.
        </p>
      </div>

      {/* Menu items - only adjusted image sizes for large screens */}
      <div className="w-full overflow-auto lg:whitespace-nowrap flex gap-5 p-2 scrollbar-hide">
        {menu_list.map((item, index) => (
          <div
            onClick={() => Updated_food_list(item.menu_name)}
            key={index}
            className="min-w-[120px] lg:min-w-[170px] flex flex-col items-center justify-center"
          >
            <div className="w-25 h-25 md:w-20 md:h-20 lg:w-32 lg:h-32 rounded-full border-2 cursor-pointer 
                          transform transition-transform duration-300 ease-in-out hover:scale-105 
                          hover:shadow-xl border-amber-50 shadow-lg overflow-hidden">
              <img
                src={item.menu_image}
                className="w-full h-full object-cover rounded-full"
                alt={item.menu_name}
              />
            </div>
            <p className="text-center font-medium text-sm sm:text-base mt-2">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;