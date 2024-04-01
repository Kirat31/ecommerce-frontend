import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Divider, Box, Button, IconButton, Card, CardContent,Container, TextField, Pagination, InputAdornment } from '@mui/material';
import { Rating } from '@mui/material';
import { AddShoppingCart, Remove, Add, Search as SearchIcon } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { getProductDetails, deleteProduct, clearErrors } from '../../actions/productAction';
import { addComment, getAllComments, viewComment, clearReviewErrors } from '../../actions/commentAction'; // Import addComment action
import { addRating, getAllRatings, clearRatingErrors } from '../../actions/ratingAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useLocation } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Loader from '../Layouts/Loader'
import { useAlert } from 'react-alert';
import MetaData from '../Layouts/MetaData';


function ProductDetails() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const location = useLocation();
  const { id } = useParams();
  const [statusMessage, setStatusMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [showReviewField, setShowReviewField] = useState(false); // State to track whether the review field should be displayed
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  console.log('Product ID:', id); 
  const { product,  loading, error } = useSelector((state) => state.productDetails);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  const { success: reviewSuccess, error: reviewError } = useSelector((state) => state.commentAdd);
  const { loading: commentLoading, comments, error: commentError, totalComments, totalPages } = useSelector((state) => state.allComments);
  const { success: ratingSuccess, error: ratingError } = useSelector((state) => state.ratingAdd);
  const { loading: ratingLoading, ratings, error: allRatingError, totalRating, totalPages: totalRatingPages } = useSelector((state) => state.allRatings);
  //const { loading, comments, totalPages,}


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

  // const page=1;
  const resultPerPage=10;

  useEffect(() => {
    console.log("prIdddddddddddddddddddddddddd", id);
    if(commentError){
      console.log("errrr", commentError);
      alert.error(commentError);
      dispatch(clearReviewErrors());
    }
    
    dispatch(getAllComments(id, searchTerm, page, resultPerPage));
  }, [dispatch, id, searchTerm, page, resultPerPage]);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };


  useEffect(() => {
    console.log("view  ratings ");
    if(allRatingError){
      console.log("errrrating", allRatingError);
      alert.error(allRatingError);
      dispatch(clearRatingErrors);
    }

    dispatch(getAllRatings(id, page, resultPerPage));
  }, [dispatch, id, ]);

  const handleViewComment = (commentId) => {
    console.log("view comment");
    dispatch(viewComment(commentId));
    // Perform any necessary action after viewing comment
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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

  // const handleDelete = () => {
  //   if (window.confirm('Are you sure you want to delete this product?')) {
  //     dispatch(deleteProduct(id));
  //     navigate('/products');
  //   }
  // };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert.error("Please log in to add to your cart");
    }
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
    console.log('in add reviewssss');
    // Dispatch the addComment action here
    // You need to pass the user ID, product ID, review content, and rating to the action
    console.log(user._id, product._id, review, rating);
    dispatch(addComment(user._id, product._id, review, rating));
    
    console.log("after dispatch")
    if (reviewSuccess && showReviewField ) { // Only show success message if a review was submitted and the review field was visible
      alert.success('Review submitted successfully');
      setShowReviewField(false);
      setReview('');
     
    }
    if (reviewError ) {
      alert.error(reviewError);
      alert.error(ratingError);
      setShowReviewField(false);
      setReview('');
      
      dispatch(clearReviewErrors());
     
    }
  };

  const handleAddRating = () => {
    dispatch(addRating(user._id, product._id, rating));
    if(ratingSuccess){
      alert.success('Rating added suceessfully');
      setRating(0);
    }
    if(ratingError){
      alert.error(ratingError);
      setRating(0);
      dispatch(clearRatingErrors());
    }

  }
  // const mockReviews = [
  //   { 
  //     id: 1, 
  //     user: "John Doe", 
  //     rating: 4, 
  //     heading: "Great Product!", 
  //     detailedReview: "I really liked this product. It exceeded my expectations and the quality is excellent. Would definitely recommend it to others!" 
  //   },
  //   { 
  //     id: 2, 
  //     user: "Jane Smith", 
  //     rating: 5, 
  //     heading: "Highly Recommended!", 
  //     detailedReview: "This product is amazing! It's exactly what I needed and the customer service was exceptional. Will buy again!" 
  //   },
  //   // Add more mock reviews as needed
  // ];

  return (
    <Box sx={{
      background: '#EDEDED', // Lightest shades of the original gradient
      // padding: '20px 0',
      paddingBottom: '20px'
      
    }}>
      <Box>
        {loading? <Loader />: <Box>
            
          <Box height="100vh-200px" display="flex" alignItems="center"  pt={1} >
            <MetaData title={`${product.name} --ECOMMERCE` } />
            <Grid container spacing={1}>
              <Grid item xs={12} >
                
              </Grid>
              
              <Grid container spacing={2}> {/* Add spacing between Grid items */}
                {/* Left side with image slideshow */}
                <Grid item xs={12} md={6}>
                  {/* Wrap the image slideshow inside the Paper component */}
                  <Paper style={{  height: '500px', backgroundColor: 'white', width: '400px', marginLeft: '100px' }}>
                    {/* Display image slideshow */}
                    <Carousel animation="slide" interval={3000} indicators={false}>
                      {product && product.images && product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Image ${index}`}
                          style={{ width: '100%', objectFit: 'contain' }}
                        />
                      ))}
                    </Carousel>
                  </Paper>
                </Grid>

                {/* Right side with product details */}
                <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', maxWidth: '600px' }}>
                  {/* Product details */}
                  {product && (
                    <div style={{marginLeft: '30px'}}>
                      <Typography variant="h4" gutterBottom>{product.name}</Typography>
                      <Divider />
                      <Box mt={2} display="flex" alignItems="center">
                        <Rating value={product.rating} precision={0.5} readOnly />
                        <Typography variant="body2">
                          ({product.numOfReviews} Reviews)
                        </Typography>
                      </Box>
                      <Divider />
                      <Typography variant="h5" style={{ marginTop: 10, marginBottom: 10 }}> ₹{product.price}</Typography>
                      <Box mt={2} display="flex" alignItems="center" style={{ marginBottom: 10 }}>
                    <IconButton onClick={decreaseQuantity}><Remove /></IconButton>
                    <Typography variant="body2">{quantity}</Typography>
                    <IconButton onClick={increaseQuantity}><Add /></IconButton>
                    <Typography variant="body2" color="error" >
                      {statusMessage}
                    </Typography>
                    <Button
                    variant="contained"
                    startIcon={<AddShoppingCart />}
                    onClick={handleAddToCart}
                    style={{ marginTop: 10 }}
                    sx={{bgcolor: '#36454F'}}
                    >
                
                    </Button>
                  </Box>
                  <Divider />
            
                   {/* {product && (<Typography variant="body2" style={{ marginTop: 10 }}>In Stock: {product.stock}</Typography>)} */}
                  {product && (<Typography variant="body2" style={{ marginTop: 10, marginBottom: 10 }}>Category: {product.category}</Typography>)}
                  <Divider />
                  <Typography variant="h6" style={{marginTop: 10}}>Description: </Typography>
                  {product && (<Typography variant="body1" style={{ marginTop: 10 }}>{product.description}</Typography>)}
                    </div>
                  )}
                </Grid>

                {/* Reviews section */}
                <Grid item xs={12}>
                  {commentLoading? <Loader />:(
                  <Container sx={{backgroundColor: 'white', padding: '30px'}}>
                    <Typography variant="h5" >Reviews</Typography>
                   
                    {isAuthenticated && <Button variant="contained" color="primary" onClick={handleSubmitReview} style={{ marginTop: 10, backgroundColor: '#755B69' }}>Add Review</Button>}
                    
                    {showReviewField && (
                      <Box mt={2} sx={{marginLeft:'40px'}}>
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
                        <Button variant="contained" color="primary" onClick={()=>{handleAddReview(); handleAddRating();}} style={{ marginTop: 10, backgroundColor: '#755B69' }}>Submit</Button>
                      </Box>
                    )}
                    {comments && comments.length > 0 ? ( 
                      comments.map((comment) => ( 
                        <>
                        <Card key={comment._id} variant="none" >
                          <CardContent>
                            <ReviewCard comment={comment} onViewComment={handleViewComment}/> 
                          </CardContent>
                          <Divider />
                        </Card> 
                       
                        </>
                      ))        
                    ) : (
                      <Typography variant="body2" sx={{marginLeft: '40px'}}>No Reviews yet</Typography>
                    )}
                    
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
                </Grid>
              </Grid>
            
            </Grid>
          </Box>
          {/*  </Grid> */}
          {/* </Box> */}
        </Box>
      } 
    </Box>
  </Box>

  );
}

export default ProductDetails;
