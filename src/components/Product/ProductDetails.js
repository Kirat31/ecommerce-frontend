import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Divider, Box, Button, IconButton, Card, CardContent,Container } from '@mui/material';
import { Rating } from '@mui/material';
import { AddShoppingCart, Remove, Add } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { getProductDetails, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Loader from '../Layouts/Loader'
import { useAlert } from 'react-alert';
import MetaData from '../Layouts/MetaData';

function ProductDetails() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [statusMessage, setStatusMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  // console.log('Product ID:', id); 
  const {product,  loading, error} = useSelector((state) => state.productDetails);


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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  

  // const product = {
  //   id: '1',
  //   name: 'Sample Product',
  //   description: 'This is a sample product description.',
  //   price: 19.99,
  //   stock: 50,
  //   category: 'Electronics',
  //   images: [
  //     'https://example.com/image1.jpg',
  //     'https://example.com/image2.jpg',
  //     'https://example.com/image3.jpg',
  //   ],
  //   rating: 4,
  //   numOfReviews: 4,
  //   reviews: [
  //     {
  //       title: 'Great product!',
  //       content: 'I am really satisfied with this product. It exceeded my expectations.',
  //       rating: 5,
  //       user: 'John Doe'
  //     },
  //     {
  //       title: 'Decent quality',
  //       content: 'The product quality is good for the price. Would recommend it to others.',
  //       rating: 4,
  //       user: 'Jane Smith'
  //     },
  //     {
  //       title: 'Not bad, not great',
  //       content: 'This product is okay, but it could be better. Some features are lacking.',
  //       rating: 3,
  //       user: 'Bob Johnson'
  //     },
  //     {
  //       title: 'Disappointed',
  //       content: 'I expected better quality for the price. The product feels cheaply made.',
  //       rating: 2,
  //       user: 'Alice Williams'
  //     }
  //   ]
  // };

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

  const handleAddToCart = () => {
    // if (quantity > product.stock) {
      
    //   return;
    // }
    // Add to cart logic here
    console.log('Added to cart:', quantity);
  };

  const handleSubmitReview = () => {
    // Implement submit review functionality here
  };


  return (
    <Container>
      <Box>
          {loading? <Loader />: 
    <Box height="100vh-200px" display="flex" alignItems="center"  pt={5}>
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
            
           
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleSubmitReview} style={{ marginTop: 10 }}>Submit Review</Button>
            </Box>
            
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
