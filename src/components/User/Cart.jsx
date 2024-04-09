import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts, decreaseProductInCart, updateProductInCart, deleteProductFromCart } from '../../actions/cartAction';
import Loader from '../Layouts/Loader';
import { useAlert } from 'react-alert';
import { Remove, Add, Delete } from '@mui/icons-material';
import image from '../../images/image.png';

const GreyBackground = styled('div')`
  background-color: white;
  border: 16px;
`;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartProducts, loading } = useSelector((state) => state.cartProducts);
  const { user } = useSelector((state) => state.user);
  const [localCartProducts, setLocalCartProducts] = useState([]); // Local state for cart products
  const [quantities, setQuantities] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to update local cart products
  const updateLocalCartProducts = () => {
    if (cartProducts) {
      setLocalCartProducts(cartProducts);
      let total = 0;
      cartProducts.forEach(product => {
        total += product.quantity;
      });
      setTotalQuantity(total);
    }
  };

  useEffect(() => {
    updateLocalCartProducts(); // Initialize local cart products
  }, [cartProducts]);

  useEffect(() => {
    dispatch(getCartProducts(user._id));
  }, [dispatch, user._id]);

  useEffect(() => {
    // Calculate total quantity whenever quantities state changes
    let total = 0;
    for (const key in quantities) {
      total += quantities[key];
    }
    setTotalQuantity(total);
  }, [quantities]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    localCartProducts && localCartProducts.forEach((product) => {
      totalPrice += product.price * (quantities[product._id] || product.quantity);
    });
    return totalPrice.toFixed(2);
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    console.log("currentQuantity", currentQuantity);
    console.log("new quantity", quantities[productId]);
    if (currentQuantity > 1) {
      const newQuantity = Math.max(currentQuantity - 1, 1);
      const difference = currentQuantity - newQuantity;
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: Math.max(currentQuantity - 1, 1)
      }));
      dispatch(decreaseProductInCart(user._id, productId, difference)); 
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try{
      console.log("newQuantity", newQuantity);
      console.log("old quantity", quantities[productId]);
      const difference = newQuantity - (quantities[productId] || 0);
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: newQuantity
      }));
    console.log("in update", user._id, productId, difference);
    dispatch(updateProductInCart(user._id, productId, difference));
    const totalPrice = calculateTotalPrice();
    // setTotalPrice(totalPrice);
  } catch (error) {
    console.error('Error updating product quantity:', error);
  }
  };

  const handleDeleteProduct = (productId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product from the cart?');

    if (isConfirmed) {
      dispatch(deleteProductFromCart(user._id, productId));
      setLocalCartProducts(localCartProducts.filter(product => product._id !== productId));
  
    };
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{ backgroundColor: '#EDEDED' }}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', padding: '10px' }}>
          {localCartProducts && localCartProducts.length === 0 ? (
            <img src={image} alt="Empty Cart" sx={{ height: '15px', width: '15px', alignItems: 'center' }} /> 
          ) : (
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ border: '15px' }}>
                <CardContent>
                  <Grid container spacing={4}>
                    {localCartProducts && localCartProducts.map((product) => (
                      <Grid item xs={12} lg={8} key={product._id}>
                        <Card sx={{ display: 'flex', alignItems: 'center' }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={product.img}
                            alt="Product img"
                            sx={{ maxWidth: '200px' }}
                          />
                          <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                              {product.name}
                            </Typography>
                            <Typography variant="h6" component="div" gutterBottom>
                              ₹{product.price}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                              {product.category}
                            </Typography>
                            <Box mt={2} display="flex" alignItems="center" style={{ marginBottom: 10 }}>
                              <IconButton onClick={() => handleDecreaseQuantity(product.productId, (isNaN(quantities[product.productId]) ? product.quantity : quantities[product.productId]) + 1) }>
                                <Remove />
                              </IconButton>
                              <Typography variant='h6' color="textPrimary" style={{ marginTop: '10px' }} gutterBottom>
                                {quantities[product.productId] || product.quantity}
                              </Typography>
                              <IconButton onClick={() => handleUpdateQuantity(product.productId, (isNaN(quantities[product.productId]) ? product.quantity : quantities[product.productId]) + 1) }>
                                <Add />
                              </IconButton>
                            </Box>
                          </CardContent>
                          <IconButton onClick={() => handleDeleteProduct(product._id)}>
                            <Delete />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))}
                    <Grid item xs={12} lg={4} style={{ marginTop: '00px' }}>
                      <GreyBackground>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            SubTotal
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            Total Items: {totalQuantity}
                          </Typography>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Total price: ₹ {calculateTotalPrice()}
                          </Typography>
                          <Button variant="contained" component={Link} to="/checkout" fullWidth sx={{ backgroundColor: '#36454F' }}>
                            Complete Payment
                          </Button>
                          <Button sx={{ paddingLeft: '20px', marginTop: '30px', color: '#36454F' }} onClick={handleClick}>
                            Continue Shopping
                          </Button>
                        </CardContent>
                      </GreyBackground>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
