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
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_USER_DATA,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_RESET,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_RESET,
    GET_USERS_FAIL,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstants"

export const preVerifyUserReducer = (state = {}, action) => {
    switch (action.type) {
      case PRE_VERIFY_REQUEST:
        return { 
            loading: true 
        };

      case PRE_VERIFY_SUCCESS:
        return { 
            loading: false, 
            success: true, 
            message: action.payload.message 
        };

      case PRE_VERIFY_FAIL:
        return { 
            ...state,
            loading: false, 
            error: action.payload 
        };

      default:
        return state;
    }
  };

  export const registrationReducer = (state = {
    loading: false,
    success: false,
    error: null,
  }, action) => {
    switch (action.type) {
      case REGISTER_USER_REQUEST:
        return { ...state, loading: true };
  
      case REGISTER_USER_SUCCESS:
        return { ...state, loading: false, success: true };
  
      case REGISTER_USER_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
export const userReducer = (state = { user: {}, token: null }, action) =>{
    switch (action.type) {
        case LOGIN_REQUEST:
        //case REGISTER_USER_REQUEST:
            return{
                ...state,
                loading: true,
                isAuthenticated: false,
                error:null,
            };

        case LOAD_USER_REQUEST:
            return { 
                ...state, 
                loading: true 
            };

        case LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
            };
 
        case LOAD_USER_SUCCESS: 
            return { 
                ...state, 
                loading: false, 
                user: action.payload 
            };

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                token: null,
                isAuthenticated: false,

            };
        case LOGIN_FAIL:
        //case REGISTER_USER_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                token: null,
                error: action.payload,
            };
        case LOAD_USER_FAIL:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state; 
        
    }
};

export const profileReducer = (state = {}, action) =>{
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return{
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
            return{
                ...state,
                loading: false,
                success: true,
                //isUpdated: action.payload,
            }
            case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        
        case UPDATE_PROFILE_FAIL:
            case UPDATE_PASSWORD_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_PROFILE_RESET:
            case UPDATE_PASSWORD_RESET:
            return{
                ...state,
                loading: false,
                isUpdated: false,
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state;  
    }
};

export const updatePasswordReducer = (state = {}, action) =>{
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            return{
                ...state,
                loading: true,
            };

        case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                success: action.payload,
            };
        
        case UPDATE_PASSWORD_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_PASSWORD_RESET:
            return{
                ...state,
                isUpdated: false,
            }

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }
        
        case UPDATE_USER_DATA:
            return {
                ...state,
                loading: false,
                success: action.payload, // Assuming action.payload contains updated user data
            };
    
        default:
            return state;  
    }
};

export const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          success: true,
        };
      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case RESET_PASSWORD_RESET:
        return {
            error: null,
            success: false,
            loading: false,
        };
      default:
        return state;
    }
  };

export const forgotPasswordReducer = (state = {}, action) =>{
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return{
                ...state,
                loading: true,
                error: null
            };

        case FORGOT_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                message: action.payload,
            };
        
        case FORGOT_PASSWORD_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            };

        case FORGOT_PASSWORD_RESET:
            return { ...state, message: null };

        case CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state;  
    }
};

export const userListReducer = (state = { loading: true, users: [] }, action) => {
    switch (action.type) {
      case GET_USERS_REQUEST:
        return { 
            loading: true 
        };
      case GET_USERS_SUCCESS:
        return { 
            loading: false, 
            users: action.payload.users, 
            totalUsers: action.payload.totalUsers 
        };
      case GET_USERS_FAIL:
        return { 
            loading: false, 
            error: action.payload 
        };
      default:
        return state;
    }
  };

  export const userDetailsReducer = (state = { loading: true, user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { 
            loading: true, 
            user: {} 
        };
      case USER_DETAILS_SUCCESS:
        return { 
            loading: false, 
            user: action.payload 
        };
      case USER_DETAILS_FAIL:
        return { 
            loading: false, 
            error: action.payload 
        };
      default:
        return state;
    }
  };