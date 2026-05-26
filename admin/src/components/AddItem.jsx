import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import uploadarea from '../assets/uploadarea.png'


const AddItem = () => {
    const categories = ['Salad', 'Rolls', 'Sweets', 'Starters', 'Noodles', 'Pasta', 'Pizza', 'Cake', 'Beverages', 'Rice Bowl', 'Snacks'];

    const [image, setImage] = useState('');
    const [name, setName]   = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc]   = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [foodType, setFoodType] = useState('veg');

    const {backendUrl, aToken} = useContext(AppContext);

    const addItemHandeler = async (event) => {
        event.preventDefault();
        try {
            const formdata = new FormData;
            formdata.append('image', image);
            formdata.append('name', name);
            formdata.append('price', price);
            formdata.append('desc', desc);
            formdata.append('category', category);
            formdata.append('foodType', foodType);

            const {data} = await axios.post(backendUrl+'/api/admin/add-item', formdata, {headers:{ atoken: aToken }});
            console.log(data)
            if(data.success){
                toast.success(data.message);
                setImage('');
                setName('');
                setDesc('');
                setPrice('');
                setCategory(categories[0]);
                setFoodType('veg');
            } else{
                toast.error(data.message); 
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong! Please try again.");
        }
    }

  return (
    <form className='m-5 w-full h-[90vh] overflow-y-scroll'>
        <p className='text-xl font-semibold'>Add Item</p>
        <div className='flex flex-col items-center gap-5 mt-5'>

            <div className='flex flex-col items-center'>
                <label htmlFor="item-img">
                    <img className='w-40 h-40 border-[1px] rounded-xl cursor-pointer' src={image ? URL.createObjectURL(image) : uploadarea} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='item-img' hidden/>
                <p className='text-orange-500 text-[15px]'>Upload Here</p>
            </div>

            <div className='w-full md:w-[80%] lg:w-[50%] flex flex-col gap-6'>
                <div className='flex flex-col gap-1'>
                    <p className='text-orange-500 text-[15px]'>Item's Category</p>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className='border-[1px] px-4 py-3 bg-transparent border-[#595959] rounded-lg outline-none tracking-wider text-gray-400' type="text"  placeholder='Enter the Name' required>
                        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-orange-500 text-[15px]'>Food Type</p>
                    <div className='flex rounded-full bg-orange-50 p-1'>
                        <button type='button' onClick={() => setFoodType('veg')} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${foodType === 'veg' ? 'bg-green-500 text-white' : 'text-stone-700'}`}>Pure Veg</button>
                        <button type='button' onClick={() => setFoodType('non-veg')} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${foodType === 'non-veg' ? 'bg-red-500 text-white' : 'text-stone-700'}`}>Non-Veg</button>
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='text-orange-500 text-[15px]'>Item's Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className='border-[1px] px-4 py-3 bg-transparent border-[#595959] rounded-lg outline-none tracking-wider text-gray-400' type="text"  placeholder='Enter the Name' required/>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='text-orange-500 text-[15px]'>Item's Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='border-[1px] px-4 py-3 bg-transparent border-[#595959] rounded-lg outline-none tracking-wider text-gray-400' type="number"  placeholder='Enter the Price' required/>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='text-orange-500 text-[15px]'>Item's desc</p>
                    <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className='border-[1px] px-4 py-3 bg-transparent border-[#595959] rounded-lg outline-none tracking-wider text-gray-400' type="text"  placeholder='Enter the Description' required/>
                </div>

                <div className='flex justify-center w-full'>
                    <button onClick={addItemHandeler} className='px-5 py-1.5 bg-orange-500 rounded-md' type='submit'>Submit</button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AddItem
