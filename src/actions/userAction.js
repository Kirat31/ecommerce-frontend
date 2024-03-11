import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    PRE_VERIFY_FAIL,
    PRE_VERIFY_REQUEST,
    PRE_VERIFY_SUCCESS,
    VERIFY_EMAIL_FAIL,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_USER_DATA,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GET_USERS_FAIL,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstants";
import axios from "axios";
import Cookies from 'js-cookie';

export const preVerifyUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: PRE_VERIFY_REQUEST });

    const { data } = await axios.post('/api/v1/user/verifyUser', userData);

    dispatch({
      type: PRE_VERIFY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRE_VERIFY_FAIL,
      payload: error.response.data.message || 'Something went wrong',
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(`api/v1/user/loginUser`, { email, password }, config);

    Cookies.set('token', data.token);

    dispatch({ type: LOGIN_SUCCESS, payload: { user: data.user, token: data.token } }); // Dispatch LOGIN_SUCCESS with user data and token
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axios.post('/api/v1/user/registerUser', userData);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message || 'Something went wrong',
    });
  }
};
  
//load user
export const loadUser = () => async(dispatch) => {
  try{
      dispatch({type: LOAD_USER_REQUEST});
      const { data } = await axios.get( `api/v1/user/me` );

      dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
  }catch(error){
      dispatch({type: LOAD_USER_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, });
  }
};

//update profile
export const updateProfile = (userData) => async(dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" }};
    //console.log("data: ", userData);

    const { data } = await axios.put(
      `api/v1/user/updateUser`,
      userData, 
      config
    );
    
    dispatch({ 
      type: UPDATE_PROFILE_SUCCESS, 
      payload: data 
    });
    dispatch({ type: UPDATE_PROFILE_RESET });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update password
export const updatePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      '/api/v1/user/updatePassword',
      { oldPassword, newPassword, confirmPassword },
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });

    // Dispatch an action to update user data after successful password update
    dispatch({ type: UPDATE_USER_DATA, payload: data.user }); // Assuming the updated user data is returned from the API
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

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('/api/v1/user/password/forgot', { email }, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

//logout user
export const logout = () => async(dispatch) => {
  try{
      await axios.get( `api/v1/user/logoutUser` );
      
      dispatch({type: LOGOUT_SUCCESS});
  }catch(error){
      dispatch({type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

//reset password
export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/user/password/reset/${token}`,
      { password, confirmPassword },
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

//get Users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    const { data } = await axios.get('/api/v1/user/getAllUsers'); // Assuming the endpoint is /api/users
console.log("data: ",data);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

//userdetails--admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/user/getUserDetails/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const verifyEmail = (token) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_EMAIL_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/v1/user/verifyUser/${token}`, config);

    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

//clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
