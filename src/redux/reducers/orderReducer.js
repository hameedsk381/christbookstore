import { CLEAR_CART, PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../actions/orderActions";

const initialState = {
    order: null,
    cartItems: [],
    total: 0,
    loading: false,
    error: null,
    success:false
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case PLACE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case PLACE_ORDER_SUCCESS:
        return {
          ...state,
          order: action.payload,
          loading: false,
          success:true
        };
      case PLACE_ORDER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_CART:
        return {
          ...state,
          cartItems: [],
          total: 0,
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  