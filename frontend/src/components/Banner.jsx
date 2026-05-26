import { useEffect, useState } from 'react';
import { assets, imageGallary } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle images every 2 seconds (2000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % imageGallary.length
      );
    }, 3000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const currentImage = imageGallary[currentImageIndex].image;

  return (
    <div
      className='min-h-[520px] overflow-hidden mt-6 rounded-[2rem] relative transition-all duration-1000 ease-in-out shadow-[0_28px_80px_rgba(82,47,12,0.22)]'
      style={{
        backgroundImage: `url(${currentImage? currentImage : assets.header_6})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="flex flex-col items-start absolute bottom-[12%] gap-4 max-w-[680px] left-[6vw] pr-6">
        <p className='rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-orange-100 backdrop-blur'>Fresh, fast, and full of flavor</p>
        <h2 className='max-w-2xl text-4xl font-bold leading-tight text-white md:text-6xl'>Order your favourite food here</h2>
        <p className='max-w-xl text-sm leading-6 text-white/90 md:block'>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your craving and elevate your dining experience, one delicious meal at a time.
        </p>
        <button
          className='px-6 py-3 bg-white text-black rounded-full mt-2 font-semibold shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300'
          onClick={() => {
            navigate('/menu');
            scrollTo(0, 0);
          }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Banner;
