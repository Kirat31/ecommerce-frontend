// Sidebar.js
import React, { useState } from 'react';
import { Drawer, List, ListItemText, ListItemIcon, Collapse, AppBar, Toolbar, IconButton, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import PeopleIcon from '@mui/icons-material/People';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

function Sidebar({ routes, open, onClose }) {
    
    const [openMenus, setOpenMenus] = useState({});

    const handleToggleMenu = (index) => {
        setOpenMenus((prevOpenMenus) => ({
          ...prevOpenMenus,
          [index]: !prevOpenMenus[index],
        }));
      };

    return (
        <Drawer variant="persistent" anchor="left" open={open}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div>
            <List>
            <ListItemButton component={Link} to="/dashboard" onClick={onClose}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                </ListItemButton>
                {routes.map((route, index) => (
                <div key={index}>
                    <ListItemButton onClick={()=> handleToggleMenu(index)}>
                        <ListItemIcon>
                            {route.icon}
                        </ListItemIcon>
                        <ListItemText primary={route.name} />
                        {route.children && (openMenus[index] ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    {route.children && (
                        <Collapse in={openMenus[index]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {route.children.map((childRoute, childIndex) => (
                                <ListItemButton key={childIndex} component={Link} to={childRoute.path} selected={childRoute.path === window.location.pathname} style={{ paddingLeft: '24px' }}>
                                <ListItemText primary={childRoute.name} />
                                </ListItemButton>
                            ))}
                            </List>
                        </Collapse>
                    )}
                </div>
                ))}
            </List>
        </div>
        </Drawer>
    );
}

export default Sidebar;
