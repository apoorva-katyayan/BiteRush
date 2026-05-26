import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState([]);

    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        items: 0,
        revenue: 0,
    });

    const fetchStats = async () => {
        try {
          const {data} = await axios.get(backendUrl+'/api/admin/dashboard-data', {headers:{aToken}});
          if (data.success) {
            setStats(data.stats);
          } else{
            toast.error(data.message);
          }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong! Please try again.");
        }
      };
    
    useEffect(() => {
        fetchStats();
    }, []);

    const getAllItems = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/common/get-items')
            
            if(data.success){
                setItems(data.Items);
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
            const {data} = await axios.get(backendUrl+'/api/admin/all-orders', {headers:{aToken}});
            console.log(data);
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

    const getAllUsers = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/all-users', {headers:{aToken}});

            if(data.success){
                setUsers(data.users);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong! Please try again.");
        }
    }

    const getMessage = async () => {
        try {
           const {data} = await axios.get(backendUrl+'/api/admin/get-message', {headers:{aToken}});
            if(data.success){
                setMessage(data.messages);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong! Please try again.");
        }
    }

    const value = {
        backendUrl,
        aToken, setAToken,
        items, getAllItems,
        orders, getAllOrders,
        users, getAllUsers,
        stats,
        message, getMessage,
    }

    return <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider;