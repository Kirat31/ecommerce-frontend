import React, {useState} from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';
import { navigate } from 'react-router-dom';
import { checkoutFromCart } from '../../actions/cartAction';

const GreyBackground = styled('div')`
  background-color: white;
  border: 16px;
`;

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartProducts, loading } = useSelector((state) => state.cartProducts);
    const { user } = useSelector((state) => state.user);
    const [shippingInfo, setShippingInfo] = useState({
      address: {
        street: user.address.street || '',
        city: user.address.city || '',
        state: user.address.state || '',
        postalCode: user.address.postalCode || '',
        country: user.address.country || '',
      },
      phoneNumber: user.phoneNumber || '',
    });
    const [paymentMethod, setPaymentMethod] = useState('Select payment mode');

    const numberOfProducts = cartProducts.length;
    const totalItems = cartProducts.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
    const totalPrice = cartProducts.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
    console.log("cartProducts", cartProducts);
    console.log("user", user);

  const handleOrder = async () => {
    try{
      // const stripe = await loadStripe('pk_test_51P2fovSBuekwIuDIxjETCMV86FSzRR8er7NHizBsHKv5xQykzTiM6AN8lxq6Ut7HqweDTNcLuZir3af5y9zV9hYv00cC0XcWjA');
      // const body = {
      //   products: cartProducts
      // }
      // const headers= {
      //   "Content-Type": "application/json"
      // }
      // const response= await fetch(`/api/v1/payment/process-payment`, {
      //   method: "POST",
      //   headers: headers,
      //   body: JSON.stringify(body)
      // })

      // const session = await response.json();
      // const result = stripe.redirectToCheckout({
      //   sessionId:session.id
      // })

      // if(result.error){
      //   console.log(result.error);
      // }

      const body = {
        products: cartProducts,
        shippingInfo,
        paymentInfo: {
          paymentMethod: paymentMethod,
        },
        totalPrice,
        orderNotes: document.getElementById('orderNotes').value,
      };
      console.log("shipping info", body.shippingInfo);
      dispatch(checkoutFromCart(user._id, body.shippingInfo, body.paymentInfo, body.totalPrice, body.orderNotes));
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error
    }
  }
    

  const handleContinueShopping = () => {
      navigate('/');
  };

  return (
    <Box sx={{backgroundColor: '#EDEDED' }}>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', padding: '10px' }}>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ border: '15px' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Checkout
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Shipping Address
                      </Typography>
                      {/* Add payment details fields here */}
                      <TextField
                        label={user.address?'':"Street"}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={shippingInfo?shippingInfo.address.street:''}
                        onChange={(e) => setShippingInfo({ ...shippingInfo.address, street: e.target.value })}
                      />
                      <TextField
                        label={user.address?'':"City"}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={shippingInfo?shippingInfo.address.city:''}
                        onChange={(e) => setShippingInfo({ ...shippingInfo.address, city: e.target.value })}
                      />
                      <TextField
                        label={user.address?'':"State"}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={shippingInfo?shippingInfo.address.state:''}
                        onChange={(e) => setShippingInfo({ ...shippingInfo.address, state: e.target.value })}
                      />
                      <TextField
                        label={user.address?'':"Postal Code"}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={shippingInfo?shippingInfo.address.postalCode:''}
                        onChange={(e) => setShippingInfo({ ...shippingInfo.address, postalCode: e.target.value })}
                      />
                      <TextField
                        label={user.address?'':"Country"}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={shippingInfo?shippingInfo.address.country:''}
                        onChange={(e) => setShippingInfo({ ...shippingInfo.address, country: e.target.value })}
                      />
                      <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={shippingInfo.phoneNumber}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      <TextField
                        id="orderNotes"
                        label="Order Notes"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        multiline
                        rows={4}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Summary */}
                <Grid item xs={12} lg={4}>
                  <GreyBackground>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Summary
                      </Typography>
                      <InputLabel id="payment-method-label">Mode of Payment</InputLabel>
                      <Select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        // label="Select mode of payment"
                      >
                        <MenuItem value="card">Card</MenuItem>
                        <MenuItem value="cash-on-delivery">Cash on Delivery</MenuItem>
                      </Select>
                      <Typography variant="body1" gutterBottom>
                        Items: {numberOfProducts}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Quantity: {totalItems}
                      </Typography>
                      {/* Add summary details here */}
                      <Typography variant="body1" gutterBottom>
                        Total price: ₹ {totalPrice}
                      </Typography>
                      <Button variant="contained" fullWidth sx={{backgroundColor: '#36454F'}} onClick={handleOrder}>
                        Process Payment
                      </Button>
                      <Button sx={{paddingLeft: '20px', marginTop: '10px', color: '#36454F'}} onClick={handleContinueShopping}>
                        Continue Shopping
                      </Button>
                    </CardContent>
                  </GreyBackground>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
