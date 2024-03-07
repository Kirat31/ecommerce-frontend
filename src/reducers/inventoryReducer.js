// inventoryReducer.js

import {
    CREATE_INVENTORY_REQUEST,
    CREATE_INVENTORY_SUCCESS,
    CREATE_INVENTORY_FAIL,
  } from '../constants/inventoryConstants';
  
  const inventoryReducer = (state = {
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
  
  export default inventoryReducer;
  