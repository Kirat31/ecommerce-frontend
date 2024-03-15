import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MetaData from '../Layouts/MetaData';
import { Container, Typography, Button, Grid } from '@mui/material';
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
                                    {/* {user.avatar && user.avatar.url ? (
                                        <img src={user.avatar.url} alt={user.firstName} style={{ width: '150px', borderRadius: '50%' }} />
                                    ) : (
                                        <Typography variant="body1">No avatar available</Typography>
                                    )} */}
                                </Box>
                                <Button component={eLink} to="/updatee" variant="outlined" sx={{ color: 'red', borderColor: 'red' }}>
                                    Edit Profile
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
  <Box display="flex" flexDirection="column">
    <Box mb={4} display="flex" alignItems="center"> {/* Flex container */}
      <Typography variant="h5" mr={2}>Full Name:</Typography> {/* Full Name label */}
      <Typography variant="h5">{user.firstName} {user.lastName}</Typography> {/* User's full name */}
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
      {user.address && (
        <Typography>{user.address.street}, {user.address.city}, {user.address.state}, {user.address.postalCode}, {user.address.country}</Typography>
      )}
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
