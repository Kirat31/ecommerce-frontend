// inventoryActions.js

import axios from 'axios';
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

export const createInventory = (inventoryData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INVENTORY_REQUEST });

    const { data } = await axios.post('/api/v1/inventory/createInventory', inventoryData);

    dispatch({
      type: CREATE_INVENTORY_SUCCESS,
      payload: data.inventory,
    });
  } catch (error) {
    dispatch({
      type: CREATE_INVENTORY_FAIL,
      payload: error.response.data.message || 'Something went wrong',
    });
  }
};

export const fetchInventory = (page, filters) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_INVENTORY_REQUEST });

    const { data } = await axios.get(`/api/v1/inventory/getInventory?page=${page}`);

    dispatch({
      type: FETCH_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_INVENTORY_FAIL,
      payload: error.response.data.message || 'Failed to fetch inventory',
    });
  }
};

export const getInventoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_INVENTORY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/inventory/getInventoryDetails/${id}`);

    dispatch({
      type: GET_INVENTORY_DETAILS_SUCCESS,
      payload: data.inventory,
    });
  } catch (error) {
    dispatch({
      type: GET_INVENTORY_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateInventory = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INVENTORY_REQUEST });

    const { data } = await axios.put(`/api/v1/inventory/updateInventory/${id}`, formData);

    dispatch({ type: UPDATE_INVENTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_INVENTORY_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};