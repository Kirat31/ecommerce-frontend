import React, { useState } from 'react';
import { Drawer, List, ListItemText, ListItemIcon, Collapse, AppBar, Toolbar, IconButton, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import Dashboard from './Dashboard.js';
import Orders from './Orders.js';
import Invoices from './Invoices.js';
import Category from './Category.js';
import Buyers from './Buyers.js';
import Sellers from './Sellers.js';

function Sidebar({ open, onClose }) {
    const [openMenus, setOpenMenus] = useState({});

    const handleToggleMenu = (index) => {
        setOpenMenus((prevOpenMenus) => ({
          ...prevOpenMenus,
          [index]: !prevOpenMenus[index],
        }));
    };

    const routes = [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          name: 'Sales',
          icon: <ShoppingCartIcon />,
          children: [
            { path: '/orders', name: 'Orders', component: <Orders /> },
            { path: '/invoices', name: 'Invoices', component: <Invoices /> }
          ]
        },
        {
          name: 'Inventory',
          icon: <StorefrontIcon />,
          children: [
            { path: '/category', name: 'Category', component: <Category /> },
          ]
        },
        {
          name: 'Customers',
          icon: <PeopleIcon />,
          children: [
            { path: '/buyer', name: 'Buyer', component: <Buyers /> },
            { path: '/seller', name: 'Seller', component: <Sellers /> }
          ]
        }
      ];

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
