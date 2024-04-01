import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BlueButton, DarkRedButton, GreenButton } from '../../utils/buttonStyles';
import { Link } from 'react-router-dom';
import { deleteProduct, getProductDetails, clearErrors } from '../../actions/productAction';
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Avatar, Box, Card, CircularProgress, Collapse, IconButton, Stack, TextField, Typography } from '@mui/material';
// import altImage from "../../../assets/altimg.png";
// import Popup from '../../../components/Popup';
// import { generateRandomColor, timeAgo } from '../../../utils/helperFunctions';
// import { underControl } from '../../../redux/userSlice';
// import AlertDialogSlide from '../../../components/AlertDialogSlide';

const ViewProductSeller = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productID = params.id;
console.log("id",productID);

const {product,  loading, error} = useSelector((state) => state.productDetails);
const { isAuthenticated, seller } = useSelector((state)=>state.seller);

// console.log("erfer",product);

useEffect(() => {
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
  console.log("in effect");
  dispatch(getProductDetails(productID));
}, [ dispatch, productID]);

//   const { loading, status, error, productDetails, responseDetails } = useSelector(state => state.user);

  return (
    <>
      {loading ?
        <div><CircularProgress /> </div>
        :(
        <>
         {console.log("pro", product.images[0].url)};
                <ProductContainer>
                  <ProductImage src={product && product.images[0]?.url} alt={product && product.name} />
                  <ProductInfo>
                    <ProductName>{product && product.name}</ProductName>
                    <PriceContainer>
                      <PriceCost>₹{product && product.price }</PriceCost>
                    </PriceContainer>
                    <Description>{product && product.description}</Description>
                    <ProductDetails>
                      <p>Category: {product && product.category}</p>
                      <p>Subcategory: {product && product.subcategory}</p>
                    </ProductDetails>
                  </ProductInfo>
                </ProductContainer>

                <ButtonContainer>
                  <GreenButton
                    component={Link} to={`/Seller/update-product/${productID}`}
                  > Edit Product
                  </GreenButton>
                </ButtonContainer>
            </>
      )}
    </>
  );
};

export default ViewProductSeller;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const ProductImage = styled.img`
    max-width: 300px;
    /* width: 50%; */
    margin-bottom: 20px;
    margin-right: 40px;
`;

const EditImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 8px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
`;

const ProductName = styled.h1`
    font-size: 24px;
`;

const PriceContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`;

const PriceMrp = styled.p`
    margin-top: 8px;
    text-decoration: line-through;
    color: #525050;
`;

const PriceCost = styled.h3`
    margin-top: 8px;
`;

const PriceDiscount = styled.p`
    margin-top: 8px;
    color: darkgreen;
`;

const Description = styled.p`
    margin-top: 16px;
`;

const ProductDetails = styled.div`
    margin: 16px;
`;

const ButtonContainer = styled.div`
    margin: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ReviewWritingContainer = styled.div`
    margin: 6rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-direction:column;
`;

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ReviewCard = styled(Card)`
  && {
    background-color: white;
    margin-bottom: 2rem;
    padding: 1rem;
  }
`;

const ReviewCardDivision = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewDetails = styled.div`
  flex: 1;
