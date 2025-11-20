import { ADD_TO_CART, REMOVE_TO_CART } from "../constants/constant";

const initialState = {
  data: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const existItem = state.data.find((i) => i.product === item.product);

      if (existItem) {
        return {
          ...state,
          data: state.data.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          data: [...state.data, item],
        };
      }

    case REMOVE_TO_CART:
      return {
        ...state,
        data: state.data.filter((i) => i.product !== action.id),
      };

    default:
      return state;
  }
};
