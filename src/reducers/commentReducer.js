// commentReducers.js

import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
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
  