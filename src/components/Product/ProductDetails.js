import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Divider, Box, Button, IconButton, Card, CardContent,Container, TextField } from '@mui/material';
import { Rating } from '@mui/material';
import { AddShoppingCart, Remove, Add } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { getProductDetails, deleteProduct, clearErrors } from '../../actions/productAction';
import { addComment, clearReviewErrors } from '../../actions/commentAction'; // Import addComment action
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Loader from '../Layouts/Loader'
import { useAlert } from 'react-alert';
import MetaData from '../Layouts/MetaData';
import UpdateProductForm from './UpdateProductForm';

function ProductDetails() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const [statusMessage, setStatusMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [showReviewField, setShowReviewField] = useState(false); // State to track whether the review field should be displayed

  console.log('Product ID:', id); 
  const {product,  loading, error} = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.user);
  const { success: reviewSuccess, error: reviewError } = useSelector((state) => state.commentAdd);

  const isAdmin = user && user.role === 'admin';

 console.log('pro_name: ',product.name);

 useEffect(() =>{
    if (product) {
      console.log('Product:', product);
      console.log('Loading: ', loading);
      // Add more property access as needed
    } else {
      console.log('Product is undefined');
    }
  if(error){
    alert.error(error);
    dispatch(clearErrors());
  }
    //console.log('product', productDetails);
    console.log('Dispatching getProductDetails action...');
    // console.log(id);
    dispatch(getProductDetails(id));
  }, [dispatch, id]);


  useEffect(() => {
  if (reviewSuccess && showReviewField) { // Only show success message if a review was submitted and the review field was visible
    alert.success('Review submitted successfully');
    setShowReviewField(false);
    setReview('');
    setRating(0);
  }
}, [reviewSuccess, showReviewField, alert]);


  useEffect(() => {
    if (reviewError) {
      alert.error(reviewError);
      setShowReviewField(false);
      setReview('');
      setRating(0);
      dispatch(clearReviewErrors());
    }
  }, [reviewError, alert, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
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
    }
    else{
      setStatusMessage('Cannot add more than available stock');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
      navigate('/products');
    }
  };

  const handleAddToCart = () => {
    // if (quantity > product.stock) {
      
    //   return;
    // }
    // Add to cart logic here
    console.log('Added to cart:', quantity);
  };

  const handleSubmitReview = () => {
    setShowReviewField(true); // Show the review field when submit review is clicked
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleAddReview = () => {
    // Dispatch the addComment action here
    // You need to pass the user ID, product ID, review content, and rating to the action
    dispatch(addComment(user._id, product._id, review, rating));
    setShowReviewField(false); // Hide the review field after submitting the review
    setReview(''); // Clear the review content
    setRating(0); // Reset the rating
  };

  return (
    <Container>
      <Box>
          {loading? <Loader />: 
    <Box height="100vh-200px" display="flex" alignItems="center"  pt={5}>
      {isAdmin && (
        <Button component={Link} to={`/update-product/${id}`} variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Update Product
        </Button>
      )}
      {isAdmin && (
        <Button onClick={handleDelete} color="secondary">
          Delete Product
        </Button>
      )}
      <MetaData title={`${product.name} --ECOMMERCE` } />
      <Grid container spacing={3}>
        {/* Left side with image slideshow */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '0 10px' }}>
            {/* Display image slideshow */}
            <img src='/logo192.png' ></img>
            <Carousel animation="slide" interval={3000} indicators={false}>
              {product && product.images && product.images.map((imageUrl, index) => (
                <img src={imageUrl} alt={`Image ${index}`} style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }} />
                
              ))}
            </Carousel>
          </Paper>
        </Grid>

        {/* Right side with product details */}
        <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center',  maxWidth: '600px' }}>
          <Paper style={{ padding: '20px 10px', width: '100%', overflow: 'hidden' }}>
            {product && (<Typography variant="h4" gutterBottom >{product.name}</Typography>)}
            <Divider />
            <Box mt={2} display="flex" style={{ marginBottom: 10 }}>
              {product && (<Rating value={product.rating} precision={0.5} readOnly />)}
              {product && (<Typography variant="body2" >
                ({product.numOfReviews} Reviews)
              </Typography>)}
            </Box>
            <Divider/>
            {product && (<Typography variant="h5" style={{ marginTop: 10, marginBottom: 10 }}> ₹{product.price}</Typography>)}
            
            <Box mt={2} display="flex" alignItems="center" style={{ marginBottom: 10 }}>
              <IconButton onClick={decreaseQuantity}><Remove /></IconButton>
              <Typography variant="body2">{quantity}</Typography>
              <IconButton onClick={increaseQuantity}><Add /></IconButton>
              <Typography variant="body2" color="error" >
                {statusMessage}
              </Typography>
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
            
            {product && (<Typography variant="body2" style={{ marginTop: 10 }}>In Stock: {product.stock}</Typography>)}
            {product && (<Typography variant="body2" style={{ marginTop: 10, marginBottom: 10 }}>Category: {product.category}</Typography>)}
            <Divider />
            <Typography variant="h6" style={{marginTop: 10}}>Description: </Typography>
            {product && (<Typography variant="body1" style={{ marginTop: 10 }}>{product.description}</Typography>)}
            
            {user && (
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleSubmitReview} style={{ marginTop: 10 }}>Submit Review</Button>
            </Box>
            )}
            {showReviewField && (
              <Box mt={2}>
                <TextField
                  id="review"
                  label="Your Review"
                  multiline
                  rows={4}
                  value={review}
                  onChange={handleReviewChange}
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: 10 }}
                />
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    handleRatingChange(newValue);
                  }}
                />
                <Button variant="contained" color="primary" onClick={handleAddReview} style={{ marginTop: 10 }}>Add Review</Button>
              </Box>
            )}
            
          </Paper>
        </Grid>
        <Grid item xs={12}>
        <Box mt={4} style={{ padding: '0 10px' }}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          {product && product.reviews && product.reviews.length > 0 ? ( 
            product.reviews && product.reviews.map((review) => ( 
            <Card variant="outlined" style={{ marginBottom: 10 }}>
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
 } 
 </Box>
    </Container>

  );
}

export default ProductDetails;
