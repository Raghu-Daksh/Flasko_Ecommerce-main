import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendApi } from "../utils/paytm";


export const fetchProducts = createAsyncThunk('products', async ()=>{
    try {
        const fetchData = await axios.get(`${backendApi}/api/products`)
        return fetchData.data        
    } catch (error) {
            console.log(error);            
    }
})

export const searchProducts = createAsyncThunk('searchProducts', async(query)=>{
    try {
        console.log(query);
        
        const fetchData = await axios.get(`${backendApi}/api/products/search/${query}`)
        console.log(fetchData);
        return fetchData.data   
        
    } catch (error) {
        console.log(error);
        
    }
})
export const productsDetails = createAsyncThunk('productsDetails', async(_id)=>{
    try {
        console.log(_id);
        
        const fetchData = await axios.get(`${backendApi}/api/products/product_details/${_id}`)
        console.log(fetchData.data);
        return fetchData.data   
        
    } catch (error) {
        console.log(error);
        
    }
})
export const filteredProducts = createAsyncThunk('filteredProducts', async(query)=>{
    try {
        console.log(query);        
        const fetchData = await axios.get( `${backendApi}/api/products/filterData?query=${query}`)
        console.log(fetchData);
        return fetchData.data   
        
    } catch (error) {
        console.log(error);
        
    }
})
export const sortedProducts = createAsyncThunk('sortedProducts', async(query)=>{
    try {
        const fetchData = await axios.get(`${backendApi}/api/products/sortedproducts?query=${query}`)
        console.log(fetchData);
        return fetchData.data   
        
    } catch (error) {
        console.log(error);
        
    }
})

const initialState = {
    productsData:[],
    sortedProductsData:[],
    productDetail:{},
    loading:false,
    error:null,
    productFilter : 'All'
}

const productSlice = createSlice({
    name:'proucts',
    initialState,
    reducers:{
        setProductFilter : (state, action)=>{
            state.productFilter = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.productsData = action.payload
        })
        builder.addCase(searchProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.productsData = action.payload
        })
        builder.addCase(filteredProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.productsData = action.payload
        })
        builder.addCase(sortedProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.sortedProductsData = action.payload
        })
        builder.addCase(productsDetails.fulfilled, (state, action)=>{
            state.loading = false
            state.productDetail = action.payload
        })
    }
})

export const {setProductFilter} = productSlice.actions
export default productSlice.reducer