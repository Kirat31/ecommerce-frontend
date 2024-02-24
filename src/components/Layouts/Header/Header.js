// Header.js
import React, {useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Search from '../../Product/Search';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../../actions/productAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
  
  const dispatch = useDispatch();
  const handleSearch = (searchKeyword) => {
    dispatch(getProduct(searchKeyword));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          My E-Commerce Store
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'centre', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ bgcolor: 'lightblue', ml: 1, borderRadius: 5 }}>
            <Search onSearch={handleSearch} />
          </Box>
          <Link to="/loginsignup">
            <AccountCircleIcon />
          </Link>
        </Box>
      
      </Toolbar>
    </AppBar>
  );
}

export default Header;
