import axios from 'axios';
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

export const getAllOrdersForUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/order/getAllOrders/${userId}`);
    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: res.data.orders,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload: error.response.data.message || 'Server error',
    });
  }
};

export const getAllOrdersForSeller = (sellerId) => async (dispatch) => {
  
  try {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/getPlacedOrders/${sellerId}`);
    console.log("in action", data)

    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAILURE,
      payload: error.response.data.message || 'Failed to get orders',
    });
  }
};

//admin
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_FORADMIN_REQUEST });

    const { data } = await axios.get('/api/v1/order/getAllOrders'); // Adjust the endpoint according to your backend API

    dispatch({
      type: GET_ALL_ORDERS_FORADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FORADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

    const { data } = await axios.put(`/api/v1/order/updateOrderStatus`, { orderId, status });

    dispatch({
      type: UPDATE_ORDER_STATUS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_STATUS_FAIL,
      payload: error.response.data.message || 'Failed to update order status',
    });
  }
};

export const countWeeklySales = () => async (dispatch) => {
  try {
    dispatch({ type: COUNT_WEEKLY_SALES_REQUEST });

    const { data } = await axios.get('/api/v1/order/countWeeklySales');

    dispatch({
      type: COUNT_WEEKLY_SALES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNT_WEEKLY_SALES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Something went wrong during counting weekly sales',
    });
  }
};

export const getOrderCount = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_COUNT_REQUEST });

    const { data } = await axios.get('/api/v1/order/getCountOfPaidAndPendingOrders');

    dispatch({
      type: GET_ORDER_COUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_COUNT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getCancelledOrderCount = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CANCELLED_ORDER_COUNT_REQUEST });

    const { data } = await axios.get('/api/v1/order/getCountOfCancelledOrders');

    dispatch({
      type: GET_CANCELLED_ORDER_COUNT_SUCCESS,
      payload: data.countCancelled,
    });
  } catch (error) {
    dispatch({
      type: GET_CANCELLED_ORDER_COUNT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
