// commentActions.js

import axios from 'axios';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  GET_ALL_COMMENTS_FAIL,
  GET_ALL_COMMENTS_REQUEST,
  GET_ALL_COMMENTS_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  VIEW_COMMENT_FAIL,
  VIEW_COMMENT_REQUEST,
  VIEW_COMMENT_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  CLEAR_COMMENT_ERRORS,
} from '../constants/commentConstants';

export const addComment = (user, product, content, star) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COMMENT_REQUEST });

    const { data } = await axios.post('/api/v1/comment/addComment', { user, product, content, star });
    console.log("review data", data);
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data
    });
    console.log("data", data);
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const getAllComments = (productId, page, resultPerPage) => async (dispatch) => {
  // console.log("params", params);
  try {
    
    dispatch({ type: GET_ALL_COMMENTS_REQUEST });
    console.log("prinaction", productId);
    const data = await axios.get(`/api/v1/comment/getAllProductComments/${productId}?productId=${productId}&page=${page}&resultPerPage=${resultPerPage}`);
   
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
  console.log("Comm id in action", commentId);
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

export const updateComment = (commentId, content, star) => async (dispatch) => {
  console.log("in update comment action", commentId, content, star);
  try{
    dispatch({type: UPDATE_COMMENT_REQUEST});
    // const body = JSON.stringify({ content, star });
    // console.log("body", body);
    const { data } = await axios.put(`/api/v1/comment/editComment/${commentId}`, {content, star});
    dispatch({
      type: UPDATE_COMMENT_SUCCESS,
      payload: data,
    });
  }catch(error){
    dispatch({
      type: UPDATE_COMMENT_FAIL,
      payload: error.response.data.message || 'Something went wrong',
    })
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/v1/comment/deleteComment/${commentId}`);

    dispatch({ type: COMMENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
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