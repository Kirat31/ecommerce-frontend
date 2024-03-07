// inventoryActions.js

import axios from 'axios';
import {
  CREATE_INVENTORY_REQUEST,
  CREATE_INVENTORY_SUCCESS,
  CREATE_INVENTORY_FAIL,
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
