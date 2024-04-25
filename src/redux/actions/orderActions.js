import axios from "axios";
import { resetCart } from "./cartActions";
import { serverUrl } from "../../apis/serverapi";

// Action Types
export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';
export const CLEAR_CART = 'CLEAR_CART';

// Synchronous action creators
const placeOrderRequest = () => ({
  type: PLACE_ORDER_REQUEST,
});

const placeOrderSuccess = (orderDetails) => ({
  type: PLACE_ORDER_SUCCESS,
  payload: orderDetails,
});

const placeOrderFailure = (error) => ({
  type: PLACE_ORDER_FAILURE,
  payload: error,
});


// Asynchronous action creator (Thunk)
export const placeOrder = (shippingDetails, cartItems, total,user) => {
  return async (dispatch) => {
    dispatch(placeOrderRequest());
const totalPrice = total;
    const orderItems = cartItems.map(item => ({
      product: item._id,
      quantity: item.quantity,
      price: item.price
    }));
    const shippingAddress = {
      address: shippingDetails.address,
      city: shippingDetails.city,
      postalCode: shippingDetails.zip,
      country: shippingDetails.country || 'India',
    };

const order = {
  user: user || '6629433d1418f682e12602ba',
  shippingAddress,orderItems,totalPrice,paymentMethod:shippingDetails.paymentMethod
}
    try {
      const response = await axios.post(`${serverUrl}/api/orders`, order, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
console.log(order);
      const orderDetails = response.data;
      dispatch(placeOrderSuccess(orderDetails));
      dispatch(resetCart()); // Clear cart after successful order placement
    } catch (error) {
      dispatch(placeOrderFailure(error.message));
    }
  };
};
