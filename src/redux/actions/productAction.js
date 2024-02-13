// frontend/components/actions.js
import productService from '../services/productService';
import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, FETCH_PRODUCTS_REQUEST, CREATE_PRODUCT_REQUEST } from '../constants/productConstants';

export const fetchProducts = () => async (dispatch) => {
  try {
    // Dispatch action to indicate the start of fetching products
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    const products = await productService.getAllProducts();

    // Dispatch action to indicate successful fetching of products
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Dispatch action to indicate failure in fetching products
    dispatch({ type: FETCH_PRODUCTS_FAIL, payload: error.message });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    // Dispatch action to indicate the start of creating a product
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const product = await productService.createProduct(productData);

    // Dispatch action to indicate successful creation of a product
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: product });
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    // Dispatch action to indicate failure in creating a product
    dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.message });
    throw error;
  }
};
