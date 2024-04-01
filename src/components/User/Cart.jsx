import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const GreyBackground = styled('div')`
  background-color: white;
  border: 16px;
`;

const Cart = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

  return (
    <Box sx={{backgroundColor: '#EDEDED' }}>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', padding: '10px' }}>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ border: '15px' }}>
            <CardContent>
              <Grid container spacing={4}>
                {/* Item 1 */}
                <Grid item xs={12} lg={8}>
                <Card sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                      alt="Cotton T-shirt"
                      sx={{ maxWidth: '200px' }}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Shirt
                      </Typography>
                      <Typography variant="body1" color="textSecondary" gutterBottom>
                        Cotton T-shirt
                      </Typography>
                      <TextField
                        label="Quantity"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        defaultValue={1}
                        size="small"
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Summary */}
                <Grid item xs={12} lg={4}>
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
                    </CardContent>
                  </GreyBackground>
                </Grid>
                <Button sx={{paddingLeft: '20px', marginTop: '30px', color: '#36454F'}} onClick={handleClick}>
                        Continue Shopping
                      </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
