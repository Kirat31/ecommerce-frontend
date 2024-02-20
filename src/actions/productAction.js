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

//const baseURL = 'http://localhost:4000';
export const getProduct = (keyword="", page = 1, price = [0, 30000], category, rating = 0) => async (dispatch) => {
    try{
        console.log('Keyword: ', keyword);
        dispatch({type: ALL_PRODUCT_REQUEST});
        const priceQueryString = `minPrice=${price[0]}&maxPrice=${price[1]}`;
        let link = `/api/v1/product/products?keyword=${keyword}&page=${page}&${priceQueryString}&minRating=${rating}`;

        if(category){
            link= `/api/v1/product/products?keyword=${keyword}&page=${page}&${priceQueryString}&category=${category}&minRating=${rating}`;
        }

        const {data} = await axios.get(link);
        //console.log('Data from API:', data);
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

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/product/getProductDetails/${id}`);
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data.product,
        });
      } catch (error) {
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response.data.message,
        });
      }
    };
//clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};