// sellerActions.js
import axios from 'axios';
import {
    PRE_VERIFY_SELLER_REQUEST,
    PRE_VERIFY_SELLER_SUCCESS,
    PRE_VERIFY_SELLER_FAIL,
    SELLER_LOGIN_FAIL,
    SELLER_LOGIN_REQUEST,
    SELLER_LOGIN_SUCCESS,
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

export const loginSeller = (email, password) => async (dispatch) => {
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

export const clearSellerErrors = () => (dispatch) => {
    dispatch({ type: SELLER_CLEAR_ERRORS });
};