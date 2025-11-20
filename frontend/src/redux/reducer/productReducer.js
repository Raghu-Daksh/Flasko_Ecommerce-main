import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  SET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_SUCCESS,
  SET_PRODUCT_LIST,
  SET_SEARCH_PRODUCTS,
  PRODUCT_LIST,
  GET_SORT_PRODUCTS_SUCCESS,
  GET_FILTER_PRODUCTS_SUCCESS,
} from "../constants/constant";

// export const displayProductsReducer = (data=[], action)=>{
//     switch(action.type){
//         case SET_PRODUCT_LIST :
//             return [...action.data];
//         default :
//          return data
//     }
// }

// export const getProductDetailsReducer = (state = {product: {} }, action)=>{
//     console.log(action.data);
//     // console.log(action.type);
//     switch(action.type){
//         case SET_PRODUCT_DETAILS_SUCCESS:
//             return {
//                 product: action.data
//              }
//         default :
//             return state
//     }
// }
export const displayProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return { products: action.payload };
    case GET_PRODUCTS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
export const sortProductsReducer = (state = { products: [] }, action) => {
  
  switch (action.type) {
    case GET_SORT_PRODUCTS_SUCCESS:
      return { products: action.payload };
    default:
      return state;
  }
};
export const filterProductsReducer = (state = { products: [] }, action) => {
  
  switch (action.type) {
    case GET_FILTER_PRODUCTS_SUCCESS:
      return { products: action.payload };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const searchProductReducer = (result = [], action) => {
  console.log(action.type);
  console.log(result);
  switch (action.type) {
    case SET_SEARCH_PRODUCTS:
      console.log(action.result);
      return [action.result];
    default:
      return result;
  }
};
