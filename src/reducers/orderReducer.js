import { GET_ORDERS_SUCCESS, GET_ORDERS_FAIL, GET_ALL_ORDERS_FAILURE,GET_ALL_ORDERS_REQUEST,
GET_ALL_ORDERS_SUCCESS } from '../constants/orderConstants';

 export const orderReducer = (state = {
    orders: [],
    error: null,
  }, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        error: null,
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        orders: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//seller
export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { loading: true, orders: [] };
    case GET_ALL_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_ALL_ORDERS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


