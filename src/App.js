// App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import Footer from './components/Layouts/Footer'; // Import Footer component
// import ProductList from './components/ProductList'; // Import ProductList component
// import ProductDetail from './components/ProductDetail'; // Import ProductDetail component
import Sidebar from './components/Sidebar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Invoices from './components/Invoices';
import Category from './components/Category';
import ProductDetails from './components/ProductDetails';
import Buyers from './components/Buyers';
import Sellers from './components/Sellers';
import Home from './components/Home/Home';

function App() {
 
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
        { path: '/product-details', name: 'Product Details', component: ProductDetails}
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
        
      {!['/login', '/register', '/'].includes(window.location.pathname) &&
          <React.Fragment>
            <Navbar handleDrawerOpen={handleDrawerOpen} handleLogout={handleLogout} />
            <Sidebar open={open} onClose={handleClose} routes={routes} />
          </React.Fragment>
        }
        <Routes>
        <Route index path="/" element={<Home/>} />
        <Route index path="/login" element={<LoginForm handleLogin={handleLogin}/>} />
        <Route index path="/register" element={<RegisterForm/>} />
        <Route index path="/dashboard" element={<Dashboard/>} />
        <Route path="/product-details" element={<ProductDetails />} />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
          {/* <Route path='/sidebar' element={ <Sidebar open={open} routes={routes} />} /> */}
          <Route path="/" element={ <Home />} />
          {/* <Route path="/products" element={ <ProductList products={products} />} />
          <Route path="/products/:id" element={ <ProductDetail products={products} /> } /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
