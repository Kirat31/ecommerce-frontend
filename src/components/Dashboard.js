// components/Dashboard.js
import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
//import axios from 'axios';
import { mockRevenueData } from '../mockData';

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
  // const [pendingReviews, setPendingReviews] = useState([]);
  // const [newCustomers, setNewCustomers] = useState([]);

  // useEffect(() => {
  //   // Fetch pending reviews
  //   const fetchPendingReviews = async () => {
  //     try {
  //       const response = await axios.get('/api/pending-reviews');
  //       setPendingReviews(response.data);
  //     } catch (error) {
  //       console.error('Error fetching pending reviews:', error);
  //     }
  //   };

  //   // Fetch new customers
  //   const fetchNewCustomers = async () => {
  //     try {
  //       const response = await axios.get('/api/new-customers');
  //       setNewCustomers(response.data);
  //     } catch (error) {
  //       console.error('Error fetching new customers:', error);
  //     }
  //   };

  //   fetchPendingReviews();
  //   fetchNewCustomers();
  // }, []);
  const ne = mockRevenueData.map(entry => entry.ne);
  const revenues = mockRevenueData.map(entry => entry.revenue);
  const data = [{
    data: revenues,
  }];
  

  return (
    
    <Container maxWidth="lg" > 
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
