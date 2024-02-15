import React, { useEffect, useState } from 'react';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, Pagination, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import ProductCard from '../Home/ProductCard';
import Search from './Search';

function Products() {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);
  const { loading, error, products, productsCount } = useSelector((state) => state.products);
 
  const [page, setPage] = useState(1);
  const pageSize = 10; // Number of products per page
  const totalPages = Math.ceil(productsCount / pageSize);

  
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ textAlign: 'center', paddingTop: '50px' }}>
           <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" gutterBottom>
                Products           
              </Typography>
              
          </Box>
 
          <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
            {products &&
              products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Container>
      )}
    </Container>
  );
}

export default Products;
