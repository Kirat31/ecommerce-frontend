import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MetaData from '../Layouts/MetaData';
import { Container, Typography, Button, Grid, Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useNavigate, Link as eLink } from 'react-router-dom';
import { getDetails, clearSellerErrors } from '../../actions/sellerAction';
// import profileImage from '../../images/Profile.png';

const SellerProfile = () => {
    const { isAuthenticated } = useSelector((state) => state.seller);
    const {seller, loading, error} = useSelector((state) => state.sellerDetails);
    const navigate = useNavigate();
    const dispatch =useDispatch();
    
    useEffect(()=>{
        if(seller){
            console.log('Seller:', seller);
            console.log('Loading: ', loading);
            
        } else{
            console.log("seller is undefined");
        }

        if(error){
            alert.error(error);
            dispatch(clearSellerErrors());
        }

        console.log('Dispatching getDetails action...');
        dispatch(getDetails());

    }, [dispatch]);
   
    console.log('h: ', seller);
    console.log("lo", loading);

    return (
        <Container sx={{
            background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
            padding: '10px 0',
            textAlign: 'center',
            // marginTop: '40px'
        }}>
            {loading ? (
                <Loader />
            ) : error ? (
                <Typography variant="h5" color="error">
                  Error: {error}
                </Typography>
              ) : (
                <Box mt={4}>
                    <MetaData title={seller && seller.seller && `${seller.seller.firstName}'s Profile`} />
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h4">My Profile</Typography>
                                <Box mt={2} mb={4}>
                                <Avatar sx={{ width: 150, height: 150, backgroundColor: "#8970dc" }}>
                                <Typography variant="h1" sx={{ fontSize: 72 }}>{seller && seller.seller && String(seller.seller.firstName).charAt(0)}</Typography>
                                    </Avatar>
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
                                    <Typography>{seller && seller.seller && seller.seller.firstName} {seller && seller.seller && seller.seller.lastName}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Email:</Typography>
                                    <Typography>{seller && seller.seller && seller.seller.email}</Typography>
                                </Box>
                                <Box mb={4}>
                                    <Typography variant="h5">Phone Number:</Typography>
                                    <Typography>{seller && seller.seller && seller.seller.phoneNumber}</Typography>
                                </Box>

                                <Box mb={4}>
                                    <Typography variant="h5">Company Name:</Typography>
                                    <Typography>{seller && seller.seller && seller.seller.companyName}</Typography>
                                </Box>
                                
                                <Box mb={4}>

                                    <Typography variant="h5">Office Address:</Typography>
                                    {seller && seller.seller && seller.seller.sellerAddress && (
                                    <Typography>{seller.seller.sellerAddress.street}, {seller.seller.sellerAddress.city}, {seller.seller.sellerAddress.state}, {seller.seller.sellerAddress.postalCode}, {seller.seller.sellerAddress.country}</Typography>
                                    )}
                                    </Box>

                                    <Box mb={4}>

                                        <Typography variant="h5">Warehouse Address:</Typography>
                                        {seller && seller.seller && seller.seller.companyAddress && (
                                        <Typography>{seller.seller.companyAddress.street}, {seller.seller.companyAddress.city}, {seller.seller.companyAddress.state}, 
                                        {/* {sellerInfo.user.comapanyAddress.postalCode},  */}
                                        {seller.seller.companyAddress.country}</Typography>
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
