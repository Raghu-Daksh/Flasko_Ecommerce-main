import { combineReducers } from "redux";
import {  displayProductsReducer,sortProductsReducer,filterProductsReducer,  getProductDetailsReducer,searchProductReducer } from "./productReducer";
import { addToCartReducer } from "./cartReducer";

export default combineReducers({ 
     displayProductsReducer,
     getProductDetailsReducer,
     searchProductReducer,
     addToCartReducer,
     sortProductsReducer,
     filterProductsReducer
});
