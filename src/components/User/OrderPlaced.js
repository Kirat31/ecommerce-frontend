import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  console.log("order", user._id);
  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleGoToMyOrders = () => {
    navigate(`/users/orders/${user._id}`);
  };

  return (
    <Box sx={{ backgroundColor: '#EDEDED', height: '100%', padding: '10px' }}>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh', padding: '10px' }}>
        <Grid item xs={12} lg={6}>
          <Card variant="outlined" sx={{ border: '15px', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Order Placed Successfully
              </Typography>
              <Typography variant="body1" gutterBottom>
                Thank you for your order! Your order has been successfully placed.
              </Typography>
              <Box sx={{ marginTop: '20px' }}>
                <Button variant="contained" sx={{ backgroundColor: '#36454F', marginRight: '10px' }} onClick={handleContinueShopping}>
                  Continue Shopping
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#36454F' }} onClick={handleGoToMyOrders}>
                  Go to My Orders
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderPlaced;
