// import React, {useEffect} from 'react';
// import { Grid, Typography, Paper, Avatar, Button } from '@mui/material';
// import { useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import MetaData from "../Layouts/MetaData";


// function ProfilePage() {

//   const { user, loading, isAuthenticated } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated === false) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div style={{ maxWidth: '7xl', margin: 'auto', padding: '24px', paddingLeft: 'sm', paddingRight: 'lg', backgroundColor: '#EDEDED' }}>
//       <div style={{ textAlign: 'center', paddingTop: '10px' }}>
//       <MetaData title={`${user.firstName}'s Profile`} />
//         <Typography style={{ fontSize: '16px', color: '#36454F', fontWeight: '600', textTransform: 'uppercase' }}>Profile</Typography>
//         <p style={{ marginTop: '2px', fontSize: '28px', lineHeight: '1.25', fontWeight: '600', color: '#1F2937' }}>
//           Welcome, {user.firstName} {user.lastName}
//         </p>
//         <p style={{ marginTop: '4px', maxWidth: '2xl', fontSize: '16px', color: '#6B7280', margin: 'auto' }}>
//           Here you can view and update your profile information.
//         </p>
//       </div>
//       <div style={{ marginTop: '10px', padding: '5px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//           <Paper style={{ padding: '20px', display: 'flex', alignItems: 'center', backgroundColor: '#BFDBFE', height: '165px' }}>
//   <Avatar
//     alt="Profile image"
//     sx={{ width: 80, height: 80, backgroundColor: '#6A5ACD', marginRight: '20px' }}
//   >
//      {String(user.firstName).charAt(0)}{String(user.lastName).charAt(0)}
//   </Avatar>
//   <div style={{ textAlign: 'left' }}>
//     <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>{user.firstName} {user.lastName}</Typography>
//     <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>{user.email}</Typography>
//     <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>{user.phoneNumber}</Typography>
//     <Button component={Link} to="/updatee" style={{ marginTop: '20px', color: '#36454F' }}>Edit Profile</Button>
//   </div>
// </Paper>

//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Paper  style={{ padding: '20px', textAlign: 'center', backgroundColor: '#C6F6D5', height: '165px' }}>
//               <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>Shipping Address</Typography>
//               <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>{user.address.street}</Typography>
//               <Typography variant="body2" style={{ marginTop: '5px', fontSize: '14px', color: '#6B7280' }}>{user.address.city} {user.address.state} {user.address.postalCode}</Typography>
//               <Typography variant="body2" style={{ marginTop: '5px', fontSize: '14px', color: '#6B7280' }}>{user.address.country}</Typography>
//               <Button style={{ marginTop: '20px', color: '#36454F' }} >Edit Address</Button>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#FEF3C7', height: '165px' }}>
//               <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>Payment Methods</Typography>
//               <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>•••• •••• •••• 1234</Typography>
//               <Button style={{ marginTop: '20px', color: '#36454F' }} >Manage Payments</Button>
//             </Paper>
//           </Grid>
//         </Grid>
//       </div>
//       <div style={{ marginTop: '10px', textAlign: 'center' }}>
//         <h2 style={{ fontSize: '16px', color: '#4F46E5', fontWeight: '600', textTransform: 'uppercase' }}>Cart & Order History</h2>
//       </div>
//       <div style={{ marginTop: '10px', padding: '5px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#FECACA' }}>
//               <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>Your Cart</Typography>
//               <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>You have 3 items in your cart</Typography>
//               <Button style={{ marginTop: '20px', color: '#36454F' }}>View Cart</Button>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Paper  style={{ padding: '20px', textAlign: 'center', backgroundColor: '#E9D8FD' }}>
//               <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>Order History</Typography>
//               <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>You have made 5 orders in total</Typography>
//               <Button style={{ marginTop: '20px', color: '#36454F' }} >View Orders</Button>
//             </Paper>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;

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
                                <Avatar sx={{ width: 32, height: 32, backgroundColor: "#8970dc" }}>
                                        {String(user.firstName).charAt(0)}
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
