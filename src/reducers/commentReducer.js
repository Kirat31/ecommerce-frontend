// commentReducers.js

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
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_FAIL,
    UPDATE_COMMENT_SUCCESS,
    COMMENT_DELETE_FAIL,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS
  } from '../constants/commentConstants';
  
  export const commentAddReducer = (state = {
    loading: false,
    success: false,
    comment: "",
    error: null
  }, action) => {
    switch (action.type) {
      case ADD_COMMENT_REQUEST:
        return { 
            loading: true 
        };
      case ADD_COMMENT_SUCCESS:
        return { 
            loading: false, 
            success: true, 
            comment: action.payload 
        };
      case ADD_COMMENT_FAIL:
        return { 
            loading: false, 
            error: action.payload 
        };

        case CLEAR_COMMENT_ERRORS:
            return {
              ...state,
              error: null,
            };
      default:
        return state;
    }
  };

  export const allCommentsReducer = (state = {
    comments: [],
    loading: false,
    error: null,
    totalComments: 0,
    totalPages: 0
  }, action) => {
    switch (action.type) {
      case GET_ALL_COMMENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_ALL_COMMENTS_SUCCESS:
        return { ...state, loading: false, comments: action.payload.data.comments, totalComments: action.payload.data.totalComments, totalPages: action.payload.data.totalPages  };
      case GET_ALL_COMMENTS_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const commentViewReducer = (state = { comment: {} }, action) => {
    switch (action.type) {
      case VIEW_COMMENT_REQUEST:
        return { loading: true, comment: {} };
      case VIEW_COMMENT_SUCCESS:
        return { loading: false, comment: action.payload };
      case VIEW_COMMENT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const updateCommentReducer = (state = { 
      loading: false,
      success: false,
      error: false,
      comment: {}
    }, action) => {
    switch (action.type) {
      case UPDATE_COMMENT_REQUEST:
        return{
          loading: true,
        };
      
        case UPDATE_COMMENT_SUCCESS:
          return {
            loading: false,
            success: true,
            comment: action.payload
          };

        case UPDATE_COMMENT_FAIL:
          return {
            loading: false,
            error: action.payload
          };

        default:
          return state;
    }
  };

  export const commentDeleteReducer = (state = {
    loading: false,
    success: false,
    error: null,
  }, action) => {
    switch (action.type) {
      case COMMENT_DELETE_REQUEST:
        return { loading: true };
      case COMMENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case COMMENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };