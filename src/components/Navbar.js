// components/Navbar.js
import React, {useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Navigate, useNavigate, navigate } from 'react-router-dom';

function Navbar({ handleDrawerOpen }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
      // Clear authentication state, remove tokens, etc.
      setLoggedIn(false); // Assuming you have a state variable to track login status
    
      // Redirect the user to the login page
      navigate('/login'); // Assuming you're using React Router's useHistory or useNavigate hook
    };

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit'}}>
          Ecommerce App
        </Typography>
        </Box>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Username</MenuItem>
          <MenuItem onClick={handleMenuClose}>Role(s)</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
