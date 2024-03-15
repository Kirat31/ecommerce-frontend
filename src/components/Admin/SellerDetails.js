// SellerDetails.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerDetails } from '../../actions/sellerAction';
import MetaData from '../Layouts/MetaData';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import Loader from '../Layouts/Loader';
import { useNavigate, Link as eLink, useParams } from 'react-router-dom';


const SellerDetails = () => {
  const { id } = useParams(); // Use useParams to get the id parameter from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
    
  const sellerDetails = useSelector((state) => state.sellerDetailsAdmin);
  const { loading, error, seller } = sellerDetails;
  console.log("sellerdetails: ", sellerDetails);
  useEffect(() => {
    dispatch(getSellerDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Box mt={4}>
                    <MetaData title={`${seller.firstName}'s Profile`} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h4">My Profile</Typography>
                                <Box mt={2} mb={4}>
                                    {seller.avatar && seller.avatar.url ? (
                                        <img src={seller.avatar.url} alt={seller.firstName} style={{ width: '150px', borderRadius: '50%' }} />
                                    ) : (
                                        <Typography variant="body1">No avatar available</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box display="flex" flexDirection="column">
                                <Box mb={4}>
                                    <Typography variant="h5">Full Name:</Typography>
                                    <Typography>{seller.firstName} {seller.lastName}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Email:</Typography>
                                    <Typography>{seller.email}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Phone Number:</Typography>
                                    <Typography>{seller.phoneNumber}</Typography>
                                </Box>
                                
                                
                                {/* <Box mb={4}>
                                    <Typography variant="h5">Office Address:</Typography>
                                    <Typography>{seller.sellerAddress.street}, {seller.sellerAddress.city}, {seller.sellerAddress.state}, {seller.sellerAddress.postalCode}, {seller.sellerAddress.country}</Typography>
                                </Box> */}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
      )}
    </Container>
  );
};

export default SellerDetails;
