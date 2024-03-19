// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, MenuItem, Menu, Container, IconButton } from '@mui/material';
// import { Link } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import Search from '../../Product/Search';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../../actions/productAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person from '@mui/icons-material/Person';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';

function Header() {
  
  const dispatch = useDispatch();
  const [toggleprimary, setToggleprimary] = useState(false)
  const [togglesecondary, setToggleSecondary] = useState(false)
  const {user} = useSelector((state)=>state.user)
  const [anchorEl, setAnchorEl] = useState(null);

  const primarytoggle = () => {
    setToggleprimary(!toggleprimary)
  }
  const secondarytoggle = () => {
    setToggleSecondary(!togglesecondary)
  }


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
    <AppBar position="sticky" > {/* Changed header background color to light gray */}
      <Container maxWidth="xl" sx={{ backgroundColor: "#4d1c9c" }}>
      <Toolbar disableGutters> {/* Changed toolbar background color to light gray */}
      
        
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Wrap the IconButton with a Link */}
      <IconButton edge="start" color="inherit" aria-label="menu">
        <StoreIcon fontSize="large" /> {/* Use fontSize to adjust icon size */}
      </IconButton>
      {/* Add Typography for the title */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#333333' }}>
        My E-Commerce Store
      </Typography>
    </Link>
        <Box sx={{ bgcolor: 'white', borderRadius: 5, marginRight: '10px' }}> {/* Moved search box to the right */}
          <Search onSearch={handleSearch} />
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/" sx={{ color: '#333333' }}>Home</Button> {/* Changed button text color to dark gray */}
          <Button color="inherit" component={Link} to="/products" sx={{ color: '#333333' }}>Products</Button> {/* Changed button text color to dark gray */}
          <Button color="inherit" component={Link} to="/about" sx={{ color: '#333333' }}>About</Button> {/* Changed button text color to dark gray */}
          <Button color="inherit" component={Link} to="/contact" sx={{ color: '#333333' }}>Contact</Button> {/* Changed button text color to dark gray */}
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
      </Container>
    </AppBar>
  );
}

export default Header;
