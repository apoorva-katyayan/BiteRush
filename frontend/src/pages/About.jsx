import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaLeaf, FaTruck, FaSmile } from "react-icons/fa";

const About = () => {
  const nagivate = useNavigate()

  return (
    <section className="bg-gradient-to-b from-orange-50 mt-8 to-white py-16 px-4 md:px-8 lg:px-16 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
            About <span className="text-gray-800">Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We bring delicious food to you, just like magic!
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold ml-4 text-gray-800">
                Freshly Prepared
              </h3>
            </div>
            <p className="text-gray-600">
              Enjoy your food hot and fresh, prepared just for you!
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold ml-4 text-gray-800">
                100+ Items
              </h3>
            </div>
            <p className="text-gray-600">
              Choose from the best local restaurants, cafes, and cloud kitchens. 🍔🍕
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold ml-4 text-gray-800">
                Safe & Secure
              </h3>
            </div>
            <p className="text-gray-600">
              Secure payments and hygiene checks for your safety. 🛡️
            </p>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"    onClick={()=>nagivate("/menu")}
          >
            Order Now 🚀
          </motion.button>
        </motion.div>
      </div>

      <section className="bg-gray-100 py-12 px-6 md:px-12 lg:px-24 mt-5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to <span className="font-semibold text-gray-800">BiteRush</span>, your go-to destination for delicious meals made fresh for you. 
          We believe in providing fresh, high-quality ingredients prepared with love and expertise to satisfy your cravings.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mt-4">
          Our journey started with a passion for great food and excellent service. Whether you're craving traditional flavors or something new,
          we’ve got a diverse menu to delight your taste buds. Order now and enjoy a seamless dining experience at home!
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mt-4">
          At <span className="font-semibold text-gray-800">BiteRush</span>, we prioritize customer satisfaction, hygiene, and quality.
          Our team of professional chefs and dedicated staff work tirelessly to bring you the best dining experience from the comfort of your home. 
          With our easy-to-use online ordering system, you can explore a variety of cuisines and customize your meals to your taste.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mt-4">
          We are committed to supporting local farmers and sourcing sustainable ingredients. Our goal is to create a positive impact on both our community and the environment. 
          Thank you for choosing us as your trusted food partner. Bon appétit!
        </p>
      </div>
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center">
          <FaUtensils className="text-4xl text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Quality Ingredients</h3>
          <p className="text-gray-600 mt-2">Fresh, locally sourced ingredients for a delicious experience.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center">
          <FaLeaf className="text-4xl text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Sustainability</h3>
          <p className="text-gray-600 mt-2">We support eco-friendly practices and local farmers.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center">
          <FaTruck className="text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Freshly Made</h3>
          <p className="text-gray-600 mt-2">Get your favorite meals made to order, hot and fresh.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center">
          <FaSmile className="text-4xl text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Customer Satisfaction</h3>
          <p className="text-gray-600 mt-2">Our priority is to make you happy with every bite.</p>
        </div>
      </div>
    </section>
    <section className="border-b pb-4 mt-5">
        {/* Delivery Information section removed */}
      </section>

      {/* Privacy Policy Section */}
      <section className="border-b pb-4">
        <h2 className="text-xl font-semibold mt-2">🔒 Privacy Policy</h2>
        <p className="text-gray-700 mt-2">
          Your privacy is important to us. We only collect necessary information such as your name and contact details to process your orders. We do not share your personal data with third parties. By using our service, you agree to our data handling practices.
        </p>
      </section>

      {/* Terms & Conditions Section */}
      <section>
        <h2 className="text-xl font-semibold mt-2">📜 Terms & Conditions</h2>
        <p className="text-gray-700 mt-2">
          By placing an order with us, you agree to our terms and conditions:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>Orders once confirmed cannot be canceled.</li>
          <li>We reserve the right to refuse service in case of fraudulent transactions.</li>
          {/* Delivery-related terms removed */}
        </ul>
      </section>
    </section>
  );
};

export default About;