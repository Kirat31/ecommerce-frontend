// frontend/components/reducers.js
import { FETCH_PRODUCTS_SUCCESS, CREATE_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAIL, CREATE_PRODUCT_FAIL, FETCH_PRODUCTS_REQUEST, CREATE_PRODUCT_REQUEST } from '../../constants/productConstants';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
        return {
            ...state,
            loading: true,
            error: null // Reset error when a new request is initiated
          };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case FETCH_PRODUCTS_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload // Set loading to false if fetching products fails
        };
        case CREATE_PRODUCT_REQUEST: // Handle request actions
    return {
        ...state,
        loading: true,
        error: null, // Reset error when a new request is initiated
    };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };
      case CREATE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false, 
          error: action.payload// Set loading to false if creating product fails
        };
    default:
      return state;
  }
};

export default productReducer;
