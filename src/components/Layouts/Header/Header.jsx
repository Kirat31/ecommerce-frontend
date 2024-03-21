import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Login, Logout, Shop2, Store } from '@mui/icons-material';

import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Divider, Drawer, ListItemIcon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from 'styled-components';
import { NavLogo } from '../../../utils/styles';

//import Cart from './customer/components/Cart';
import Search from './Search';
// import ProductsMenu from './customer/components/ProductsMenu';
import { updateProfile } from '../../../actions/userAction';

const Navbar = () => {
    // const { currentUser, currentRole } = useSelector(state => state.user);
    const {isAuthenticated, user } = useSelector((state)=>state.user)
    const {isAuthenticated: sellerAuth, sellerInfo} = useSelector((state) => state.seller)
    const {isAuthenticated: adminAuth, adminInfo} = useSelector((state) => state.admin)
    // const totalQuantity = currentUser && currentUser.cartDetails && currentUser.cartDetails.reduce((total, item) => total + item.quantity, 0);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isAuthenticated) {
            console.log(user);
            dispatch(updateProfile(user, user._id));
        }
    }, [isAuthenticated, user, dispatch])

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElSign, setAnchorElSign] = React.useState(null);

    const open = Boolean(anchorElUser);
    const openSign = Boolean(anchorElSign);

    const [isCartOpen, setIsCartOpen] = React.useState(false);

    // Cart
    const handleOpenCart = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    // Navigation Menu
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // User Menu
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Signin Menu
    const handleOpenSigninMenu = (event) => {
        setAnchorElSign(event.currentTarget);
    };

    const handleCloseSigninMenu = () => {
        setAnchorElSign(null);
    };

    const homeHandler = () => {
        navigate("/")
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl" sx={{ backgroundColor: "#856084" }}>
                <Toolbar disableGutters>

                    {/* MOBILE */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => { navigate("/Search") }}
                            color="inherit"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    <HomeContainer>
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
                                SHOPCART
                            </NavLogo>
                        </Typography>
                    </HomeContainer>

                    {!isAuthenticated && !sellerAuth &&
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <Login />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    onClick={handleCloseUserMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        navigate("/loginsignup")
                                        handleCloseNavMenu()
                                    }}>
                                        <Typography textAlign="center" sx={{textDecoration: 'null'}}>Sign in as customer</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        navigate("/seller-login")
                                        handleCloseNavMenu()
                                    }}>
                                        <Typography textAlign="center">Sign in as seller</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        </Box>
                    }

                    {/* DESKTOP */}

                    <HomeContainer>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
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

                                E-COMMERCE
                            </NavLogo>
                        </Typography>
                    </HomeContainer>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, }}>
                        <Search />
                        {/* <ProductsMenu dropName="Categories" />
                        <ProductsMenu dropName="Products" /> */}
                    </Box>

                    {!isAuthenticated && !sellerAuth &&
                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, }}>
                            <Button
    onClick={handleOpenSigninMenu}
    sx={{
        my: 2,
        color: 'white',
        display: 'flex',   // Use flex display
        alignItems: 'center'  // Align items vertically in center
    }}
>
    <PersonOutlineSharpIcon sx={{ width: 26, height: 26, mr: 1 }} /> {/*Add margin to separate Avatar and text */}
    Sign in
</Button>
                            <Menu
                                anchorEl={anchorElSign}
                                id="menu-appbar"
                                open={openSign}
                                onClose={handleCloseSigninMenu}
                                onClick={handleCloseSigninMenu}
                                PaperProps={{
                                    elevation: 0,
                                    sx: styles.styledPaper,
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={() => navigate("/loginsignup")} 
                                // sx={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <Avatar />
                                    <Link to="/loginsignup">
                                        Sign in as customer
                                    </Link>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => navigate("/seller-login")} 
                                // sx={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <ListItemIcon>
                                        <Store fontSize="small" />
                                    </ListItemIcon>
                                    <Link to="/seller-login">
                                        Sign in as seller
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                    }

                    {/* BOTH */}

                    {isAuthenticated &&
                        <Box sx={{ flexGrow: 0, display: 'flex' }}>
                            <Tooltip title="Cart">
                                <IconButton onClick={handleOpenCart} sx={{ width: "4rem", color: 'inherit', p: 0 }}>
                                    <Badge badgeContent={0} color="error">
                                        <ShoppingCartIcon sx={{ fontSize: "2rem" }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32, backgroundColor: "#8970dc" }}>
                                        {String(user.firstName).charAt(0)}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorElUser}
                                id="menu-appbar"
                                open={open}
                                onClose={handleCloseUserMenu}
                                onClick={handleCloseUserMenu}
                                PaperProps={{
                                    elevation: 0,
                                    sx: styles.styledPaper,
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={() => navigate("/account")}>
                                    <Avatar />
                                    <Link to="/account">
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => navigate("/Orders")}>
                                    <ListItemIcon>
                                        <Shop2 fontSize="small" />
                                    </ListItemIcon>
                                    <Link to="/Orders">
                                        My Orders
                                    </Link>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => navigate("/Logout")}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <Link to="/Logout">
                                        Logout
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                    }

                </Toolbar>
            </Container>

            {
                isCartOpen &&
                <Drawer
                    anchor="right"
                    open={isCartOpen}
                    onClose={handleCloseCart}
                    sx={{
                        width: '400px',
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: '400px',
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    {/* <Cart setIsCartOpen={setIsCartOpen} /> */}
                </Drawer>
            }
        </AppBar >
    );
}
export default Navbar;

const HomeContainer = styled.div`
  display: flex;
  cursor:pointer;
`;

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
}