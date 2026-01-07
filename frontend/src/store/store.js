import {configureStore} from '@reduxjs/toolkit'
import cartReducer from '../slices/cartSlice'
import authReducer from '../slices/authSlice'
import productsReducer from '../slices/productSlice'

 const store = configureStore({
    reducer:{
        cart: cartReducer,
        products: productsReducer,
        auth: authReducer,
    }
})


export default store