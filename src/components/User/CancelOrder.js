import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const GreyBackground = styled('div')`
  background-color: white;
  border: 16px;
`;

const CancelOrder = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    // Logic for cancelling the order
    // For now, let's just navigate back to the home page
    navigate('/');
  };

  const handleContinuePayment = () => {
    navigate('/');
  };

  return (
  <Box sx={{ backgroundColor: '#EDEDED' }}>
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh', padding: '10px' }}>
      <Grid item xs={12} sm={6}>
        <Card variant="outlined" sx={{ border: '15px', alignItems: 'center' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Cancel Payment
            </Typography>
            <GreyBackground>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Are you sure you want to cancel your payment?
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: '#36454F' }} onClick={handleCancel}>
                  Yes, Cancel Order
                </Button>
                <Button sx={{ paddingLeft: '20px', marginTop: '10px', color: '#36454F' }} onClick={handleContinuePayment}>
                  No, Continue Payment
                </Button>
              </CardContent>
            </GreyBackground>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);
}

export default CancelOrder;
