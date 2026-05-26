import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { FiUser } from 'react-icons/fi';

const Message = () => {
  const { message, getMessage } = useContext(AppContext);

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User Messages</h1>

      {message?.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {message?.map((msg) => (
            <div
              key={msg._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FiUser className="text-gray-600 text-lg" />
                  <h2 className="text-lg font-semibold text-gray-800">{msg.name}</h2>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-blue-600 mb-1">{msg.email}</p>
              <p className="text-gray-700">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Message;
