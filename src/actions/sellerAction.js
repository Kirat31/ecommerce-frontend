// sellerActions.js
import axios from 'axios';
import {
    PRE_VERIFY_SELLER_REQUEST,
    PRE_VERIFY_SELLER_SUCCESS,
    PRE_VERIFY_SELLER_FAIL,
    VERIFY_SELLER_FAIL,
    VERIFY_SELLER_REQUEST,
    VERIFY_SELLER_SUCCESS,
    REGISTER_SELLER_FAIL,
    REGISTER_SELLER_REQUEST,
    REGISTER_SELLER_SUCCESS,
    SELLER_LOGIN_FAIL,
    SELLER_LOGIN_REQUEST,
    SELLER_LOGIN_SUCCESS,
    GET_DETAILS_FAIL,
    GET_DETAILS_REQUEST,
    GET_DETAILS_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_RESET,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_SELLER_FAIL,
    UPDATE_SELLER_REQUEST,
    UPDATE_SELLER_RESET,
    UPDATE_SELLER_SUCCESS,
    GET_SELLERS_FAIL,
    GET_SELLERS_REQUEST,
    GET_SELLERS_SUCCESS,
    GET_SELLER_DETAILS_FAIL,
    GET_SELLER_DETAILS_REQUEST,
    GET_SELLER_DETAILS_SUCCESS,
    SELLER_LOGOUT_FAIL,
    SELLER_LOGOUT_REQUEST,
    SELLER_LOGOUT_SUCCESS,
    SELLER_CLEAR_ERRORS
} from '../constants/sellerConstants';

export const preVerifySeller = (userData) => async (dispatch) => {
    try {
        dispatch({ type: PRE_VERIFY_SELLER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/v1/seller/verifySeller', userData, config);

        dispatch({
            type: PRE_VERIFY_SELLER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRE_VERIFY_SELLER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const verifySeller = (token) => async (dispatch) => {
    try {
      dispatch({ type: VERIFY_SELLER_REQUEST });
  
      const { data } = await axios.get(`/api/v1/seller/verifySeller/${token}`);
  
      dispatch({ type: VERIFY_SELLER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: VERIFY_SELLER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const registerSeller = (sellerData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_SELLER_REQUEST });
  
      const { data } = await axios.post('/api/v1/seller/registerSeller', sellerData);
  
      dispatch({ type: REGISTER_SELLER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REGISTER_SELLER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const loginSeller = (email, password) => async (dispatch) => {
  console.log("hi");
    try {
        dispatch({ type: SELLER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/v1/seller/loginSeller', { email, password }, config);

        dispatch({
            type: SELLER_LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SELLER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const getDetails = () => async (dispatch) => {
  console.log("in get details action");
    try {
      dispatch({ type: GET_DETAILS_REQUEST });
  
      const { data } = await axios.get('/api/v1/seller/me');
      console.log("get dtails data", data);
  
      dispatch({
        type: GET_DETAILS_SUCCESS,
        payload: data
      });
      console.log("success", data);
    } catch (error) {
      dispatch({
        type: GET_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

  export const logoutSeller = () => async (dispatch) => {
    try {
      dispatch({ type: SELLER_LOGOUT_REQUEST });
  
      const { data } = await axios.get('/api/v1/seller/logoutSeller');
  
      dispatch({ type: SELLER_LOGOUT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SELLER_LOGOUT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const { data } = await axios.post('/api/v1/seller/password/forgot', { email });
  
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.error
      });
    }
  };

  export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.put(`/api/v1/seller/password/reset/${token}`, { password, confirmPassword }, config);
  
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.error
      });
    }
  };
  
  export const updateSellerPassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers like authorization if needed
        },
      };
  
      const { data } = await axios.put('/api/v1/seller/updatePassword', { oldPassword, newPassword, confirmPassword }, config);
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const updateSeller = (sellerData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_SELLER_REQUEST });
  
      const {
        seller: { sellerInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sellerInfo.token}`,
        },
      };
  
      const { data } = await axios.put('/api/v1/seller/updateSeller', sellerData, config);
      // dispatch({ type: GET_DETAILS_SUCCESS, payload: data.seller });
      dispatch({ type: UPDATE_SELLER_SUCCESS, payload: data });

      dispatch(getDetails());
      // dispatch({ type: SELLER_CLEAR_ERRORS });
    } catch (error) {
      dispatch({
        type: UPDATE_SELLER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getSellers = () => async (dispatch) => {
    try {
      dispatch({ type: GET_SELLERS_REQUEST });
  
      const { data } = await axios.get('/api/v1/seller/getSellers'); // Update the endpoint
  
      dispatch({
        type: GET_SELLERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SELLERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getSellerDetails = (sellerId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SELLER_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/seller/getSellerDetails/${sellerId}`);
  
      dispatch({
        type: GET_SELLER_DETAILS_SUCCESS,
        payload: data.seller,
      });
    } catch (error) {
      dispatch({
        type: GET_SELLER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const clearSellerErrors = () => (dispatch) => {
    dispatch({ type: SELLER_CLEAR_ERRORS });
};