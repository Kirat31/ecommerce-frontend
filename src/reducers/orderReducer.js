import { 
  GET_ORDERS_SUCCESS, 
  GET_ORDERS_FAIL, 
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS, 
  GET_ALL_ORDERS_FORADMIN_FAIL,
  GET_ALL_ORDERS_FORADMIN_REQUEST, 
  GET_ALL_ORDERS_FORADMIN_SUCCESS, 
  UPDATE_ORDER_STATUS_FAIL, 
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  COUNT_WEEKLY_SALES_REQUEST,
  COUNT_WEEKLY_SALES_SUCCESS,
  COUNT_WEEKLY_SALES_FAIL,
  GET_ORDER_COUNT_FAIL,
  GET_ORDER_COUNT_REQUEST,
  GET_ORDER_COUNT_SUCCESS,
  GET_CANCELLED_ORDER_COUNT_FAIL,
  GET_CANCELLED_ORDER_COUNT_REQUEST,
  GET_CANCELLED_ORDER_COUNT_SUCCESS
} from '../constants/orderConstants';

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

//admin
export const orderListReducer = (state = { orders: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_FORADMIN_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_ORDERS_FORADMIN_SUCCESS:
      return { ...state, loading: false, orders: action.payload.orders, totalOrdersCount: action.payload.totalOrdersCount };
    case GET_ALL_ORDERS_FORADMIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateOrderStatusReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_REQUEST:
      return { loading: true };
    case UPDATE_ORDER_STATUS_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case UPDATE_ORDER_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const weeklySalesReducer = (state = { weeklySales: {}, loading: true }, action) => {
  switch (action.type) {
    case COUNT_WEEKLY_SALES_REQUEST:
      return { loading: true };
    case COUNT_WEEKLY_SALES_SUCCESS:
      return { loading: false, weeklySales: action.payload };
    case COUNT_WEEKLY_SALES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderCountReducer = (state = { loading: true, countPaid: 0, countPending: 0 }, action) => {
  switch (action.type) {
    case GET_ORDER_COUNT_REQUEST:
      return { loading: true };
    case GET_ORDER_COUNT_SUCCESS:
      return { loading: false, countPaid: action.payload.countPaid, countPending: action.payload.countPending };
    case GET_ORDER_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cancelledOrderCountReducer = (state = { loading: true, countCancelled: 0 }, action) => {
  switch (action.type) {
    case GET_CANCELLED_ORDER_COUNT_REQUEST:
      return { loading: true };
    case GET_CANCELLED_ORDER_COUNT_SUCCESS:
      return { loading: false, countCancelled: action.payload };
    case GET_CANCELLED_ORDER_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
