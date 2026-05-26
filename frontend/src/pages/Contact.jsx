import { useContext, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Contact = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const {backendUrl} = useContext(AppContext);


  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post(backendUrl+'/api/user/send-message', {name, email, message});

      if(data.success){
        toast.success(data.message);
        setName('');
        setEmail('');
        setMessage('');
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  }


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4 mt-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="md:flex">
          {/* Animated Illustration Side */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-orange-400 md:w-1/3 p-8 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-white text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
              <p className="text-orange-100">We'd love to hear from you!</p>
            </motion.div>
          </motion.div>

          {/* Form Side */}
          <div className="md:w-2/3 p-8">
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-orange-400 mb-6"
            >
              Get in Touch
            </motion.h1>

            <form onSubmit={submitHandler}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4"
              >
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  required
                ></textarea>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
