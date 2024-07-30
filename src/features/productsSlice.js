import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const indexExists = state.cartItems.findIndex(product => product.id === action.payload.id)
            if(indexExists >= 0) {
                state.cartItems[indexExists].quantity += 1
            } else {
                const newProduct = {...action.payload, quantity: 1}
                state.cartItems.push(newProduct)
            }
        },
        removeFromCart: (state, action) => {
            const newCartItems = state.cartItems.filter(product => product.id !== action.payload)
            state.cartItems = newCartItems
        },
        decreaseCartQuantity: (state, action) => {
            const indexExists = state.cartItems.findIndex(product => product.id === action.payload)
            if(state.cartItems[indexExists].quantity > 1) {
                state.cartItems[indexExists].quantity -= 1
            } else if (state.cartItems[indexExists].quantity === 1){
                const newCartItems = state.cartItems.filter(product => product.index !== action.payload)
                state.cartItems = newCartItems
            }
        },
        clearCart: (state) => {
            state.cartItems = []
        },
        getTotalQuantity: (state) => {
            let {total, cartQquantity} = state.cartItems.reduce((cartTotal, cartItem) => {
                const {price, quantity} = cartItem
                const itemTotal = price * quantity
                cartTotal.total += itemTotal
                cartTotal.cartQquantity += quantity
                return cartTotal
            }, {
                total: 0,
                cartQquantity: 0
            })
            state.cartTotalQuantity = cartQquantity
            state.cartTotalAmount = total
        },
    }
})

export default cartSlice.reducer
export const { addToCart, removeFromCart, decreaseCartQuantity, getTotalQuantity, clearCart } = cartSlice.actions