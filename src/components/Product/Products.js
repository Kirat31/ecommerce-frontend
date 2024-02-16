import React, { useEffect, useState } from 'react';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, Pagination, Box, Slider, Divider, List, ListItem, ListItemText } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import ProductCard from '../Home/ProductCard';

const categories = [
  "Laptops",
  "Electronics",
  "Watches",
  "Computers",
  "Mobile Phones",
  "Accessories"
]

function Products() {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  
  const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState("")
  const pageSize = 10; // Number of products per page
  const totalPages = Math.ceil(productsCount / pageSize);

  const handlePageChange = (e) => {
    setPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, page, price, category));
  }, [dispatch, keyword, page, price, category]);

  let count = filteredProductsCount;

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingRight: '0px !important'}}>
           {/* <Box display="flex" alignItems="center" justifyContent="space-between"> */}
              <Typography variant="h4" gutterBottom>
                Products           
              </Typography>
              
          {/* </Box> */}
 
          <Grid container spacing={3} justifyContent="center" alignItems="flex-start" style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={9}>
            <Grid container spacing={3}>
              {products &&
                products.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              }
            </Grid>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{width: '80%', margin: '0 auto'}}>
                <Typography id='range-slider' gutterBottom textAlign="left">
                  Price 
                </Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  min={0}
                  max={30000}
                  sx={{ width: '100%' }}
                />
                <Divider />
                <Typography gutterBottom textAlign="left" style={{ marginTop: '20px' }}>Categories</Typography>
                <List className="categoryBox">
                  {categories.map((category) => (
                    <ListItem button key={category} onClick={() => setCategory(category)}>
                      <ListItemText primary={category} primaryTypographyProps={{ style: { color: '#888' } }} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <Typography gutterBottom textAlign="left" style={{ marginTop: '20px' }}>Ratings Above</Typography>
              </Box>
            </Grid>
          </Grid>
          {resultPerPage < count &&(
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            style={{ marginTop: '20px' }} 
          />
          )}
        </Container>
      )}
    </Container>
  );
}

export default Products;
