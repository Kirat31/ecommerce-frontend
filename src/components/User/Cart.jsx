import React, {useEffect, useState} from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, Select, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks
import { getCartProducts, updateProductInCart, decreaseProductInCart } from '../../actions/cartAction';
import Loader from '../Layouts/Loader';
import {useAlert} from 'react-alert';
import {Remove, Add} from '@mui/icons-material';

const GreyBackground = styled('div')`
  background-color: white;
  border: 16px;
`;

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { cartProducts, loading, error } = useSelector((state) => state.cartProducts);
    const {user} = useSelector((state) => state.user);
    const [updatedQuantities, setUpdatedQuantities] = useState({});

    console.log("user id", user._id);
    
    useEffect(() => {
      dispatch(getCartProducts(user._id)); // Fetch cart products when component mounts
    }, [dispatch]);

    const handleUpdateQuantity = (productId, quantity) => {
      // Update the local state with the updated quantity
      setUpdatedQuantities({ ...updatedQuantities, [productId]: quantity });
    };

    const handleSaveQuantity = () => {
      // Dispatch an action to update the quantities in the cart
      Object.entries(updatedQuantities).forEach(([productId, quantity]) => {
        dispatch(updateProductInCart(user._id, productId, quantity));
      });
      // Clear the local state after updating the quantities
      setUpdatedQuantities({});
      alert.success("quantities updated");
    };

    const handleDecreaseQuantity = (productId, currentQuantity) => {
      if (currentQuantity > 1) {
        dispatch(decreaseProductInCart(user._id, productId, 1));
      }
    };

    const handleClick = () => {
        navigate('/');
    };

  return (

    <Box sx={{backgroundColor: '#EDEDED' }}>
      {loading ? (
        <Loader />
      ) : (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', padding: '10px' }}>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ border: '15px' }}>
            <CardContent>
              <Grid container spacing={4}>
                {/* Item 1 */}
                {(console.log("cart products", cartProducts))}
                {cartProducts.map((product) => (
                  <Grid item xs={12} lg={8}>
                    <Card sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={product.img}
                        alt="Cotton T-shirt"
                        sx={{ maxWidth: '200px' }}
                      />
                      <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                          {product.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                          {product.category}
                        </Typography>
                        <Box mt={2} display="flex" alignItems="center" style={{ marginBottom: 10 }}>
                        <IconButton
                          onClick={() => handleDecreaseQuantity(product._id, product.quantity)}
                        >
                            <Remove/>
                          </IconButton>
                        <Typography variant='h6' color="textPrimary" style={{marginTop:'10px'}} gutterBottom>
                          {/* // label="Quantity"
                          // type="number"
                          // InputProps={{ inputProps: { min: 0 } }} */}
                         {product.quantity}
                          {/* size="small"
                          // onChange={(e) => handleUpdateQuantity(product._id, e.target.value)} */}
                          </Typography>
                          <IconButton
                            onClick={() => handleUpdateQuantity(product._id, product.quantity)}
                          >
                            <Add/>
                          </IconButton>
                          </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))} 
                {/* Summary */}
                <Grid item xs={12} lg={4} style={{marginTop: '-400px'}}> 
                  <GreyBackground>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Summary
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Items: 3
                      </Typography>
                      <Select
                        value={1}
                        fullWidth
                        label="Shipping"
                        size="small"
                      >
                        <MenuItem value={1}>Standard-Delivery- ₹5.00</MenuItem>
                      </Select>
                      <TextField
                        label="Enter your code"
                        variant="outlined"
                        size="small"
                        fullWidth
                        margin="dense"
                      />
                      <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Total price: ₹ 137.00
                      </Typography>
                      <Button variant="contained" component={Link} to="/checkout" fullWidth sx={{backgroundColor: '#36454F'}}>
                        Complete Payment
                      </Button>
                      <Button sx={{paddingLeft: '20px', marginTop: '30px', color: '#36454F'}} onClick={handleClick}>
                        Continue Shopping
                      </Button>
                      <Button sx={{ paddingLeft: '20px', marginTop: '30px', color: '#36454F' }} onClick={handleSaveQuantity}>
                        Save Quantity
                      </Button>                 
                    </CardContent>
                  </GreyBackground>
                </Grid>               
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      )}
    </Box>
  );
};

export default Cart;
