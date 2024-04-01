import {
    ADD_RATING_FAIL,
    ADD_RATING_REQUEST,
    ADD_RATING_SUCCESS,
    GET_ALL_RATING_FAIL,
    GET_ALL_RATING_REQUEST,
    GET_ALL_RATING_SUCCESS,
    CLEAR_RATING_ERRORS
} from '../constants/ratingConstants'

export const ratingAddReducer = (state = {
    loading: false,
    success: false,
    rating: 0,
    error: null

}, action) => {
    switch (action.type) {
      case ADD_RATING_REQUEST:
        return { 
            loading: true 
        };
      case ADD_RATING_SUCCESS:
        return { 
            loading: false, 
            success: true, 
            rating: action.payload 
        };
      case ADD_RATING_FAIL:
        return { 
            loading: false, 
            error: action.payload 
        };

        case CLEAR_RATING_ERRORS:
            return {
              ...state,
              error: null,
            };
      default:
        return state;
    }
  };

  export const allRatingsReducer = (state = {
    rating: 0,
    loading: false,
    error: null,
    totalRating: 0,
    totalPages: 0
  }, action) => {
    switch (action.type) {
      case GET_ALL_RATING_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_ALL_RATING_SUCCESS:
        return { ...state, loading: false, rating: action.payload.data.rating, totalRating: action.payload.data.totalRating, totalPages: action.payload.data.totalPages  };
      case GET_ALL_RATING_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };