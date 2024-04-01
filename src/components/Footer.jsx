import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#36454F', // Background color using hex code
        color: 'white', // Text color
        py: 4, // Padding on the y-axis
        textAlign: 'center', // Center-align content
      }}
    >
      <Typography variant="body1">
        &copy; 2024 Patel Processing. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Made with ❤️ by <Link href="https://example.com" sx={{textDecoration: 'none', color: 'white'}}>Ecomm Team</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
