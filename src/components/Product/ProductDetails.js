import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Divider, Box, Button, IconButton, Card, CardContent, Container } from '@mui/material';
import { Rating } from '@mui/material';
import { AddShoppingCart, Remove, Add } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { getProductDetails, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Loader from '../Layouts/Loader'
import { useAlert } from 'react-alert';

function ProductDetails() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { _id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [statusMessage, setStatusMessage] = useState('');
  const { product, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(_id));
  }, [dispatch, _id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      setStatusMessage('Cannot add more than available stock');
    }
  };

  const handleAddToCart = () => {
    // Implement logic to add the product to the cart
    console.log('Added to cart:', quantity);
  };

  const handleSubmitReview = () => {
    // Implement logic to submit review
  };

  return (
    <Container>
      <Box height="calc(100vh - 200px)" display="flex" alignItems="center" pt={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '0 10px' }}>
              <Carousel animation="slide" interval={3000} indicators={false}>
                {product.images && product.images.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Image ${index}`} style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }} />
                ))}
              </Carousel>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', maxWidth: '600px' }}>
            <Paper style={{ padding: '20px 10px', width: '100%', overflow: 'hidden' }}>
              <Typography variant="h4" gutterBottom>{product.name}</Typography>
              <Divider />
              <Box mt={2} display="flex" style={{ marginBottom: 10 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2">({product.numOfReviews} Reviews)</Typography>
              </Box>
              <Divider />
              <Typography variant="h5" style={{ marginTop: 10, marginBottom: 10 }}> ₹{product.price}</Typography>
              <Box mt={2} display="flex" alignItems="center" style={{ marginBottom: 10 }}>
                <IconButton onClick={decreaseQuantity}><Remove /></IconButton>
                <Typography variant="body2">{quantity}</Typography>
                <IconButton onClick={increaseQuantity}><Add /></IconButton>
                <Typography variant="body2" color="error">{statusMessage}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddShoppingCart />}
                  onClick={handleAddToCart}
                  style={{ marginTop: 10 }}
                >
                  Add to Cart
                </Button>
              </Box>
              <Divider />
              <Typography variant="body2" style={{ marginTop: 10 }}>In Stock: {product.stock}</Typography>
              <Typography variant="body2" style={{ marginTop: 10, marginBottom: 10 }}>Category: {product.category}</Typography>
              <Divider />
              <Typography variant="h6" style={{ marginTop: 10 }}>Description: </Typography>
              <Typography variant="body1" style={{ marginTop: 10 }}>{product.description}</Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmitReview} style={{ marginTop: 10 }}>Submit Review</Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box mt={4} style={{ padding: '0 10px' }}>
              <Typography variant="h5" gutterBottom>Reviews</Typography>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <Card key={index} variant="outlined" style={{ marginBottom: 10 }}>
                    <CardContent>
                      <ReviewCard review={review} />
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2">No Reviews yet</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ProductDetails;