`;

// import React, { useEffect, useState } from 'react';
// import { Grid, Typography, Paper, Divider, Box, Button, IconButton, Card, CardContent,Container, TextField } from '@mui/material';
// import { Rating } from '@mui/material';
// import { AddShoppingCart, Remove, Add } from '@mui/icons-material';
// import Carousel from 'react-material-ui-carousel';
// import { getProductDetails, deleteProduct, clearErrors } from '../../actions/productAction';
// import { addComment, getAllComments, clearReviewErrors } from '../../actions/commentAction'; // Import addComment action
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// // import ReviewCard from './ReviewCard';
// import Loader from '../Layouts/Loader'
// import { useAlert } from 'react-alert';
// import MetaData from '../Layouts/MetaData';

// function ProductDetails() {
//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [statusMessage, setStatusMessage] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [review, setReview] = useState('');
//   const [rating, setRating] = useState(0);
//   const [showReviewField, setShowReviewField] = useState(false); // State to track whether the review field should be displayed

//   console.log('Product ID:', id); 
//   const {product,  loading, error} = useSelector((state) => state.productDetails);
//   const { user } = useSelector((state) => state.user);
//   const { isAuthenticated } = useSelector((state)=>state.seller);
//   const { success: reviewSuccess, error: reviewError } = useSelector((state) => state.commentAdd);
//   const { loading: commentLoading, comments, totalPages, error: commentError } = useSelector((state) => state.commentList);


//  console.log('pro_name: ',product.name);

//  useEffect(() =>{
//     if (product) {
//       console.log('Product:', product);
//       console.log('Loading: ', loading);
//       // Add more property access as needed
//     } else {
//       console.log('Product is undefined');
//     }
//   if(error){
//     alert.error(error);
//     dispatch(clearErrors());
//   }
//     //console.log('product', productDetails);
//     console.log('Dispatching getProductDetails action...');
//     // console.log(id);
//     dispatch(getProductDetails(id));
//     dispatch(getAllComments({product:id}));
//   }, [dispatch, id]);

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const increaseQuantity = () => {
//     if (quantity < product.stock) {
//       setQuantity(quantity + 1);
//     }
//     else{
//       setStatusMessage('Cannot add more than available stock');
//     }
//   };

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       dispatch(deleteProduct(id));
//       navigate('/products');
//     }
//   };

//   const handleAddToCart = () => {
//     // if (quantity > product.stock) {
      
//     //   return;
//     // }
//     // Add to cart logic here
//     console.log('Added to cart:', quantity);
//   };

//   const handleSubmitReview = () => {
//     setShowReviewField(true); // Show the review field when submit review is clicked
//   };

//   const handleReviewChange = (e) => {
//     setReview(e.target.value);
//   };

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   const handleAddReview = () => {
//     // Dispatch the addComment action here
//     // You need to pass the user ID, product ID, review content, and rating to the action
//     dispatch(addComment(user._id, product._id, review, rating));
//     if (reviewSuccess && showReviewField) { // Only show success message if a review was submitted and the review field was visible
//       alert.success('Review submitted successfully');
//       setShowReviewField(false);
//       setReview('');
//       setRating(0);
//     }
//     if (reviewError) {
//       alert.error(reviewError);
//       setShowReviewField(false);
//       setReview('');
//       setRating(0);
//       dispatch(clearReviewErrors());
//     }
//   };

//   return (
//     <Container sx={{
//       background: '#e0f2f1', // Lightest shades of the original gradient
//       // padding: '20px 0',
//       paddingBottom: '20px'
      
//     }}>
//       <Box>
//           {loading? <Loader />: <Container>
            
//     <Box height="100vh-200px" display="flex" alignItems="center"  pt={5} >
//     {/* <Box>
//           {isAuthenticated && (
//         <Button component={Link} to={`/update-product/${id}`} variant="contained" color="primary" >
//           Update Product
//         </Button>
//       )}
//       {isAuthenticated && (
//         <Button onClick={handleDelete} color="secondary">
//           Delete Product
//         </Button>
//       )}
//       </Box> */}
//       <MetaData title={`${product.name} --ECOMMERCE` } />
//       <Grid container spacing={1}>
//       <Grid item xs={12} >
//     <Box display="flex" justifyContent="flex-end" mb={2} >
//       {isAuthenticated && (
//         <Button component={Link} to={`/update-product/${id}`} variant="contained" color="primary" >
//           Update Product
//         </Button>
//       )}
//       {isAuthenticated && (
//         <Button onClick={handleDelete} color="secondary">
//           Delete Product
//         </Button>
//       )}
//     </Box>
//   </Grid>
//         {/* Left side with image slideshow */}
//         <Grid item xs={12} md={6}  >
//           <Paper style={{ padding: '0 10px' }} sx={{ bgcolor: '#f5f5f5', height:'400px' }}>
//             {/* Display image slideshow */}
//             {/* <img src='/logo192.png' ></img> */}
//             <Carousel animation="slide" interval={3000} indicators={false}>
//               {product && product.images && product.images.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image.url}
//                   alt={`Image ${index}`}
//                   style={{ width: '100%',  objectFit: 'contain' }} // Adjusted maxHeight to 'auto'
//                 />
//               ))}
//             </Carousel>
//           </Paper>
//         </Grid>

//         {/* Right side with product details */}
//         <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center',  maxWidth: '600px' }}>
//           <Paper style={{ padding: '20px 10px', width: '100%', overflow: 'hidden' }} sx={{ bgcolor: '#f5f5f5' }}>
//             {product && (<Typography variant="h4" gutterBottom >{product.name}</Typography>)}
//             <Divider />
//             <Box mt={2} display="flex" style={{ marginBottom: 10 }}>
//               {product && (<Rating value={product.rating} precision={0.5} readOnly />)}
//               {product && (<Typography variant="body2" >
//                 ({product.numOfReviews} Reviews)
//               </Typography>)}
//             </Box>
//             <Divider/>
//             {product && (<Typography variant="h5" style={{ marginTop: 10, marginBottom: 10 }}> ₹{product.price}</Typography>)}
            
//             <Box mt={2} display="flex" alignItems="center" style={{ marginBottom: 10 }}>
//               <IconButton onClick={decreaseQuantity}><Remove /></IconButton>
//               <Typography variant="body2">{quantity}</Typography>
//               <IconButton onClick={increaseQuantity}><Add /></IconButton>
//               <Typography variant="body2" color="error" >
//                 {statusMessage}
//               </Typography>
//               <Button
//               variant="contained"
//               startIcon={<AddShoppingCart />}
//               onClick={handleAddToCart}
//               style={{ marginTop: 10 }}
//               sx={{bgcolor: '#00897b'}}
//               >
                
//               </Button>
//             </Box>
//             <Divider />
            
//             {/* {product && (<Typography variant="body2" style={{ marginTop: 10 }}>In Stock: {product.stock}</Typography>)} */}
//             {product && (<Typography variant="body2" style={{ marginTop: 10, marginBottom: 10 }}>Category: {product.category}</Typography>)}
//             <Divider />
//             <Typography variant="h6" style={{marginTop: 10}}>Description: </Typography>
//             {product && (<Typography variant="body1" style={{ marginTop: 10 }}>{product.description}</Typography>)}
            
            
            
//           </Paper>
//         </Grid>
//        </Grid>
//     </Box>
//     </Container>
//  } 
//  </Box>
//     </Container>

//   );
// }

// export default ProductDetails;
