import axios from 'axios';
import { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';


export const AppContext = createContext();

const AppContextProvider = (props) => {

    
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [currState, setCurrState] = useState('takeaway');
    const [items, setItems] = useState([]);
    const [loader, setLoader] = useState(false);
    const [loader_2, setLoader_2] = useState(false);

    const [messages, setMessages] = useState([]);


    const [userData, setUserData] = useState(false);

    const [orders, setOrders] = useState([]);

    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/user/profile', {headers:{token}});
            if(data.success){
                setUserData(data.profile);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong! Please try again.");
        }
    }

    const getAllItems = async () => {
        try {
            setLoader_2(true);
            setTimeout(() => {
                
            })
            const {data} = await axios.get(backendUrl+'/api/common/get-items')
            if(data.success){
                setItems(data.Items);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong! Please try again.");
        } finally {
            setLoader_2(false);
        }
    }

    const getAllMessages = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/common/all-messages');
            console.log(data);
            if(data.success){
                setMessages(data.messages);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong! Please try again.");
        }
    }

    const getAllOrders = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/user/get-order', {headers:{token}});

            if(data.success){
                setOrders(data.orders);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong! Please try again.");
        }
    }


    useEffect(() => {
        getAllItems();
    }, []);

    useEffect(() => {
        if(token){
            loadUserProfileData()
        } else{
            setUserData(false);
        }
    }, [token])

    const value = {
        token, setToken,
        backendUrl,
        currState, setCurrState,
        items,
        userData, setUserData, loadUserProfileData,
        orders, getAllOrders,
        loader, setLoader,
        loader_2,
        messages, getAllMessages,
    }

    return <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider;