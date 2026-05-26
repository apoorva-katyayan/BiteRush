import React from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../assets/heroVideo.mp4';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-[70vh] lg:h-[80vh] mt-12 lg:mt-4 flex items-center justify-center rounded-2xl shadow-lg overflow-hidden">
            {/* Video background with autoplay */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute w-full h-full object-cover"
            >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black opacity-40 lg:rounded-2xl"></div>
            
            {/* Content */}
            <div className="relative z-10 text-white p-6 text-left md:text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
                    Welcome to MyRestaurant
                </h1>
                <p className="text-lg md:text-2xl mb-8 animate-fade-in-up delay-100">
                    Delicious food made with love and passion
                </p>
                <button 
                    className="mt-6 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-200"
                    onClick={() => navigate("/menu")}
                >
                    View Menu
                </button>
            </div>
        </div>
    );
};

export default Header;