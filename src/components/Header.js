// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My E-Commerce Store
        </Typography>
        {/* Add navigation links, search bar, etc. */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
