// sellerReducers.js
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

export const preVerifySellerReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case PRE_VERIFY_SELLER_REQUEST:
            return { loading: true };
        case PRE_VERIFY_SELLER_SUCCESS:
            return { loading: false, success: true };
        case PRE_VERIFY_SELLER_FAIL:
            return { loading: false, error: action.payload };
        case SELLER_CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const sellerVerifyReducer = (state = { loading: false }, action) => {
    switch (action.type) {
      case VERIFY_SELLER_REQUEST:
        return { loading: true };
      case VERIFY_SELLER_SUCCESS:
        return { loading: false, success: true };
      case VERIFY_SELLER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const sellerRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case REGISTER_SELLER_REQUEST:
        return { loading: true };
      case REGISTER_SELLER_SUCCESS:
        return { loading: false, success: true, sellerInfo: action.payload };
      case REGISTER_SELLER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

export const sellerReducer = (state = {}, action) => {
    switch (action.type) {
        case SELLER_LOGIN_REQUEST:
            return { loading: true };
        case SELLER_LOGIN_SUCCESS:
            return { loading: false, sellerInfo: action.payload, isAuthenticated:true };
        case SELLER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        
            case SELLER_LOGOUT_REQUEST:
              return { loading: true };
        
            case SELLER_LOGOUT_SUCCESS:
              return { loading: false, success: true, isAuthenticated: false, sellerInfo: null, message: action.payload.message };
        
            case SELLER_LOGOUT_FAIL:
              return { loading: false, error: action.payload };

              case SELLER_CLEAR_ERRORS:
                return { ...state, error: null };
        default:
            return state;
    }
};

export const sellerDetailsReducer = (state = { loading: false }, action) => {
    switch (action.type) {
      case GET_DETAILS_REQUEST:
        return { loading: true,};
  
      case GET_DETAILS_SUCCESS:
        return { loading: false,  seller: action.payload };
  
      case GET_DETAILS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const forgotPasswordSellerReducer = (state = {}, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
        return { loading: true };
  
      case FORGOT_PASSWORD_SUCCESS:
        return { loading: false, message: action.payload };
  
      case FORGOT_PASSWORD_FAIL:
        return { loading: false, error: action.payload };
  
      case FORGOT_PASSWORD_RESET:
        return { message: null };
  
      case SELLER_CLEAR_ERRORS:
        return { error: null };
  
      default:
        return state;
    }
  };
  
  export const resetPasswordSellerReducer = (state = {}, action) => {
    switch (action.type) {
      case RESET_PASSWORD_REQUEST:
        return { loading: true };
  
      case RESET_PASSWORD_SUCCESS:
        return { loading: false, success: true, message: action.payload };
  
      case RESET_PASSWORD_FAIL:
        return { loading: false, error: action.payload };
  
      case SELLER_CLEAR_ERRORS:
        return { error: null };
  
      default:
        return state;
    }
  };

  export const updatePasswordSellerReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PASSWORD_REQUEST:
        return { loading: true };
      case UPDATE_PASSWORD_SUCCESS:
        return { loading: false, success: true };
      case UPDATE_PASSWORD_FAIL:
        return { loading: false, error: action.payload };
      case UPDATE_PASSWORD_RESET:
        return {};
      case SELLER_CLEAR_ERRORS:
        return { ...state, error: null };
      default:
        return state;
    }
  };
  
  export const updateSellerReducer = (state = { loading: false }, action) => {
    switch (action.type) {
      case UPDATE_SELLER_REQUEST:
        return { loading: true };
      case UPDATE_SELLER_SUCCESS:
        return { ...state, loading: false, success: true, sellerInfo: action.payload, };
      case UPDATE_SELLER_FAIL:
        return { loading: false, error: action.payload };
      case UPDATE_SELLER_RESET:
        return {};
        case SELLER_CLEAR_ERRORS:
          return { ...state, error: null };
      default:
        return state;
    }
  };

  //admin
  export const sellerListReducer = (state = { sellers: [] }, action) => {
    switch (action.type) {
      case GET_SELLERS_REQUEST:
        return { loading: true, sellers: [] };
      case GET_SELLERS_SUCCESS:
        return { loading: false, sellers: action.payload.sellers, totalSellers: action.payload.totalSellers };
      case GET_SELLERS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const sellerDetailsAdminReducer = (state = { seller: {} }, action) => {
    switch (action.type) {
      case GET_SELLER_DETAILS_REQUEST:
        return { loading: true, ...state };
      case GET_SELLER_DETAILS_SUCCESS:
        return { loading: false, seller: action.payload };
      case GET_SELLER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };