import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cartItems')) || {};
        } catch {
            return {};
        }
    });
    const {items} = useContext(AppContext);

    const [orderItems, setOrderItems] = useState('');

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]:1}));
        } else{
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const nextQuantity = (prev[itemId] || 0) - 1;
            if (nextQuantity <= 0) {
                const next = {...prev};
                delete next[itemId];
                return next;
            }
            return {...prev, [itemId]: nextQuantity};
        });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = items.find((product)=>String(product.id) === String(item));
                let price = Number(itemInfo?.price);
                if (!isNaN(price)) {
                    totalAmount += price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const value  = {
        cartItems, setCartItems,
        addToCart, removeFromCart, getTotalCartAmount,
        orderItems, setOrderItems
    }

    return <StoreContext.Provider value={value}>
            {props.children}
    </StoreContext.Provider>
}

export default StoreContextProvider
