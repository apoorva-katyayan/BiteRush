import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Users = () => {
  const { users, getAllUsers, aToken, backendUrl } = useContext(AppContext);

  useEffect(() => {
    getAllUsers(); // Fetch users on mount
  }, []);

  const deleteUsersHandler = async (userId) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/delete-users', {userId}, {headers:{aToken}});
      if(data.success){
        toast.success(data.message);
        getAllUsers();
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  }

  return (
    <div className="m-5 w-full h-screen overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map(user => (
            <div
              key={user._id}
              className="relative bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 hover:shadow-xl transition"
            >
              {/* Delete Button */}
              <button onClick={()=>deleteUsersHandler(user._id)} className="absolute top-3 right-3 p-1 bg-red-100 hover:bg-red-200 rounded-full">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>

              <img
                src={user.image || 'https://via.placeholder.com/80'}
                alt={user.fullName}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-800">{user.fullName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
                <p className="text-sm text-gray-500">{user.address}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
