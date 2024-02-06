// FeaturedProducts.js
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios'; // Import axios for making HTTP requests

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products from backend
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/api/featured-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Featured Products
      </Typography>
      {/* Display featured product cards */}
    </Container>
  );
}

export default FeaturedProducts;
