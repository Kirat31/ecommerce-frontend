// App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Admin/Navbar.js'; // Import Navbar component
import Footer from './components/Layouts/Footer'; // Import Footer component
// import ProductList from './components/ProductList'; // Import ProductList component
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
import Profile from './components/User/Profile.js'
import UpdateProfile from './components/User/UpdateProfile.js'
import UpdatePassword from './components/User/UpdatePassword.js'
import EmailVerification from './components/User/EmailVerification.js';
import ForgotPassword from './components/User/ForgotPassword.js'
import ResetPassword from './components/User/ResetPassword.js';
import CreateProductForm from './components/Product/CreateProductForm.js';
import ProtectedRoute from './components/Route/ProtectedRoute.js'
// import store from './store.js';
// import {loadUser} from './actions/userAction.js';

function App() {
  const {isAuthenticated, user} = useSelector((state)=>state.user)
  // React.useEffect(()=>{
  //   store.dispatch(loadUser());
  // },[])
  const userRole = useSelector(state => state.user.role);

  return (
    <Router>
      <div>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
   
        <Routes>
          
          <Route index path="/" element={<Home/>} />
          <Route index path='/product/:id' element={<ProductDetails />} />
          <Route index path='/products' element={<Products/>} /> 
          <Route index path='/search' element={<Search/>} /> 
          <Route path='/products/:keyword' element={<Products/>} /> 
          <Route index path="/account" element={isAuthenticated && <Profile />} />
          <Route index path="/updatee" element={isAuthenticated && <UpdateProfile />} />
          <Route index path="/update-password" element={isAuthenticated && <UpdatePassword />} />
          <Route index path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route index path="/loginsignup" element={<LoginSignup />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/create-product" element={<CreateProductForm />} />
 
          {/* <ProtectedRoute path="/account" element={<Profile />} isAuthenticated={isAuthenticated} /> */}
        <Route index path="/dashboard" element={<Dashboard/>} />
    
        {/* {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))} */}
          {/* <Route path='/sidebar' element={ <Sidebar open={open} routes={routes} />} /> */}
         
         
        </Routes>
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
