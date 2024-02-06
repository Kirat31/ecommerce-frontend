// ProductCategories.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios'; // Import axios for making HTTP requests

function ProductCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch product categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shop by Category
      </Typography>
      <Grid container spacing={3}>
        {categories.map(category => (
          <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
            {/* Display category cards */}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductCategories;
