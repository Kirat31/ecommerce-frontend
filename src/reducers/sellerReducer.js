// sellerReducers.js
import {
    PRE_VERIFY_SELLER_REQUEST,
    PRE_VERIFY_SELLER_SUCCESS,
    PRE_VERIFY_SELLER_FAIL,
    SELLER_LOGIN_FAIL,
    SELLER_LOGIN_REQUEST,
    SELLER_LOGIN_SUCCESS,
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

export const sellerLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case SELLER_LOGIN_REQUEST:
            return { loading: true };
        case SELLER_LOGIN_SUCCESS:
            return { loading: false, sellerInfo: action.payload };
        case SELLER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case SELLER_CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

