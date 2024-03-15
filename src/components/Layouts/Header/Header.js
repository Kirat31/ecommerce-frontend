// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, MenuItem, Menu } from '@mui/material';
import { Link } from 'react-router-dom';
import Search from '../../Product/Search';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../../actions/productAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person from '@mui/icons-material/Person';

function Header() {
  
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (searchKeyword) => {
    dispatch(getProduct(searchKeyword));
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#f5f5f5' }}> {/* Changed header background color to light gray */}
      <Toolbar sx={{ bgcolor: '#f5f5f5' }}> {/* Changed toolbar background color to light gray */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#333333' }}> {/* Changed text color to dark gray */}
          My E-Commerce Store
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/" sx={{ color: '#333333' }}>Home</Button> {/* Changed button text color to dark gray */}
          <Button color="inherit" component={Link} to="/products" sx={{ color: '#333333' }}>Products</Button> {/* Changed button text color to dark gray */}
          <Button color="inherit" component={Link} to="/about" sx={{ color: '#333333' }}>About</Button> {/* Changed button text color to dark gray */}
          <Button color="inherit" component={Link} to="/contact" sx={{ color: '#333333' }}>Contact</Button> {/* Changed button text color to dark gray */}
        </Box>
        <Box sx={{ bgcolor: 'white', borderRadius: 5, marginRight: '20px' }}> {/* Moved search box to the right */}
          <Search onSearch={handleSearch} />
        </Box>
        <Box sx={{  display: 'flex', alignItems: 'center', ml: 1 }}> {/* Adjusted margin here */}
          <Person onClick={handleClick} sx={{bgcolor: '#333333',}} />
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/loginsignup" onClick={handleClose}>
              Buyer Login
            </MenuItem>
            <MenuItem component={Link} to="/seller-login" onClick={handleClose}>
              Seller Login
            </MenuItem>
            <MenuItem component={Link} to="/admin-login" onClick={handleClose}>
              Admin Login
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
