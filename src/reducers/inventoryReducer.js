// inventoryReducer.js

import {
    CREATE_INVENTORY_REQUEST,
    CREATE_INVENTORY_SUCCESS,
    CREATE_INVENTORY_FAIL,
    FETCH_INVENTORY_FAIL,
    FETCH_INVENTORY_REQUEST,
    FETCH_INVENTORY_SUCCESS,
    GET_INVENTORY_DETAILS_FAIL,
    GET_INVENTORY_DETAILS_REQUEST,
    GET_INVENTORY_DETAILS_SUCCESS,
    UPDATE_INVENTORY_FAIL,
    UPDATE_INVENTORY_REQUEST,
    UPDATE_INVENTORY_RESET,
    UPDATE_INVENTORY_SUCCESS,
  } from '../constants/inventoryConstants';
  
  export const inventoryReducer = (state = {
        loading: false,
        inventory: null,
        error: null,
    }, action) => {
    switch (action.type) {
      case CREATE_INVENTORY_REQUEST:
        return { 
            ...state, 
            loading: true 
        };
  
      case CREATE_INVENTORY_SUCCESS:
        return { 
            ...state, 
            loading: false, 
            inventory: action.payload, 
            success: true,
            error: null 
        };
  
      case CREATE_INVENTORY_FAIL:
        return { 
            ...state, 
            loading: false, 
            error: action.payload 
        };
  
      default:
        return state;
    }
  };
  
  export const getInventoryReducer = (state = {
      loading: false,
      inventory: [],
      inventoryCount: 0,
      error: null,
    }, action) => {
    switch (action.type) {
      case FETCH_INVENTORY_REQUEST:
        return { 
          ...state, 
          loading: true 
        };
      case FETCH_INVENTORY_SUCCESS:
        return {
          ...state,
          loading: false,
          inventory: action.payload.inventory,
          inventoryCount: action.payload.inventoryCount,
          error: null,
        };
      case FETCH_INVENTORY_FAIL:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
      default:
        return state;
    }
  };
  
  export const inventoryDetailsReducer = (state = { loading: true, inventory: {} }, action) => {
    switch (action.type) {
      case GET_INVENTORY_DETAILS_REQUEST:
        return { 
          loading: true, 
          ...state 
        };
  
      case GET_INVENTORY_DETAILS_SUCCESS:
        return { 
          loading: false, 
          inventory: action.payload 
        };
  
      case GET_INVENTORY_DETAILS_FAIL:
        return { 
          loading: false, 
          error: action.payload 
        };
  
      default:
        return state;
    }
  };

  export const updateInventoryReducer = (state = { inventory: {} }, action) => {
    switch (action.type) {
      case UPDATE_INVENTORY_REQUEST:
        return { 
          loading: true 
        };
      case UPDATE_INVENTORY_SUCCESS:
        return { 
          loading: false, 
          success: true, 
          inventory: action.payload 
        };
      case UPDATE_INVENTORY_FAIL:
        return { 
          loading: false, 
          error: action.payload 
        };
      case UPDATE_INVENTORY_RESET:
        return { 
          inventory: {} 
        };
      default:
        return state;
    }
  };