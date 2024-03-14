import React, { useEffect, useState } from 'react';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, Pagination, Box, Slider, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import ProductCard from '../Home/ProductCard';
import { useAlert } from "react-alert";
import MetaData from "../Layouts/MetaData";

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

  const alert = useAlert();
  
  const { loading, error, products, totalPages, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { sellerInfo, isAuthenticated } = useSelector((state) => state.seller);
  // const isAdmin = user && user.role === 'admin';
console.log("total pages", totalPages);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(0);

  //const pageSize = 9; // Number of products per page (adjusted to 9)
  //const totalPages = Math.ceil(filteredProductsCount / resultPerPage); // Calculate total pages based on filtered products count

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, page, price, category, rating));
  }, [dispatch, keyword, page, price, category, rating, alert, error]);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingRight: '0px !important'}}>
          <MetaData title="PRODUCTS--ECOMMERCE" />
          <Typography variant="h4" gutterBottom>
            Products           
          </Typography>             
          {isAuthenticated && (
            <Button component={Link} to="/create-product" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Add Product
            </Button>
          )}
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
                <Slider
                  value={rating}
                  onChange={(event, newRating) => {
                    setRating(newRating);
                  }}
                  aria-labelledby='continuous-slider'
                  valueLabelDisplay='auto'
                  min={0}
                  max={5}
                />
              </Box>
            </Grid>
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            style={{ marginTop: '20px' }} 
          />
        </Container>
      )}
    </Container>
  );
}

export default Products;
