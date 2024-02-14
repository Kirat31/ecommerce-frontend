// FeaturedProducts.js
import React,{useEffect} from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard'; 
import { useSelector, useDispatch } from 'react-redux';
import {clearErrors, getProduct} from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import {useAlert} from "react-alert"
//import axios from 'axios'; // Import axios for making HTTP requests

function FeaturedProducts() {
  const alert = useAlert();

  const dispatch = useDispatch();

  const {loading, error, products, productsCount} = useSelector(
    (state)=>state.products
  );

  useEffect(()=>{
    if(error) {
      return alert.error(error);
     //dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Container>
      {loading? <Loader />: 
      <Container sx={{ textAlign: 'center', paddingTop: '50px' }}>
        <Typography variant="h4" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {products && products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
           ))} 
        </Grid>
        {/* Display featured product cards */}
      </Container>
      }
    </Container>
  );
}

export default FeaturedProducts;
