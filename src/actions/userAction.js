import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_USER_DATA,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstants";
import axios from "axios";
import Cookies from 'js-cookie';

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

export const register = (userData) => async(dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" }};
      console.log("data: ", userData);
  
      const { data } = await axios.post(
        `api/v1/user/registerUser`,
        userData, 
        config
      );

      
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  }
  
  
//load user
export const loadUser = () => async(dispatch) => {
  try{
      dispatch({type: LOAD_USER_REQUEST});
      const { data } = await axios.get( `api/v1/user/getUser` );

      dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
  }catch(error){
      dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message });
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

    
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
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
export const forgotPassword = (email, password) => async(dispatch) => {
  try{
      dispatch({type: FORGOT_PASSWORD_REQUEST});
      const config = { headers: { "Content-Type": "application/json"}};

      const { data } = await axios.post(
          `api/v1/user/loginUser`,
          {email, password}, 
          config
      );

      Cookies.set('token', data.token);

      dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.user});
  }catch(error){
      dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
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


//clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
