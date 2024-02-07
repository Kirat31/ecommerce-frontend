// ProductDetails.js
import React from 'react';
import { Container } from '@mui/material';
//import ProductDetailsComponent from './ProductDetailsComponent'; // Assuming you have a component for displaying product details
import AddProductForm from './AddProductForm'; // Import the AddProductForm component

function ProductDetails() {
  return (
    <Container>
      {/* Add the AddProductForm component */}
      <AddProductForm />
      {/* Add the ProductDetailsComponent to display product details */}
      {/* <ProductDetailsComponent /> */}
    </Container>
  );
}

export default ProductDetails;
