import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';


const Signin = () => {

  const [currState, setCurrState] = useState("Login");
  const [isTicked, setIsTicked] = useState(false);

  const {setToken, backendUrl, loader, setLoader} = useContext(AppContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const authHandler = async (event) => {
    event.preventDefault();
    if(!isTicked){
      toast.error('Please agree the Term & Condition');
      return;
    }
    try {
      setLoader(true);
      if(currState == 'Login'){
        const {data} = await axios.post(backendUrl+'/api/user/login', {email, password});

        if(data.success){
          setToken(data.token);
          localStorage.setItem('token', data.token);
          toast.success(data.message);
          navigate('/');
        } else{
          toast.error(data.message);
        }
      } else{
        const {data} = await axios.post(backendUrl+'/api/user/signup', {fullName, email, password});

        if(data.success){
          setToken(data.token);
          localStorage.setItem('token', data.token);
          toast.success(data.message);
          navigate('/');
        } else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again.");
    } finally{
      setLoader(false);
    }
  }

  return (
    <div className='h-[90vh] flex justify-center items-center'>
      <form className='w-full md:w-[60%] lg:w-[30%] flex flex-col gap-4 px-8 py-6 shadow-md rounded-lg'>
        <h2 className='text-orange-500 font-semibold text-[20px]'>{currState}</h2>
        <div className="flex flex-col w-full gap-5">
            {currState==="Login"?<></>:<input onChange={(e)=>setFullName(e.target.value)} className='border-[1px] px-3 py-2 rounded-md outline-none border-[#16161c]' type="text" placeholder='Your name' required/>}
            <input onChange={(e)=>setEmail(e.target.value)} className='border-[1px] border-[#16161c] px-3 py-2 rounded-md outline-none ' type="email" placeholder='Your email' required/>
            <input onChange={(e)=>setPassword(e.target.value)} className='border-[1px] px-3 py-2 rounded-md outline-none border-[#16161c]' type="password" placeholder='Password' required/>
        </div>
        {loader ? <button className='rounded-md flex justify-center items-center py-3'><Loader /></button> : <button onClick={authHandler} className='px-8 py-2 rounded-md bg-orange-400 hover:bg-orange-600 transition-all duration-300'>{currState==="Sign Up"?"Create account":"Login"}</button>}
        
        <div className="flex items-start gap-2">
            <input onClick={()=>setIsTicked(true)} className='cursor-pointer mt-1.5' type="checkbox" required/>
            <p className='text-[#848684ee]'>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"?<p className='pl-2'>Create a new account? <span className='text-orange-500 font-light cursor-pointer' onClick={() => setCurrState("Sign Up")}>Click here</span></p>:<p className=' pl-2'>Already have an account? <span className='text-orange-500 font-light cursor-pointer' onClick={() => setCurrState("Login")}>Login here</span></p>}
        
      </form>
    </div>
  )
}

export default Signin
