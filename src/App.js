// App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Admin/Navbar.js'; // Import Navbar component
import Footer from './components/Layouts/Footer'; // Import Footer component
// import ProductList from './components/ProductList'; // Import ProductList component
import Sidebar from './components/Admin/Sidebar.js';
import LoginSignup from './components/User/LoginSignup.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import Dashboard from './components/Admin/Dashboard.js';
import Orders from './components/Admin/Orders.js';
import Invoices from './components/Admin/Invoices.js';
import Category from './components/Admin/Category.js';
import ProductDetails from './components/Product/ProductDetails';
import Buyers from './components/Admin/Buyers.js';
import Sellers from './components/Admin/Sellers.js';
import Home from './components/Home/Home';
import Header from './components/Layouts/Header/Header.js';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';
import UserOptions from './components/Layouts/Header/UserOptions.js'
import { useSelector } from 'react-redux';
// import store from './store.js';
// import {loadUser} from './actions/userAction.js';

function App() {
  const {isAuthenticated, user} = useSelector((state)=>state.user)
  // React.useEffect(()=>{
  //   store.dispatch(loadUser());
  // },[])
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const routes = [
    {
      path: '/',
      element: loggedIn ? <Dashboard /> : <Navigate to="/login" />,
    },
    {
      name: 'Sales',
      icon: <ShoppingCartIcon />,
      children: [
        { path: '/orders', name: 'Orders', component:Orders },
        { path: '/invoices', name: 'Invoices', component:Invoices }
      ]
    },
    {
      name: 'Inventory',
      icon: <StorefrontIcon />,
      children: [
        { path: '/category', name: 'Category', component:Category },
        // { path: '/product-details', name: 'Product Details', component: ProductDetails1}
      ]
    },
    {
      name: 'Customers',
      icon: <PeopleIcon />,
      children: [
        { path: '/buyer', name: 'Buyer', component: Buyers },
        { path: '/seller', name: 'Seller', component: Sellers}
      ]
    }
  ];


  return (
    <Router>
      <div>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
      {/* {!['/login', '/register', '/'].includes(window.location.pathname) &&
          <React.Fragment>
            <Navbar handleDrawerOpen={handleDrawerOpen} handleLogout={handleLogout} />
            <Sidebar open={open} onClose={handleClose} routes={routes} />
          </React.Fragment>
        } */}
        <Routes>
          
          <Route index path="/" element={<Home/>} />
          <Route index path='/product/:id' element={<ProductDetails />} />
          <Route index path='/products' element={<Products/>} /> 
          <Route index path='/search' element={<Search/>} /> 
          <Route path='/products/:keyword' element={<Products/>} /> 
          
          <Route index path="/loginsignup" element={<LoginSignup />} /> 
        {/* <Route index path="/dashboard" element={<Dashboard/>} /> */}
        {/*<Route path="/product-details" element={<ProductDetails />} /> */}
        {/* {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))} */}
          {/* <Route path='/sidebar' element={ <Sidebar open={open} routes={routes} />} /> */}
          {/* <Route path="/products" element={ <ProductList products={products} />} />
          <Route path="/products/:id" element={ <ProductDetail products={products} /> } /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
