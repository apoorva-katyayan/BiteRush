import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { assets } from '../assets/assets';

const Profile = () => {
  const { userData, setUserData, loadUserProfileData, token, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('fullName', userData.fullName);
      formData.append('phone', userData.phone);
      formData.append('address', userData.address);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);
      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('Error in updating profile');
    }
  };

  return userData && (
    <div className="max-w-xl mx-auto mt-12 min-h-[60vh] lg:min-h-[82vh]">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 border border-orange-100">
        <div className="relative group mb-2">
          <label htmlFor="image" className="cursor-pointer block">
            <div className="w-36 h-36 rounded-full border-4 border-orange-200 shadow-md overflow-hidden flex items-center justify-center bg-gray-50 hover:opacity-80 transition-all">
              <img
                className="object-cover w-full h-full"
                src={isEdit ? (image ? URL.createObjectURL(image) : (userData.image || assets.profile_icon)) : (userData.image || assets.profile_icon)}
                alt="Profile"
              />
              {isEdit && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-semibold">Change Photo</span>
                  <span className="text-white text-xs">(optional)</span>
                </div>
              )}
            </div>
            {isEdit && (
              <input
                onChange={e => setImage(e.target.files[0])}
                type="file"
                id="image"
                accept="image/*"
                hidden
              />
            )}
          </label>
        </div>
        <div className="flex flex-col items-center w-full">
          {isEdit ? (
            <input
              className="bg-gray-50 text-2xl font-semibold outline-none max-w-60 mt-2 border rounded px-3 text-center"
              type="text"
              value={userData.fullName}
              onChange={event => setUserData(prev => ({ ...prev, fullName: event.target.value }))}
              placeholder="Full Name"
            />
          ) : (
            <p className="font-semibold text-2xl text-neutral-800 mt-2">{userData.fullName}</p>
          )}
          <p className="text-neutral-500 text-sm mt-1">Member since {userData.createdAt && userData.createdAt.slice(0, 10)}</p>
        </div>
        <hr className="bg-orange-200 h-[2px] border-none w-full my-4" />
        <div className="w-full">
          <p className="text-neutral-500 font-semibold mb-2">Contact Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
            <p className="font-medium">Email:</p>
            <p className="text-blue-500 break-all">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52 outline-none px-2 rounded"
                type="text"
                value={userData.phone}
                onChange={event => setUserData(prev => ({ ...prev, phone: event.target.value }))}
                placeholder="Phone"
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <textarea
                rows={2}
                className="bg-gray-100 outline-none px-2 rounded py-2"
                value={userData.address || ''}
                onChange={event => setUserData(prev => ({ ...prev, address: event.target.value }))}
                placeholder="Address"
              />
            ) : (
              <p className="text-gray-500">{userData.address}</p>
            )}
          </div>
        </div>
        <div className="w-full mt-4">
          <p className="text-neutral-500 font-semibold mb-2">Basic Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100 outline-none px-2"
                onChange={event => setUserData(prev => ({ ...prev, gender: event.target.value }))}
                value={userData.gender}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            <p className="font-medium">Date of Birth:</p>
            {isEdit ? (
              <input
                className="max-w-28 outline-none bg-gray-100 px-2"
                type="date"
                value={userData.dob}
                onChange={event => setUserData(prev => ({ ...prev, dob: event.target.value }))}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          {isEdit ? (
            <>
              <button
                className="border border-orange-400 px-8 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
                onClick={updateUserProfileData}
              >
                Save
              </button>
              <button
                className="border border-gray-300 px-8 py-2 rounded-full hover:bg-gray-200 transition-all duration-300"
                onClick={() => { setIsEdit(false); setImage(false); }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="border border-orange-400 px-8 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

