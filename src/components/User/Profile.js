import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MetaData from '../Layouts/MetaData';
import { Container, Typography, Button, Grid, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useNavigate, Link as eLink } from 'react-router-dom';
import profileImage from '../../images/Profile.png';

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    console.log('h: ', user);
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [navigate, isAuthenticated]);

    return (
        <Container sx={{
            background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
            padding: '10px 0',
            textAlign: 'center',
            // marginTop: '40px'
        }}>
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
                                <Avatar sx={{ width: 150, height: 150, backgroundColor: "#8970dc" }}>
                                    <Typography variant="h1" sx={{ fontSize: 72 }}>{String(user.firstName).charAt(0)}</Typography>
                                </Avatar>
                                {/* <img src={profileImage} alt="Profile" style={{ width: '150px', borderRadius: '50%' }}/> */}
                                    {/* {sellerInfo.user.avatar && sellerInfo.user.avatar.url ? (
                                        <img src={sellerInfo.user.avatar.url} alt={sellerInfo.user.firstName} style={{ width: '150px', borderRadius: '50%' }} />
                                    ) : (
                                        <Typography variant="body1">No avatar available</Typography>
                                    )} */}
                                </Box>
                                <Box>
                                <Button color="primary" component={eLink} to="/updatee" >
                                    Edit Profile
                                </Button>
                                <Button color="primary" component={eLink} to="/orders" >
                                    Orders Recieved
                                </Button>
                                    <Button color="primary" component={eLink} to="/update-password"  sx={{ ml: 2 }}>
                                        Change Password
                                    </Button>

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

                                    <Typography variant="h5">Shipping Address:</Typography>
                                    {user.address && (
                                    <Typography>{user.address.street}, {user.address.city}, {user.address.state}, {user.address.postalCode}, {user.address.country}</Typography>
                                    )}
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
