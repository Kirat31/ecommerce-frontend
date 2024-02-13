import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Pagination } from '@mui/material';
import { fetchProducts, clearErrors } from '/redux/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import ProductCard from '../Home/ProductCard';
import Search from './Search';

function Products() {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector((state) => state.products);
  const { keyword } = useParams();
  const [page, setPage] = useState(1);
  const pageSize = 10; // Number of products per page
  const totalPages = Math.ceil(productsCount / pageSize);

  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [dispatch, keyword]);

  const handleSearch = (searchKeyword) => {
    dispatch(fetchProducts(searchKeyword));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ textAlign: 'center', paddingTop: '50px' }}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Search onSearch={handleSearch} placeholder="name" />
          <Grid container spacing={3} justifyContent="center">
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
