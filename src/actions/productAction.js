import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/productConstants";

export const getProduct = (keyword="", page = 1, pageSize = 10) => async (dispatch) => {
    try{
        dispatch({type: ALL_PRODUCT_REQUEST});
        let link = `api/v1/product/products?keyword=${keyword}&page=${page}&pageSize=${pageSize}`;
        const {data} = await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload: data,
        });

    } catch(error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getProductDetails = (_id) => async () => {
    try {
        // Dispatching actions is removed from this function

        // Make the API request to get product details
        const res = await axios.get(`http://localhost:4000/api/v1/product/getProductDetails/${_id}`);

        // Log the product details response
        console.log('Product Details Response:', res);

        // Return the product details or undefined if response doesn't contain product
        return res?.data?.product;
    } catch (error) {
        // If an error occurs, return the error message
        return error.response?.data?.message || 'Failed to fetch product details';
    }
};
//clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};