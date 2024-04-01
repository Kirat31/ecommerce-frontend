import React, {useEffect} from 'react';
import { Grid, Typography, Paper, Avatar, Button } from '@mui/material';
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import MetaData from "../Layouts/MetaData";


function ProfilePage() {

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ maxWidth: '7xl', margin: 'auto', padding: '24px', paddingLeft: 'sm', paddingRight: 'lg', backgroundColor: '#EDEDED' }}>
      <div style={{ textAlign: 'center', paddingTop: '10px' }}>
      <MetaData title={`${user.firstName}'s Profile`} />
        <Typography style={{ fontSize: '16px', color: '#36454F', fontWeight: '600', textTransform: 'uppercase' }}>Profile</Typography>
        <p style={{ marginTop: '2px', fontSize: '28px', lineHeight: '1.25', fontWeight: '600', color: '#1F2937' }}>
          Welcome, {user.firstName} {user.lastName}
        </p>
        <p style={{ marginTop: '4px', maxWidth: '2xl', fontSize: '16px', color: '#6B7280', margin: 'auto' }}>
          Here you can view and update your profile information.
        </p>
      </div>
      <div style={{ marginTop: '10px', padding: '5px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
          <Paper style={{ padding: '20px', display: 'flex', alignItems: 'center', backgroundColor: '#BFDBFE', height: '165px' }}>
  <Avatar
    alt="Profile image"
    sx={{ width: 80, height: 80, backgroundColor: '#6A5ACD', marginRight: '20px' }}
  >
     {String(user.firstName).charAt(0)}{String(user.lastName).charAt(0)}
  </Avatar>
  <div style={{ textAlign: 'left' }}>
    <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>{user.firstName} {user.lastName}</Typography>
    <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>{user.email}</Typography>
    <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>{user.phoneNumber}</Typography>
    <Button component={Link} to="/updatee" style={{ marginTop: '20px', color: '#36454F' }}>Edit Profile</Button>
  </div>
</Paper>

          </Grid>
          <Grid item xs={12} md={4}>
            <Paper  style={{ padding: '20px', textAlign: 'center', backgroundColor: '#C6F6D5', height: '165px' }}>
              <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>Shipping Address</Typography>
              <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>{user.address.street}</Typography>
              <Typography variant="body2" style={{ marginTop: '5px', fontSize: '14px', color: '#6B7280' }}>{user.address.city} {user.address.state} {user.address.postalCode}</Typography>
              <Typography variant="body2" style={{ marginTop: '5px', fontSize: '14px', color: '#6B7280' }}>{user.address.country}</Typography>
              <Button style={{ marginTop: '20px', color: '#36454F' }} >Edit Address</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#FEF3C7', height: '165px' }}>
              <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>Payment Methods</Typography>
              <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>•••• •••• •••• 1234</Typography>
              <Button style={{ marginTop: '20px', color: '#36454F' }} >Manage Payments</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '16px', color: '#4F46E5', fontWeight: '600', textTransform: 'uppercase' }}>Cart & Order History</h2>
      </div>
      <div style={{ marginTop: '10px', padding: '5px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#FECACA' }}>
              <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>Your Cart</Typography>
              <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>You have 3 items in your cart</Typography>
              <Button style={{ marginTop: '20px', color: '#36454F' }}>View Cart</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper  style={{ padding: '20px', textAlign: 'center', backgroundColor: '#E9D8FD' }}>
              <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '500', color: '#111827' }}>Order History</Typography>
              <Typography variant="body2" style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280' }}>You have made 5 orders in total</Typography>
              <Button style={{ marginTop: '20px', color: '#36454F' }} >View Orders</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ProfilePage;
