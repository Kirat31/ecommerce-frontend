import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Pagination } from '@mui/material';
import { fetchProducts, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import ProductCard from '../Home/ProductCard';

function FeaturedProducts() {
  const dispatch = useDispatch();
  const productsState = useSelector(state => state.products);
  useEffect(() => {
    console.log('productsState:',productsState);
    dispatch(fetchProducts());
  }, [dispatch]);

  const { loading, error, products } = productsState;
  
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <Container>
      {/* {loading ? (
        <Loader />
      ) : ( */}
        <Container sx={{ textAlign: 'center', paddingTop: '50px' }}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {products &&
              products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </Container>
      {/* )} */}
    </Container>
  );
}

export default FeaturedProducts;
