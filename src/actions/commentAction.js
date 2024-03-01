// commentActions.js

import axios from 'axios';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
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

export const clearReviewErrors = () => async (dispatch) => {
    try {
      dispatch({ type: CLEAR_COMMENT_ERRORS });
    } catch (error) {
      console.error(error);
    }
  };