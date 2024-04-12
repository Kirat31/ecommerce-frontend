import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';
import { navigate } from 'react-router-dom';
import { checkoutFromCart } from '../../actions/cartAction';

const GreyBackground = styled('div')`
  background-color: white;
  border: 16px;
`;

const Checkout = () => {
    const navigate = useNavigate();
    const { cartProducts, loading } = useSelector((state) => state.cartProducts);
    const { user } = useSelector((state) => state.user);
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
  const stripe = await loadStripe('pk_test_51P2fovSBuekwIuDIxjETCMV86FSzRR8er7NHizBsHKv5xQykzTiM6AN8lxq6Ut7HqweDTNcLuZir3af5y9zV9hYv00cC0XcWjA');
  const body = {
    products: cartProducts
  }
  const headers= {
    "Content-Type": "application/json"
  }
  const response= await fetch(`/api/v1/payment/process-payment`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  })

  const session = await response.json();
  const result = stripe.redirectToCheckout({
    sessionId:session.id
  })

  if(result.error){
    console.log(result.error);
  }
};

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
                        value={user.address?user.address.street:''}
                      />
                      <TextField
                        label={user.address?'':"City"}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={user.address?user.address.city:''}
                      />
                      <TextField
                        label={user.address?'':"State"}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={user.address?user.address.state:''}
                      />
                      <TextField
                        label={user.address?'':"Postal Code"}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={user.address?user.address.postalCode:''}
                      />
                      <TextField
                        label={user.address?'':"Country"}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={user.address?user.address.country:''}
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
