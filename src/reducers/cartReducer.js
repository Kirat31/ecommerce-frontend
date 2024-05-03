// cartReducers.js

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
    CHECKOUT_SUCCESS,
    GET_TOTAL_PRODUCTS_FAIL,
    GET_TOTAL_PRODUCTS_REQUEST,
    GET_TOTAL_PRODUCTS_SUCCESS,
   
  } from '../constants/cartConstants';
  
  export const cartAddReducer = (state = {}, action) => {
    switch (action.type) {
      case CART_ADD_REQUEST:
        return { loading: true };
      case CART_ADD_SUCCESS:
        return { loading: false, success: true, cart: action.payload };
      case CART_ADD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Similarly, create reducers for deleting, updating, and decreasing products in the cart
  export const cartProductsReducer = (state = { loading: false, cartProducts: [] }, action) => {
    switch (action.type) {
      case CART_PRODUCTS_REQUEST:
        return { 
          // ...state, 
          loading: true };
  
      case CART_PRODUCTS_SUCCESS:
        return { loading: false, cartProducts: action.payload.products };
  
      case CART_PRODUCTS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const cartUpdateReducer = (state = { 
      cart: {},
      loading: false,
      error: null, 
    }, action) => {
      switch (action.type) {
        case CART_UPDATE_REQUEST:
          return { ...state, loading: true, error:null };
        case CART_UPDATE_SUCCESS:
          return { ...state, loading: false, success: true, cart: action.payload, error:null };
        case CART_UPDATE_FAIL:
          return { ...state, loading: false, error: action.payload };
        default:
          return state;
      }
  };

  export const cartDecreaseReducer = (state = { cart: null, loading: false, error: null }, action) => {
    switch (action.type) {
      case CART_DECREASE_REQUEST:
        return { ...state, loading: true };
      case CART_DECREASE_SUCCESS:
        return { ...state, loading: false, cart: action.payload };
      case CART_DECREASE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const cartDeleteReducer = (state = {
      // Initial state of the cart
      loading: false,
      error: null,
      success: false
    }, action) => {
    switch (action.type) {
      case CART_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          success: false,
        };
      case CART_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          success: true,
        };
      case CART_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: false,
        };
      // Handle other cases if needed
      default:
        return state;
    }
   
  };

  export const checkoutReducer = (state = { loading: false, success: false, error: null }, action) => {
    switch (action.type) {
      case CHECKOUT_REQUEST:
        return { loading: true };
      case CHECKOUT_SUCCESS:
        return { ...state, loading: false, success: true };
      case CHECKOUT_FAIL:
        return { ...state, loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };

  export const totalProductsReducer = (state = { loading: true, totalCount: 0 }, action) => {
    switch (action.type) {
      case GET_TOTAL_PRODUCTS_REQUEST:
        return { loading: true };
      case GET_TOTAL_PRODUCTS_SUCCESS:
        return { loading: false, totalCount: action.payload };
      case GET_TOTAL_PRODUCTS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  