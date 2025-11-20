import { ADD_TO_CART, REMOVE_TO_CART } from "../constants/constant";
import axios from "axios";
import { backendApi } from "../../utils/paytm";

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${backendApi}/api/products/product_details/${id}`);

  dispatch({ 
    type: ADD_TO_CART,
    payload: {
      product: data._id,
      brand: data.brand,
      price: data.price,
      image: data.thumbnail,
      description: data.description,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().addToCartReducer.data));
};

export const removeToCartAction =  (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_TO_CART,
    id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().addToCartReducer.data));
};
