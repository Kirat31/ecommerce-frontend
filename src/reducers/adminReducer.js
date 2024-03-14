import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    ADMIN_CLEAR_ERRORS
} from '../constants/adminConstants';

export const adminReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
            return { loading: true };
        case ADMIN_LOGIN_SUCCESS:
            return { loading: false, adminInfo: action.payload, isAuthenticated: true };
        case ADMIN_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case ADMIN_LOGOUT:
            return { loading: false, isAuthenticated: false, adminInfo: null };
        case ADMIN_CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const forgotPasswordAdminReducer = (state = {}, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
        return { loading: true };
      case FORGOT_PASSWORD_SUCCESS:
        return { loading: false, success: true, message: action.payload };
      case FORGOT_PASSWORD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
