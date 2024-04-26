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
  CHECKOUT_FAIL,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS
} from '../constants/cartConstants';

export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  // console.log("proxy server" , process.env.REACT_APP_PROXY);
  try {
    dispatch({ type: CART_ADD_REQUEST });

    const { data } = await axios.post('/api/v1/cart/addProduct', { userId, productId, quantity });

    dispatch({ type: CART_ADD_SUCCESS, payload: data.cart });
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

export const getCartProducts = (userId) => async (dispatch) => {
  
  try {
    dispatch({ type: CART_PRODUCTS_REQUEST });
    console.log("id", userId);
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
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    console.log('hi',userId, productId, quantity );
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

export const deleteProductFromCart = (userId, productId) => async (dispatch) => {
  try {
    dispatch({ type: CART_DELETE_REQUEST });
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    console.log("pro id", productId);
    const { data } = await axios.delete(`/api/v1/cart/deleteProduct/${userId}/${productId}`);

    dispatch({
      type: CART_DELETE_SUCCESS,
      payload: data.message, // Send the productId to identify the product to be deleted
    });
  } catch (error) {
    // console.error('Error deleting product from cart:', error);
    dispatch({
      type: CART_DELETE_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,// You can send the error message or any other relevant data
    });
  }
};

export const checkoutFromCart = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CHECKOUT_REQUEST });
    console.log("in action", formData);
    const { data } = await axios.post('/api/v1/cart/checkoutFromCart', formData);
    dispatch({
      type: CHECKOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECKOUT_FAIL,
      payload: error.response.data.message || 'Something went wrong during checkout',
    });
  }
};