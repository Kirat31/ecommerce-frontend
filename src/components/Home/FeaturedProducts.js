import React, { useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import { useAlert } from 'react-alert';

function FeaturedProducts() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
      //dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Container sx={{ backgroundColor: '#f5f5f5', padding: '30px 0', textAlign: 'center' }}>
      {loading ? (
        <Loader />
      ) : (
        <Container>
         <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto', fontWeight: 500, color: '#333' }}>
  Featured Products
</Typography>
          <Grid container spacing={3} justifyContent="center">
            {products &&
              products.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </Container>
      )}
    </Container>
  );
}

export default FeaturedProducts;
