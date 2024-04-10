import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    ALL_PRODUCTS_BY_SELLER_FAIL,
    ALL_PRODUCTS_BY_SELLER_REQUEST,
    ALL_PRODUCTS_BY_SELLER_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/productConstants";


export const productReducer = (state = { products: [] }, action) =>{
    switch(action.type) {
        case ALL_PRODUCT_REQUEST:
            return{
                loading: true,
                products: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
                totalPages: action.payload.totalPages
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        case UPDATE_PRODUCT_REQUEST:
            return { 
                loading: true 
            };
        
        case UPDATE_PRODUCT_SUCCESS:
            return { 
                loading: false, 
                success: true, 
                product: action.payload 
            };
        
        case UPDATE_PRODUCT_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            };
            
        default:
            return state;
        
    }
};

export const productDetailsReducer = (state = { product: {} }, action) =>{
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading: true,
                ...state,
                
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
        
    }
};

export const productsBySellerReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_PRODUCTS_BY_SELLER_REQUEST:
        return { loading: true, products: [] };
      case ALL_PRODUCTS_BY_SELLER_SUCCESS:
        return { loading: false, products: action.payload };
      case ALL_PRODUCTS_BY_SELLER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_PRODUCT_REQUEST:
        return { 
            loading: true 
        };
      case CREATE_PRODUCT_SUCCESS:
        return { 
            loading: false, 
            success: true, 
            product: action.payload 
        };
      case CREATE_PRODUCT_FAIL:
        return { 
            loading: false, 
            error: action.payload 
        };
      default:
        return state;
    }
};

export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
        return { 
            loading: true 
        };
      case DELETE_PRODUCT_SUCCESS:
        return { 
            loading: false, 
            success: true, 
            message: action.payload 
        };
      case DELETE_PRODUCT_FAIL:
        return { 
            loading: false, 
            error: action.payload 
        };
      case CLEAR_ERRORS:
        return {};
      default:
        return state;
    }
  };

