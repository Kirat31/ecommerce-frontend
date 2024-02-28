import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MetaData from '../Layouts/MetaData';
import { Container, Link, Typography, Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useNavigate, Link as eLink } from 'react-router-dom';

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
                <Box mt={4}>
                    <MetaData title={`${user.firstName}'s Profile`} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h4">My Profile</Typography>
                                <Box mt={2} mb={4}>
                                    <img src={user.avatar.url} alt={user.name} style={{ width: '150px', borderRadius: '50%' }} />
                                </Box>
                                <Button color="primary" component={eLink} to="/updatee" 
                                    sx={{
                                        display: 'inline-block',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        border: '2px solid',
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        },
                                    }}>
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
                                <Box>
                                    <Button color="primary" component={eLink} to="/orders" 
                                    sx={{
                                        display: 'inline-block',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        border: '2px solid',
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        },
                                    }}>
                                        My orders
                                </Button>
                                <Button color="primary" component={eLink} to="/update-password" 
                                    sx={{
                                        display: 'inline-block',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        border: '2px solid',
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        },
                                    }}>
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
