// Header.js
import React, {useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Search from '../Product/Search';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../actions/productAction';

function Header() {
  
  const dispatch = useDispatch();
  const handleSearch = (searchKeyword) => {
    dispatch(getProduct(searchKeyword));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My E-Commerce Store
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '80%' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Box sx={{ bgcolor: 'lightblue', ml: 1, borderRadius: 5 }}>
            <Search onSearch={handleSearch} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
