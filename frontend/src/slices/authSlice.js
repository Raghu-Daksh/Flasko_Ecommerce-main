import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { backendApi } from '../utils/paytm';
import { getUser, removeUser, saveUser } from '../utils/authStorage';

export const loginUserAuth = createAsyncThunk('loginUserAuth', async(userDetail, {rejectWithValue})=>{
try {
        console.log(userDetail);
        const response =  await axios.post(`${backendApi}/api/login`, userDetail, {
        withCredentials: true   // ONLY this works
    });   
    console.log(response.data.findUser);
    return response.data.findUser
    
    } catch (error) {
        console.log("error while calling api", error);
         return rejectWithValue(error.response?.data?.message);
    }
})

export const registerUser = createAsyncThunk('registerUser', async(userDetails,{rejectWithValue})=>{
    console.log(userDetails);
    try {  
       return await axios.post(`${backendApi}/api/register`, userDetails);   
    } catch (error) {
        console.log("error while calling api", error);
        return rejectWithValue(error.response?.data?.message);
    }
})

const  initialState = {        
        auth: getUser() || null,
        loading:false,
        error:null
    }

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout: (state)=>{
            state.auth = null
            removeUser();
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(loginUserAuth.fulfilled, (state, action)=>{
            state.error = null
            state.loading= false
            state.auth = action.payload
            saveUser(action.payload)
        })
        builder.addCase(loginUserAuth.pending, (state, action)=>{
            state.error = null
            state.loading= true
        })
        builder.addCase(loginUserAuth.rejected, (state, action)=>{
            state.error = null
            state.loading= false
        })  

        // builder.addCase(registerUser.fulfilled, (state, action)=>{
        //       state.error = null
        //         state.loading= false
        //         state.auth = {}
        // })
        // builder.addCase(registerUser.pending, (state, action)=>{
        //     state.error = null
        //     state.loading= true
        // })
        // builder.addCase(registerUser.rejected, (state, action)=>{
        //     state.error = null
        //     state.loading= false
        // })
    }
})

export const  {logout} = authSlice.actions
export default authSlice.reducer;