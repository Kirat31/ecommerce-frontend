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
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstants";
import axios from "axios";
import Cookies from 'js-cookie';

export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({type: LOGIN_REQUEST});
        const config = { headers: { "Content-Type": "application/json"}};

        const { data } = await axios.post(
            `api/v1/user/loginUser`,
            {email, password}, 
            config
        );

        Cookies.set('token', data.token);

        dispatch({type: LOGIN_SUCCESS, payload: data.user});
    }catch(error){
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message });
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
// export const loadUser = () => async(dispatch) => {
//   try{
//       dispatch({type: LOAD_USER_REQUEST});
//       const { data } = await axios.get( `api/v1/user/getUser` );

//       dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
//   }catch(error){
//       dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message });
//   }
// };

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
