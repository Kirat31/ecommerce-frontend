// components/Dashboard.js
import React from 'react';
import { Container, Box, Typography } from '@mui/material';

function Dashboard() {
  return (
    
    <Container maxWidth="lg" > {/* Leave space for the sidebar */}
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
          {/* Add pending reviews data here */}
      </Box>
        {/* New customers */}
        <Box sx={{ width: '25%', backgroundColor: '#f9f9f9', padding: 2 }}>
          <Typography variant="h6">New Customers</Typography> 
          {/* Add new customers data here */} 
        </Box>
       </Box> 
    </Container>
  );
}

export default Dashboard;
