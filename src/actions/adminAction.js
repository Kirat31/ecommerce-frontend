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
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    GET_ADMIN_DETAILS_FAIL,
    GET_ADMIN_DETAILS_REQUEST,
    GET_ADMIN_DETAILS_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    LOGOUT_ADMIN_FAIL,
    LOGOUT_ADMIN_REQUEST,
    LOGOUT_ADMIN_SUCCESS,
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

  export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const { data } = await axios.post(`/api/v1/admin//password/reset/${token}`, { password, confirmPassword });
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  export const logoutAdmin = () => async (dispatch) => {
    try {
      dispatch({ type: LOGOUT_ADMIN_REQUEST });
  
      const { data } = await axios.get('/api/v1/admin/logoutAdmin');
  
      dispatch({ type: LOGOUT_ADMIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LOGOUT_ADMIN_FAIL,
        payload: error.response.data.message || 'Logout failed',
      });
    }
  };

  export const getAdminDetails = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ADMIN_DETAILS_REQUEST });
  
      const { data } = await axios.get('/api/v1/admin/me');
  
      dispatch({
        type: GET_ADMIN_DETAILS_SUCCESS,
        payload: data.admin,
      });
    } catch (error) {
      dispatch({
        type: GET_ADMIN_DETAILS_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  export const updatePasswordAdmin = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.put(
        '/api/v1/admin/updatePassword',
        { oldPassword, newPassword, confirmPassword },
        config
      );
  
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearAdminErrors = () => (dispatch) => {
    dispatch({ type: ADMIN_CLEAR_ERRORS });
};