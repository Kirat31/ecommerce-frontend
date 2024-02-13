import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AuthService from '../../services/AuthService'; 

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await AuthService.register(formData); // Call AuthService register method
        console.log('Registration successful:', response.data); // Log the response from the backend
        // Optionally, redirect to login page or show a success message to the user
      } catch (error) {
        console.error('Registration failed:', error); // Log any errors that occur during registration
        // Optionally, display an error message to the user
      }
    // Add code to handle form submission (e.g., send HTTP request to backend)
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ maxWidth: 400, p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" underline="hover">
              Login here
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}

export default RegisterForm;
