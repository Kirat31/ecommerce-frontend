import React, { useEffect, useState } from 'react';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, Pagination, Box, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import ProductCard from '../Home/ProductCard';
import { useAlert } from "react-alert";
import MetaData from "../Layouts/MetaData";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const categories = [
  "Men",
  "Electronics",
  "Women",
  "Home & Furniture",
  "TVs & Appliances",
  "Sports, Books & More",
];

const priceRanges = [
  { label: 'Under ₹1,000', value: [0, 1000] },
  { label: '₹1,000 - ₹5,000', value: [1000, 5000] },
  { label: '₹5,000 - ₹10,000', value: [5000, 10000] },
  { label: '₹10,000 - ₹20,000', value: [10000, 20000] },
  { label: 'Over ₹20,000', value: [20000, 30000] },
];

function Products() {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alert = useAlert();
  
  const { loading, error, products, totalPages } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.seller);

  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

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

  const handlePriceChange = (selectedPrice) => {
    setPrice(selectedPrice);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <Container sx={{
      textAlign: 'center',
    }}>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingRight: '0px !important'}}>
          <MetaData title="PRODUCTS--ECOMMERCE" />  
          {isAuthenticated && (
            <Button component={Link} to="/create-product" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Add Product
            </Button>
          )}
          <Grid container spacing={3} justifyContent="center" alignItems="flex-start" >
            <Grid item xs={12} sm={9} sx={{backgroundColor: 'white'}}>
              <Grid container spacing={4}>
                {products &&
                  products.map((product) => (
                    <Grid item key={product.id} lg={3}>
                      <ProductCard product={product} />
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3} sx={{backgroundColor: 'white', paddingBottom: '20px'}}>
              <Box sx={{width: '80%', margin: '0 auto'}}>
                <Typography gutterBottom textAlign="left">
                  Price 
                </Typography>
                <Divider />
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                  {priceRanges.map((range) => (
                    <Button
                      key={range.label}
                      onClick={() => handlePriceChange(range.value)}
                      sx={{ marginBottom: '8px', color: price[0] === range.value[0] && price[1] === range.value[1] ? '#00897b' : 'black'}}
                    >
                      {range.label}
                    </Button>
                  ))}
                </Box>
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
                <Typography gutterBottom textAlign="left" style={{ marginTop: '20px', marginBottom: '20px' }}>Ratings Above</Typography>
                <Rating
                  value={rating}
                  onChange={(event, newRating) => handleRatingChange(newRating)}
                  max={5}
                  icon={<StarIcon />}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              style={{ marginTop: '20px' }} 
            />
          </Grid>
        </Container>
      )}
    </Container>
  );
}

export default Products;
