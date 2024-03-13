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
import Users from './components/Admin/Users.js';
import UserDetails from './components/Admin/UserDetails.js';
import Home from './components/Home/Home';
import Header from './components/Layouts/Header/Header.js';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';
import UserOptions from './components/Layouts/Header/UserOptions.js'
import SellerOptions from './components/Layouts/Header/SellerOptions.js'
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js'
import UpdateProfile from './components/User/UpdateProfile.js'
import UpdatePassword from './components/User/UpdatePassword.js'
import EmailVerification from './components/User/EmailVerification.js';
import ForgotPassword from './components/User/ForgotPassword.js'
import ResetPassword from './components/User/ResetPassword.js';
import CreateProductForm from './components/Product/CreateProductForm.js';
import UpdateProductForm from './components/Product/UpdateProductForm.js';
import RegistrationForm from './components/User/Registration.js';
import GetInventory from './components/Inventory/GetInventory.js';
import AddInventoryForm from './components/Inventory/AddInventoryForm.js';
import ProtectedRoute from './components/Route/ProtectedRoute.js'
import InventoryDetails from './components/Inventory/InventoryDetails.js';
import UpdateInventoryForm from './components/Inventory/UpdateInventoryForm.js';
import SellerLogin from './components/Seller/SellerLogin.js';
import RegistrationSeller from './components/Seller/RegistrationSeller.js'
import SellerProfile from './components/Seller/SellerProfile.js'
import ForgotPasswordSeller from './components/Seller/ForgotPasswordSeller.js'
import ResetPasswordSeller from './components/Seller/ResetPasswordSeller.js'
import UpdatePasswordSeller from './components/Seller/UpdatePasswordSeller.js'
import UpdateProfileSeller from './components/Seller/UpdateProfileSeller.js'

// import store from './store.js';
// import {loadUser} from './actions/userAction.js';

function App() {
  const {isAuthenticated, user} = useSelector((state)=>state.user)
  const {isAuthenticated: sellerAuth, sellerInfo} = useSelector((state) => state.seller)
  // React.useEffect(()=>{
  //   store.dispatch(loadUser());
  // },[])
  const userRole = useSelector(state => state.user.role);

  return (
    <Router>
      <div>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        {sellerAuth && <SellerOptions seller={sellerInfo} />}
   
        <Routes>
          
          <Route index path="/" element={<Home/>} />
          <Route index path='/product/:id' element={<ProductDetails />} />
          <Route index path='/products' element={<Products/>} /> 
          <Route index path='/search' element={<Search/>} /> 
          <Route path='/products/:keyword' element={<Products/>} /> 
          <Route index path="/account" element={isAuthenticated && <Profile />} />
          <Route index path="/updatee" element={isAuthenticated && <UpdateProfile />} />
          <Route index path="/updatee-seller" element={sellerAuth && <UpdateProfileSeller />} />
          <Route index path="/update-password" element={isAuthenticated && <UpdatePassword />} />
          <Route index path="/update-password-seller" element={sellerAuth && <UpdatePasswordSeller />} />
          <Route index path="/forgot-password" element={<ForgotPassword />} />
          <Route index path='/forgot-password-seller' element={<ForgotPasswordSeller />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/reset-password-seller/:token' element={<ResetPasswordSeller />} />
          <Route path="/user-details/:token" element={<UserDetails />} />
          <Route index path="/loginsignup" element={<LoginSignup />} />
          <Route index path="/seller-login" element={<SellerLogin />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/create-product" element={<CreateProductForm />} />
          <Route path="/update-product/:id" element={<UpdateProductForm />} />
          {/* <ProtectedRoute path="/account" element={<Profile />} isAuthenticated={isAuthenticated} /> */}
          <Route index path="/dashboard" element={<Dashboard/>} />
          <Route index path="/users" element={<Users/>} />
          <Route path="/registration/:token" element={< RegistrationForm/>} />
          <Route path="/registration-seller/:token" element={< RegistrationSeller/>} />
          <Route path='/seller-account' element={sellerAuth && <SellerProfile />} />
          <Route path='/inventory' element={<GetInventory />} />
          <Route path='/add-inventory' element={<AddInventoryForm />} />
          <Route index path='/inventory-details/:id' element={<InventoryDetails />} />
          <Route index path="/update-inventory/:id" element={<UpdateInventoryForm />} />
    
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
