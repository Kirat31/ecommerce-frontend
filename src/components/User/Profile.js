import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MetaData from '../Layouts/MetaData';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useNavigate, Link as eLink } from 'react-router-dom';

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
//console.log("user", user);
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [navigate, isAuthenticated]);

    return (
        <Container>
            {loading ? (
                <Loader />
            ) : (
                <Box mt={4}>
                    <MetaData title={`${user.firstName}'s Profile`} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h4">My Profile</Typography>
                                <Box mt={2} mb={4}>
                                    {user.avatar && user.avatar.url ? (
                                        <img src={user.avatar.url} alt={user.name} style={{ width: '150px', borderRadius: '50%' }} />
                                    ) : (
                                        <Typography variant="body1">No avatar available</Typography>
                                    )}
                                </Box>
                                <Button color="primary" component={eLink} to="/update" variant="outlined">
                                    Edit Profile
                                </Button>
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
                                    <Typography>{user.dateOfBirth}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Gender:</Typography>
                                    <Typography>{user.gender}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Address:</Typography>
                                    <Typography>{user.address.street}, {user.address.city}, {user.address.state}, {user.address.postalCode}, {user.address.country}</Typography>
                                </Box>
                                <Box>
                                    <Button color="primary" component={eLink} to="/orders" variant="outlined">
                                        My Orders
                                    </Button>
                                    <Button color="primary" component={eLink} to="/update-password" variant="outlined" sx={{ ml: 2 }}>
                                        Change Password
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default Profile;
