import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, MenuItem, Menu } from '@mui/material';
import { Link } from 'react-router-dom';
import Search from '../../Product/Search';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../../actions/productAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          My E-Commerce Store
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
        </Box>
        <Box sx={{ bgcolor: 'lightblue', borderRadius: 5, marginRight: '20px' }}> {/* Moved search box to the right */}
          <Search onSearch={handleSearch} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}> {/* Adjusted margin here */}
            <AccountCircleIcon onClick={handleClick}/>
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
