import axios from 'axios';
import { GET_ORDERS_SUCCESS, GET_ORDERS_FAIL, GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS } from '../constants/orderConstants';

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
