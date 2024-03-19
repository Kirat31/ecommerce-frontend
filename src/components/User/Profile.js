import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MetaData from '../Layouts/MetaData';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useNavigate, Link as eLink } from 'react-router-dom';
import profileImage from '../../images/Profile.png';

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

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
                <Box mt={4} sx={{
                    background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
                    padding: '10px 0',
                    textAlign: 'center',
                    marginTop: '40px'
                }}>
                    <MetaData title={`${user.firstName}'s Profile`} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h4">My Profile</Typography>
                                <Box mt={2} mb={4}>
                                <img src={profileImage} alt="Profile" style={{ width: '150px', borderRadius: '50%' }}/>
                                </Box>
                                <Button component={eLink} to="/updatee" variant="outlined" sx={{ color: 'green', borderColor: 'green' }}>
                                    Edit Profile
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                        <Card variant="outlined" sx={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', maxWidth: '600px', marginBottom: '20px' }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Profile Details
                                    </Typography>
                                    <Box mb={2}>
                                        <Typography variant="h6">Full Name:</Typography>
                                        <Typography>{user.firstName} {user.lastName}</Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="h6">Email:</Typography>
                                        <Typography>{user.email}</Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="h6">Phone Number:</Typography>
                                        <Typography>{user.phoneNumber}</Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="h6">Date of Birth:</Typography>
                                        <Typography>
                                            {user.dateOfBirth && new Date(user.dateOfBirth).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: '2-digit'
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="h6">Gender:</Typography>
                                        <Typography>{user.gender}</Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="h6">Address:</Typography>
                                        {user.address && (
                                            <Typography>{user.address.street}, {user.address.city}, {user.address.state}, {user.address.postalCode}, {user.address.country}</Typography>
                                        )}
                                    </Box>
                                    </CardContent>
                            </Card>
                                    <Box display="flex" alignItems="center">
                                        <Button component={eLink} to="/orders" variant="outlined" sx={{ color: 'green', borderColor: 'green' }}>
                                            My Orders
                                        </Button>
                                        <Button component={eLink} to="/update-password" variant="outlined" sx={{ color: 'green', borderColor: 'green', ml: 2 }}>
                                            Change Password
                                        </Button>
                                    </Box>
                               
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default Profile;
