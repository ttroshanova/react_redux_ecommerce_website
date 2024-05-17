import { createContext, useState } from "react";

const UserContext = createContext();

export const ContextProvider = ({children}) => {
    const [items, setItems] = useState([]);

    const addToCart = (index, name, price, source) => {
        const productExists = items.find(item => item.index === index);
        if(productExists){
            setItems(items.map(item => (
                (item.index === index) 
                ? {...productExists, quantity: productExists.quantity + 1}
                : item
            )))
        } else {
            setItems((prevState) => [...prevState, {...{index, name, price, source}, quantity: 1}])
        }
    }

        const quantitySum = items.reduce((amountItems, item) => amountItems + item.quantity, 0)

    const removeFromCart = (product) => {
        const productExists = items.find(item => item.index === product.index);
        if(productExists.quantity === 1){
            setItems(items.filter(item => item.index !== product.index))
        } else {
            setItems(items.map(item => (
                item.index === product.index ? {...productExists, quantity: productExists.quantity - 1}
                :
                item
            )))
        }
    }

    return (
        <UserContext.Provider value={{ items, addToCart, setItems, removeFromCart, quantitySum }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;


