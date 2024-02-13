// Banner.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Banner() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #007bb5, #00a1e4)',
        padding: '50px 0',
        textAlign: 'center',
        color: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Welcome to Our Store
        </Typography>
        {/* Add carousel or featured product display */}
      </Container>
    </Box>
  );
}

export default Banner;