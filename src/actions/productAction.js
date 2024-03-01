import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
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

//create products
export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authorization headers here
        },
      };
  
      const { data } = await axios.post('/api/v1/product/createProduct', productData, config);
  
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  //update products
  export const updateProduct = (productId, updatedProductData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const { data } = await axios.put(`/api/v1/product/updateProduct/${productId}`, updatedProductData);
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message || 'Failed to update product',
      });
    }
  };
  
//clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

