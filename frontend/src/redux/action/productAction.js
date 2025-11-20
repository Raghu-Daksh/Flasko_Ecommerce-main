import { backendApi } from "../../utils/paytm";
import {
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST,
  GET_PRODUCTS_FAIL,
  SEARCH_PRODUCTS,
  GET_SORT_PRODUCTS_REQUEST,
  GET_SORT_PRODUCTS_SUCCESS,
  GET_FILTER_PRODUCTS_REQUEST,
  GET_FILTER_PRODUCTS_SUCCESS,
} from "../constants/constant";
import axios from 'axios'

export const productListAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${backendApi}/api/products`);
    dispatch({ type: PRODUCT_LIST, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response });
  }
};

export const productDetailsAction = (_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${backendApi}/api/products/product_details/${_id}`
    );
    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_DETAILS_FAIL, payload: error.response });
  }
};
export const getFilterData = (query) =>async (dispatch)=>{
  console.log(query);
  console.log(dispatch);
  try {
    dispatch({ type: GET_FILTER_PRODUCTS_REQUEST });
    const { data } = await axios.get(
      `${backendApi}/api/products/filterData?query=${query}`
    );
    console.log("data", data);
    dispatch({ type: GET_FILTER_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
  }
}
export const getSortedData = (query) =>async (dispatch)=>{
  console.log(query);
  console.log(dispatch);
  try {
    dispatch({ type: GET_SORT_PRODUCTS_REQUEST });
    const { data } = await axios.get(
      `${backendApi}/api/products/sortedproducts?query=${query}`
    );
      
    // console.log("data", data);
    dispatch({ type: GET_SORT_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
  }
}
export const SearchProductsAction = (query) => {
  // console.log("action called", query);
  return {
    type: SEARCH_PRODUCTS,
    query,
  };
};
