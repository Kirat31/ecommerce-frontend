// cartActions.js

import axios from 'axios';
import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_PRODUCTS_FAIL,
  CART_PRODUCTS_REQUEST,
  CART_PRODUCTS_SUCCESS,
  CART_DELETE_REQUEST,
  CART_DELETE_SUCCESS,
  CART_DELETE_FAIL,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_DECREASE_REQUEST,
  CART_DECREASE_SUCCESS,
  CART_DECREASE_FAIL,
} from '../constants/cartConstants';

export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  console.log("proxy server" , process.env.REACT_APP_PROXY);
  try {
    dispatch({ type: CART_ADD_REQUEST });

    const { data } = await axios.post('/api/v1/cart/addProduct', { userId, productId, quantity });

    dispatch({ type: CART_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CART_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// // Similarly, create actions for deleting, updating, and decreasing products in the cart
// import axios from 'axios';
// import {
//   CART_PRODUCTS_REQUEST,
//   CART_PRODUCTS_SUCCESS,
//   CART_PRODUCTS_FAIL,
// } from '../constants/cartConstants';

export const getCartProducts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: CART_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/cart/getAllCartProducts/${userId}`);
console.log("cart action data", data);
    dispatch({
      type: CART_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_PRODUCTS_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const updateProductInCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: CART_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/v1/cart/updateProduct`, { userId, productId, quantity });

    dispatch({
      type: CART_UPDATE_SUCCESS,
      payload: data.cart,
    });
  } catch (error) {
    dispatch({
      type: CART_UPDATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const decreaseProductInCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: CART_DECREASE_REQUEST });

    const { data } = await axios.put(`/api/v1/cart/decreaseProduct`, {userId, productId, quantity });

    dispatch({
      type: CART_DECREASE_SUCCESS,
      payload: data.cart,
    });
  } catch (error) {
    dispatch({
      type: CART_DECREASE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};