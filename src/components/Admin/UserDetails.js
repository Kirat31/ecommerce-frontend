// UserDetails.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../actions/userAction';
import MetaData from '../Layouts/MetaData';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import Loader from '../Layouts/Loader';
import { useNavigate, Link as eLink, useParams } from 'react-router-dom';


const UserDetails = () => {
  const { id } = useParams(); // Use useParams to get the id parameter from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
    
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log("userdetails: ", userDetails);
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Box mt={4}>
                    <MetaData title={`${user.firstName}'s Profile`} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h4">My Profile</Typography>
                                <Box mt={2} mb={4}>
                                    {user.avatar && user.avatar.url ? (
                                        <img src={user.avatar.url} alt={user.firstName} style={{ width: '150px', borderRadius: '50%' }} />
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
                                    <Typography>{user.firstName} {user.lastName}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Email:</Typography>
                                    <Typography>{user.email}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Phone Number:</Typography>
                                    <Typography>{user.phoneNumber}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Date of Birth:</Typography>
                                    <Typography>
                                        {user.dateOfBirth && new Date(user.dateOfBirth).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit'
                                        })}
                                    </Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Gender:</Typography>
                                    <Typography>{user.gender}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Address:</Typography>
                                    <Typography>{user.address.street}, {user.address.city}, {user.address.state}, {user.address.postalCode}, {user.address.country}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
      )}
    </Container>
  );
};

export default UserDetails;
