// frontend/services/productService.js
const API_URL = 'http://localhost:4000/api/v1/product';

const productService = {
  getAllProducts: async () => {
    try{
        const response = await fetch(API_URL + '/products');
        if(!response.ok){
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
  },
  createProduct: async (productData) => {
    try{
        const response = await fetch(API_URL + '/createProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to create product');
        }
        return await response.json();
    }catch (error) {
        throw new Error(error.message);
      }
    },
};

export default productService;
