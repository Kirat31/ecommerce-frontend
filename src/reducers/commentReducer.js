// commentReducers.js

import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
    GET_ALL_COMMENTS_FAIL,
    GET_ALL_COMMENTS_REQUEST,
    GET_ALL_COMMENTS_SUCCESS,
    CLEAR_COMMENT_ERRORS,
  } from '../constants/commentConstants';
  
  export const commentAddReducer = (state = {}, action) => {
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

  export const commentListReducer = (state = { 
    loading: false,
    comments: [],
    totalPages: 0,
    error: null, 
  }, action) => {
    switch (action.type) {
      case GET_ALL_COMMENTS_REQUEST:
        return { 
           ...state, 
           loading: true
        };
      case GET_ALL_COMMENTS_SUCCESS:
        return { 
          ...state,
          loading: false, 
          comments: action.payload.comments, 
          totalPages: action.payload.totalPages,
          error: null, 
        };
      case GET_ALL_COMMENTS_FAIL:
        return { 
          ...state,
          loading: false, 
          error: action.payload 
        };
      default:
        return state;
    }
  };
  