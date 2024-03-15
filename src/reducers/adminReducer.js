import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,
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

            case LOGOUT_ADMIN_REQUEST:
                return { ...state, loading: true };
              case LOGOUT_ADMIN_SUCCESS:
                return { loading: false, isAuthenticated: false, adminInfo: null };
              case LOGOUT_ADMIN_FAIL:
                return { loading: false, error: action.payload };

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

  export const resetPasswordAdminReducer = (state = {}, action) => {
    switch (action.type) {
      case RESET_PASSWORD_REQUEST:
        return { loading: true };
      case RESET_PASSWORD_SUCCESS:
        return { loading: false, success: true };
      case RESET_PASSWORD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const adminDetailsReducer = (state = {
    admin: null,
    loading: false,
    error: null,
  }, action) => {
  switch (action.type) {
    case GET_ADMIN_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ADMIN_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        admin: action.payload,
      };
    case GET_ADMIN_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updatePasswordAdminReducer = (state = {
  loading: false,
  success: false,
  error: null,
}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};