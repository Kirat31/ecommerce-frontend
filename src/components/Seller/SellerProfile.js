import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MetaData from '../Layouts/MetaData';
import { Container, Typography, Button, Grid, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useNavigate, Link as eLink } from 'react-router-dom';
import profileImage from '../../images/Profile.png';

const SellerProfile = () => {
    const { sellerInfo, loading, isAuthenticated } = useSelector((state) => state.seller);
    const navigate = useNavigate();
    console.log('h: ', sellerInfo);
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/seller-login');
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
                    <MetaData title={`${sellerInfo.seller.firstName}'s Profile`} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h4">My Profile</Typography>
                                <Box mt={2} mb={4}>
                                <Avatar sx={{ width: 150, height: 150, backgroundColor: "#8970dc" }}>
                                <Typography variant="h1" sx={{ fontSize: 72 }}>{String(sellerInfo.seller.firstName).charAt(0)}</Typography>
                                    </Avatar>
                                {/* <img src={profileImage} alt="Profile" style={{ width: '150px', borderRadius: '50%' }}/> */}
                                    {/* {sellerInfo.user.avatar && sellerInfo.user.avatar.url ? (
                                        <img src={sellerInfo.user.avatar.url} alt={sellerInfo.user.firstName} style={{ width: '150px', borderRadius: '50%' }} />
                                    ) : (
                                        <Typography variant="body1">No avatar available</Typography>
                                    )} */}
                                </Box>
                                <Box>
                                <Button color="primary" component={eLink} to="/Seller/updatee-seller" >
                                    Edit Profile
                                </Button>
                                <Button color="primary" component={eLink} to="/Seller/orders" >
                                    Orders Recieved
                                </Button>
                                    <Button color="primary" component={eLink} to="/Seller/update-password"  sx={{ ml: 2 }}>
                                        Change Password
                                    </Button>

                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box display="flex" flexDirection="column">
                                <Box mb={4}>
                                    <Typography variant="h5">Full Name:</Typography>
                                    <Typography>{sellerInfo.seller.firstName} {sellerInfo.seller.lastName}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Email:</Typography>
                                    <Typography>{sellerInfo.seller.email}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Phone Number:</Typography>
                                    <Typography>{sellerInfo.seller.phoneNumber}</Typography>
                                </Box>

                                <Box mb={4}>
                                    <Typography variant="h5">Company Name:</Typography>
                                    <Typography>{sellerInfo.seller.companyName}</Typography>
                                </Box>
                                
                                <Box mb={4}>

                                    <Typography variant="h5">Office Address:</Typography>
                                    {sellerInfo.seller.sellerAddress && (
                                    <Typography>{sellerInfo.seller.sellerAddress.street}, {sellerInfo.seller.sellerAddress.city}, {sellerInfo.seller.sellerAddress.state}, {sellerInfo.seller.sellerAddress.postalCode}, {sellerInfo.seller.sellerAddress.country}</Typography>
                                    )}
                                    </Box>

                                    <Box mb={4}>

                                        <Typography variant="h5">Warehouse Address:</Typography>
                                        {sellerInfo.seller.companyAddress && (
                                        <Typography>{sellerInfo.seller.companyAddress.street}, {sellerInfo.seller.companyAddress.city}, {sellerInfo.seller.companyAddress.state}, 
                                        {/* {sellerInfo.user.comapanyAddress.postalCode},  */}
                                        {sellerInfo.seller.companyAddress.country}</Typography>
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

export default SellerProfile;
