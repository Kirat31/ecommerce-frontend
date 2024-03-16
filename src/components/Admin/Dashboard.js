// components/Dashboard.js
import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { mockRevenueData } from '../../mockData';
import MetaData from '../Layouts/MetaData';


function Dashboard() {
  const pendingReviews = [
    { title: 'Great product!', comment: 'I really loved the product. It exceeded my expectations.' },
    { title: 'Average quality', comment: 'The product was okay, but it could have been better.' },
  ];

  // Mock data for new customers
  const newCustomers = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
  ];
  
  const ne = mockRevenueData.map(entry => entry.ne);
  const revenues = mockRevenueData.map(entry => entry.revenue);
  const data = [{
    data: revenues,
  }];
  

  return (
    
    <Container maxWidth="lg"  sx={{
      background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
      padding: '10px 0',
      textAlign: 'center',
      marginTop: '40px'
  }}> 
      {/* Leave space for the sidebar */}
      <Typography variant="h4" sx={{ mt: 2, mb: 4 }} >Dashboard</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
         {/* Monthly revenue */}
        <Box sx={{ width: '25%', backgroundColor: '#f9f9f9', padding: 2 }}>
         <Typography variant="h6">Monthly Revenue</Typography> 
          {/* Add revenue data here */}
        </Box> 
          {/* New orders */}
        <Box sx={{ width: '25%', backgroundColor: '#f9f9f9', padding: 2 }}>
          <Typography variant="h6">New Orders</Typography>
          {/* Add new orders data here */}
        </Box>
        {/* Pending reviews */}
        <Box sx={{ width: '25%', backgroundColor: '#f9f9f9', padding: 2 }}>
          <Typography variant="h6">Pending Reviews</Typography> 
        </Box>
        {/* New customers */}
        <Box sx={{ width: '25%', backgroundColor: '#f9f9f9', padding: 2 }}>
          <Typography variant="h6">New Customers</Typography> 
        </Box>
      </Box> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        <Box sx={{ width: '50%', backgroundColor: '#f9f9f9', padding: 2, marginTop: 4 }}>
          <Typography variant="h6">Revenue Graph (Last 30 days)</Typography>
          <LineChart xAxis={[{ data: ne }]} series={data} width={530} height={300} />
        </Box>
        <Box sx={{width: '25%', backgroundColor: '#f9f9f9', padding: 2, marginTop:4}}>
          {pendingReviews.map((review, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '8px', paddingBottom: '8px' }}>
              <Typography sx={{ fontWeight: 'bold' }}>{review.title}</Typography>
              <Typography>{review.comment}</Typography>
            </div>
          ))}
        </Box>
        <Box sx={{width: '25%', backgroundColor: '#f9f9f9', padding: 2, marginTop:4}}>
          {newCustomers.map((customer, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '8px', paddingBottom: '8px' }}>
              <Typography sx={{ fontWeight: 'bold' }}>{customer.name}</Typography>
              <Typography>{customer.email}</Typography>
            </div>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
