import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Testimonials = () => {
    const { messages, getAllMessages } = useContext(AppContext);
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const scrollSpeed = 1;

    // Color palette for profile backgrounds
    const profileColors = [
        'bg-orange-500', 
        'bg-blue-500', 
        'bg-green-500', 
        'bg-purple-500', 
        'bg-pink-500',
        'bg-red-500',
        'bg-yellow-500',
        'bg-teal-500'
    ];

    useEffect(() => {
        getAllMessages();
    }, []);

    useEffect(() => {
        if (!messages.length || isHovered) return;

        const container = containerRef.current;
        let animationFrameId;
        let left = 0;

        const scroll = () => {
            left += scrollSpeed;
            
            if (left >= container.scrollWidth / 2) {
                left = 0;
            }
            
            container.scrollLeft = left;
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [messages.length, isHovered]);

    // Function to get two-letter initials
    const getInitials = (name) => {
        const names = name.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();
        
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        } else if (names[0].length > 1) {
            initials += names[0].substring(1, 2).toUpperCase();
        }
        
        return initials;
    };

    // Function to get random profile color
    const getProfileColor = (index) => {
        return profileColors[index % profileColors.length];
    };

    // Add some static reviews
    const staticReviews = [
        {
            name: 'Priya Sharma',
            email: 'priya.s@example.com',
            message: 'Absolutely loved the food! Great taste and quality. Will order again!',
        },
        {
            name: 'Rahul Verma',
            email: 'rahul.v@example.com',
            message: 'The best biryani I have had in a long time. Highly recommended!',
        },
        {
            name: 'Sneha Kapoor',
            email: 'sneha.k@example.com',
            message: 'Excellent service and delicious desserts. My kids loved it!',
        },
        {
            name: 'Amit Singh',
            email: 'amit.singh@example.com',
            message: 'Great value for money. The portions were generous and the flavors authentic.',
        },
    ];
    const duplicatedMessages = [...staticReviews, ...messages, ...staticReviews, ...messages];

    return (
        <div className="bg-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">What Our Customers Say</h2>
                
                <div 
                    ref={containerRef}
                    className="flex overflow-x-auto scrollbar-hide py-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ scrollBehavior: isHovered ? 'smooth' : 'auto' }}
                >
                    <div className="flex space-x-6 px-4">
                        {duplicatedMessages.map((testimonial, index) => (
                            <div 
                                key={`${testimonial.email}-${index}`} 
                                className="flex-shrink-0 w-80 bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <div className={`w-12 h-12 rounded-full ${getProfileColor(index)} flex items-center justify-center text-white text-lg font-bold mr-3`}>
                                        {getInitials(testimonial.name)}
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold text-gray-800">{testimonial.name}</h4>
                                        <p className="text-orange-500 text-xs">{testimonial.email}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">"{testimonial.message}"</p>
                                <div className="mt-3 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg 
                                            key={i} 
                                            className="w-4 h-4 text-orange-400" 
                                            fill="currentColor" 
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Testimonials;
