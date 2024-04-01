import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const GreyBackground = styled('div')`
  background-color: white;
  border: 16px;
`;

const Checkout = () => {
    const navigate = useNavigate();

    const handleOrder = () => {
        // Logic for placing the order
        // This can be implemented based on your backend
        // For now, let's just navigate back to the home page
        navigate('/');
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
              <Grid container spacing={4}>
                {/* Payment Details */}
                <Grid item xs={12} lg={8}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Payment Details
                      </Typography>
                      {/* Add payment details fields here */}
                      <TextField
                        label="Card Number"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                      />
                      <TextField
                        label="Expiration Date"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                      />
                      <TextField
                        label="CVV"
                        variant="outlined"
                        fullWidth
                        margin="dense"
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
                        Items: 3
                      </Typography>
                      {/* Add summary details here */}
                      <Typography variant="body1" gutterBottom>
                        Total price: ₹ 137.00
                      </Typography>
                      <Button variant="contained" fullWidth sx={{backgroundColor: '#36454F'}} onClick={handleOrder}>
                        Place Order
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
