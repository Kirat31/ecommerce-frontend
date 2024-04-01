import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Drawer, NavLogo } from '../../utils/styles';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useSelector } from 'react-redux';
import Logout from '../User/Logout';
import Dashboard from './Dashboard.js';
import AdminBar from './AdminBar.jsx';
import AdminProfile from './AdminProfile';
import Orders from './Orders';
// import ViewProductSeller from './ViewProductSeller';
// import CreateProductForm from '../Product/CreateProductForm';
import Users from './Users';
import UserDetails from './UserDetails.js';
// import UpdateProductForm from '../Product/UpdateProductForm';
// import GetInventory from "../Inventory/GetInventory";
// import AddInventoryForm from "../Inventory/AddInventoryForm.js";
// import InventoryDetails from "../Inventory/InventoryDetails.js";
// import UpdateInventoryForm from "../Inventory/UpdateInventoryForm.js";
// import UpdateProfileSeller from "./UpdateProfileSeller.js";
import UpdatePasswordAdmin from "./UpdatePasswordAdmin.js";
import Sellers from './Sellers.js';
import SellerDetails from './SellerDetails.js';
import AdminMenu from './AdminMenu.jsx';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const { isAuthenticated, adminInfo } = useSelector(state => state.admin);

    const navigate = useNavigate()

    const homeHandler = () => {
        navigate("/")
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute' sx={{ backgroundColor: "#856084" }}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <ListIcon />
                        </IconButton>

                        {/* Desktop */}
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{
                                mr: 2,
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: "pointer"
                            }}
                        >
                            <NavLogo
                                to="top"
                                activeClass="active"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={homeHandler}
                            >
                                <LocalMallIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                                ECOMMERCE
                            </NavLogo>
                        </Typography>

                        {/* Mobile */}

                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <NavLogo
                                to="top"
                                activeClass="active"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={homeHandler}
                            >
                                <LocalMallIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                                ECOMMERCE
                            </NavLogo>
                        </Typography>

                        <AdminMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <AdminBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<Dashboard />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route
                            index
                            path="/Admin/update-password"
                            element={<UpdatePasswordAdmin />}
                        />

                        {/* Class */}

                        <Route path="/Admin/orders" element={<Orders />} />

                        <Route path="/Admin/seller" element={<Sellers />} />
                        <Route path="/Admin/seller/details/:id" element={<SellerDetails />} />

                        <Route path="/Admin/user" element={<Users />} />
                        <Route path="/Admin/user/details/:id" element={<UserDetails />} />
                        <Route
                            index
                            path="/Admin/updatee-password-admin"
                            element={<UpdatePasswordAdmin/>}
                        />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box >
        </>
    );
}

export default AdminDashboard

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}