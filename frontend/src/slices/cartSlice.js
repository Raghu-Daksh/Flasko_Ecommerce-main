import {createSlice} from '@reduxjs/toolkit'

const itemsInCart = localStorage.getItem('cart')

const initialState = {
    cartItems: itemsInCart && itemsInCart !== undefined  ? JSON.parse(itemsInCart) : [],
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem : (state, action)=>{ 

            if(state.cartItems.length < 10){
                const item = action.payload;
                const existingItem = state.cartItems.find((i)=>i.id === item.id)

                if(existingItem){
                    console.log( existingItem.quantity);                
                    existingItem.quantity += 1;
                }else{
                    state.cartItems.push({...item, quantity:1})
                }
               localStorage.setItem('cart', JSON.stringify(state.cartItems))
            }
        },
        decQty: (state,action)=>{
            const item = action.payload
            const existingItem = state.cartItems.find((i)=>i.id === item.id)

            if(existingItem){
                if(existingItem.quantity < 2){
                    state.cartItems = state.cartItems.filter(i=>i.id !== item.id)
                }else{
                    existingItem.quantity -= 1;
                }
                localStorage.setItem('cart', JSON.stringify(state.cartItems))
            }
        },
        removeItem : (state, action)=>{
            const item = action.payload
           state.cartItems = state.cartItems.filter(i=>i.id !== item.id)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        }
    }
});

export const {addItem, removeItem,decQty} = cartSlice.actions
export default cartSlice.reducer