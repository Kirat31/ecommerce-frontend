// commentActions.js

import axios from 'axios';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  GET_ALL_COMMENTS_FAIL,
  GET_ALL_COMMENTS_REQUEST,
  GET_ALL_COMMENTS_SUCCESS,
  VIEW_COMMENT_FAIL,
  VIEW_COMMENT_REQUEST,
  VIEW_COMMENT_SUCCESS,
  CLEAR_COMMENT_ERRORS,
} from '../constants/commentConstants';

export const addComment = (user, product, content) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COMMENT_REQUEST });

    const { data } = await axios.post('/api/v1/comment/addComment', { user, product, content });

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data.comment
    });
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const getAllComments = (productId, searchQuery, page, resultPerPage) => async (dispatch) => {
  // console.log("params", params);
  try {
    
    dispatch({ type: GET_ALL_COMMENTS_REQUEST });
    console.log("prinaction", productId);
    const data = await axios.get(`/api/v1/comment/getAllProductComments/${productId}?productId=${productId}&searchQuery=${searchQuery}&page=${page}&resultPerPage=${resultPerPage}`);
   
    dispatch({
      type: GET_ALL_COMMENTS_SUCCESS,
      payload: data,
    });
    console.log("prinaction", data);
  } catch (error) {
    dispatch({
      type: GET_ALL_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const viewComment = (commentId) => async (dispatch) => {
  try {
    dispatch({ type: VIEW_COMMENT_REQUEST });

    const { data } = await axios.get(`/api/v1/comment/viewComment/${commentId}`);

    dispatch({
      type: VIEW_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIEW_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearReviewErrors = () => async (dispatch) => {
    try {
      dispatch({ type: CLEAR_COMMENT_ERRORS });
    } catch (error) {
      console.error(error);
    }
  };