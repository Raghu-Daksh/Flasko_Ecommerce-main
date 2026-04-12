import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendApi } from "../utils/paytm";


export const fetchProducts = createAsyncThunk('products', async(_,  { rejectWithValue })=>{
    try {
        const fetchData = await axios.get(`${backendApi}/api/products`)
        console.log(fetchData);
        
        return fetchData.data        
    } catch (error) {
            console.log(error);  
            return rejectWithValue(error.response.data)          
    }
})

export const searchProducts = createAsyncThunk('searchProducts', async(query, { rejectWithValue })=>{
    try {
        console.log(query);
        
        const fetchData = await axios.get(`${backendApi}/api/products/search/${query}`)
        console.log(fetchData);
        return fetchData.data   
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})
export const productsDetails = createAsyncThunk('productsDetails', async(_id, { rejectWithValue })=>{
    try {
        console.log(_id);
        
        const fetchData = await axios.get(`${backendApi}/api/products/product_details/${_id}`)
        console.log(fetchData.data);
        return fetchData.data   
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})
export const filteredProducts = createAsyncThunk('filteredProducts', async(query, { rejectWithValue })=>{
    try {
        console.log(query);        
        const fetchData = await axios.get( `${backendApi}/api/products/filterData?query=${query}`)
        console.log(fetchData);
        return fetchData.data   
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})
export const sortedProducts = createAsyncThunk('sortedProducts', async(query, { rejectWithValue })=>{
    try {
        const fetchData = await axios.get(`${backendApi}/api/products/sortedproducts?query=${query}`)
        console.log(fetchData);
        return fetchData.data   
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
        
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
        builder
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.productsData = action.payload.data
        })
        .addCase(fetchProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(fetchProducts.pending, (state, action)=>{
            state.loading = true
        })
        
        .addCase(searchProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.productsData = action.payload.data
        })
         .addCase(searchProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(searchProducts.pending, (state, action)=>{
            state.loading = true
        })
        
        .addCase(filteredProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.productsData = action.payload.data
        })
                 .addCase(filteredProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(filteredProducts.pending, (state, action)=>{
            state.loading = true
        })

        .addCase(sortedProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.sortedProductsData = action.payload.data
        })
           .addCase(sortedProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(sortedProducts.pending, (state, action)=>{
            state.loading = true
        })

        .addCase(productsDetails.fulfilled, (state, action)=>{
            state.loading = false
            state.productDetail = action.payload.data
        })
           .addCase(productsDetails.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(productsDetails.pending, (state, action)=>{
            state.loading = true
        })
    }
})

export const {setProductFilter} = productSlice.actions
export default productSlice.reducer