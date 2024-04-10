import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MetaData from '../Layouts/MetaData';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useNavigate, Link as eLink } from 'react-router-dom';
import profileImage from '../../images/Profile.png';

const AdminProfile = () => {
    const { adminInfo, loading, isAuthenticated } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    console.log('h: ', adminInfo);
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/admin-login');
        }
    }, [navigate, isAuthenticated]);

    return (
        <Container sx={{
            background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
            padding: '10px 0',
            textAlign: 'center',
            marginTop: '40px'
        }}>
            {loading ? (
                <Loader />
            ) : (
                <Box mt={4}>
                    <MetaData title={`${adminInfo.admin.firstName}'s Profile`} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h4">My Profile</Typography>
                                <Box mt={2} mb={4}>
                                <img src={profileImage} alt="Profile" style={{ width: '150px', borderRadius: '50%' }}/>
                                    {/* {adminInfo.user.avatar && adminInfo.user.avatar.url ? (
                                        <img src={adminInfo.user.avatar.url} alt={adminInfo.user.firstName} style={{ width: '150px', borderRadius: '50%' }} />
                                    ) : (
                                        <Typography variant="body1">No avatar available</Typography>
                                    )} */}
                                </Box>
                                {/* <Button color="primary" component={eLink} to="/updatee-admin" variant="outlined">
                                    Edit Profile
                                </Button> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box display="flex" flexDirection="column">
                                <Box mb={4}>
                                    <Typography variant="h5">Full Name:</Typography>
                                    <Typography>{adminInfo.admin.firstName} {adminInfo.admin.lastName}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Email:</Typography>
                                    <Typography>{adminInfo.admin.email}</Typography>
                                </Box>
                            
                               
                                <Box></Box>
                                <Box>
                                    <Button color="primary" component={eLink} to="/orders" variant="outlined">
                                        Orders
                                    </Button>
                                    <Button color="primary" component={eLink} to="/update-password-admin" variant="outlined" sx={{ ml: 2 }}>
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

export default AdminProfile;
