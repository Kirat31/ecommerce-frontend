import axios from 'axios';
import {
    ADD_RATING_REQUEST,
    ADD_RATING_FAIL,
    ADD_RATING_SUCCESS,
    GET_ALL_RATING_FAIL,
    GET_ALL_RATING_REQUEST,
    GET_ALL_RATING_SUCCESS,
    CLEAR_RATING_ERRORS,
} 
from '../constants/ratingConstants';

export const addRating = (user, product, star) => async (dispatch) => {
    try {
      dispatch({ type: ADD_RATING_REQUEST });
  
      const { data } = await axios.post('/api/v1/rating/addRating', { user, product, star });
  
      dispatch({
        type: ADD_RATING_SUCCESS,
        payload: data.rating
      });
    } catch (error) {
      dispatch({
        type: ADD_RATING_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      });
    }
  };

  export const getAllRatings = (productId, page, resultPerPage) => async (dispatch) => {
    // console.log("params", params);
    try {
      
      dispatch({ type: GET_ALL_RATING_REQUEST });
      console.log("prinaction", productId);
      const data = await axios.get(`/api/v1/rating/getAllRating/${productId}?productId=${productId}&page=${page}&resultPerPage=${resultPerPage}`);
     
      dispatch({
        type: GET_ALL_RATING_SUCCESS,
        payload: data,
      });
      console.log("prinaction", data);
    } catch (error) {
      dispatch({
        type: GET_ALL_RATING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const clearRatingErrors = () => async (dispatch) => {
    try {
      dispatch({ type: CLEAR_RATING_ERRORS });
    } catch (error) {
      console.error(error);
    }
  };