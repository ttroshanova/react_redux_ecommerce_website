import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/productsSlice'

export const store = configureStore({
    reducer: {
        cart: productsReducer,
    }
})