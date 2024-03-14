import axios from 'axios';
import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,
    ADMIN_CLEAR_ERRORS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
} from '../constants/adminConstants';

export const loginAdmin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/v1/admin/loginAdmin', { email, password }, config);

        dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const { data } = await axios.post('/api/v1/admin/password/forgot', { email });
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const clearAdminErrors = () => (dispatch) => {
    dispatch({ type: ADMIN_CLEAR_ERRORS });
};