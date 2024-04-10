// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx"; // Import Footer component
// import ProductList from './components/ProductList'; // Import ProductList component
import LoginSignup from "./components/User/LoginSignup.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Users from "./components/Admin/Users.js";
import Sellers from "./components/Admin/Sellers.js";
import UserDetails from "./components/Admin/UserDetails.js";
import SellerDetails from "./components/Admin/SellerDetails.js";
import Home from "./components/Home/Home.jsx";
import Header from "./components/Header.jsx";
import Checkout from "./components/User/Checkout.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import AdminOptions from "./components/Layouts/Header/AdminOptions.jsx";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import EmailVerification from "./components/User/EmailVerification.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import CreateProductForm from "./components/Product/CreateProductForm.js";
import UpdateProductForm from "./components/Product/UpdateProductForm.js";
import RegistrationForm from "./components/User/Registration.js";
import CancelOrder from "./components/User/CancelOrder.js";
import Cart from "./components/User/Cart.jsx"
import SellerLogin from "./components/Seller/SellerLogin.js";
import AdminLogin from "./components/Admin/AdminLogin.js";
import ForgotPasswordAdmin from "./components/Admin/ForgotPasswordAdmin.js";
import ResetPasswordAdmin from "./components/Admin/ResetPasswordAdmin.js";
import RegistrationSeller from "./components/Seller/RegistrationSeller.js";
import SellerProfile from "./components/Seller/SellerProfile.js";
import AdminProfile from "./components/Admin/AdminProfile.js";
import ForgotPasswordSeller from "./components/Seller/ForgotPasswordSeller.js";
import ResetPasswordSeller from "./components/Seller/ResetPasswordSeller.js";

import UpdatePasswordAdmin from "./components/Admin/UpdatePasswordAdmin.js";

import Logout from "./components/User/Logout.js";
import SellerDashboard from "./components/Seller/SellerDashboard.js";
import AdminDashboard from "./components/Admin/AdminDashboard.js";
import OrderPlaced from "./components/User/OrderPlaced.js";

// import store from './store.js';
// import {loadUser} from './actions/userAction.js';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isAuthenticated: sellerAuth, sellerInfo } = useSelector(
    (state) => state.seller
  );
  const { isAuthenticated: adminAuth, adminInfo } = useSelector(
    (state) => state.admin
  );
  // React.useEffect(()=>{
  //   store.dispatch(loadUser());
  // },[])
  // const userRole = useSelector(state => state.user.role);

  return (
    <BrowserRouter>
      <div>
        {!sellerAuth && !adminAuth && <Header />}
        {/* {isAuthenticated && <UserOptions user={user} />} */}
        {/* {sellerAuth && <SellerOptions seller={sellerInfo} />} */}
        {/* {adminAuth && <AdminOptions admin={adminInfo} />} */}

        <Routes>
          <Route index path="/" element={!sellerAuth && !adminAuth && <Home />} />
          <Route index path="/product/:id" element={<ProductDetails />} />
          <Route index path="/products" element={<Products />} />
          <Route index path="/search" element={<Search />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route
            index
            path="/account"
            element={isAuthenticated && <Profile />}
          />
          <Route
            path="/cart"
            element={<Cart />} 
          />
          <Route
            path="/orderPlaced"
            element={<OrderPlaced />}
          />
          <Route
            index
            path="/updatee"
            element={isAuthenticated && <UpdateProfile />}
          />
          <Route
          index 
          path="/logout"
          element={isAuthenticated && <Logout />}
          />
         
          <Route
            index
            path="/update-password"
            element={isAuthenticated && <UpdatePassword />}
          />
          
          <Route
            index
            path="/update-password-admin"
            element={adminAuth && <UpdatePasswordAdmin />}
          />
          <Route index path="/forgot-password" element={<ForgotPassword />} />
          <Route
            index
            path="/forgot-password-seller"
            element={<ForgotPasswordSeller />}
          />
          <Route
            index
            path="/forgot-password-admin"
            element={<ForgotPasswordAdmin />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/reset-password-seller/:token"
            element={<ResetPasswordSeller />}
          />
          <Route
            path="/reset-password-admin/:token"
            element={<ResetPasswordAdmin />}
          />
          <Route path="/user-details/:token" element={<UserDetails />} />
          <Route path="/seller-details/:token" element={<SellerDetails />} />
{/* ======= */}
          <Route path='/reset-password-seller/:token' element={<ResetPasswordSeller />} />
          <Route path='/reset-password-admin/:token' element={<ResetPasswordAdmin />} />
          <Route path="/user-details/:id" element={<UserDetails />} />
          <Route path="/seller-details/:id" element={<SellerDetails />} />

          <Route index path="/loginsignup" element={<LoginSignup />} />
          <Route index path="/seller-login" element={<SellerLogin />} />
          <Route index path="/admin-login" element={<AdminLogin />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/create-product" element={<CreateProductForm />} />
          <Route path="/update-product/:id" element={<UpdateProductForm />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cancel-order" element={<CancelOrder />} />
          {/* <ProtectedRoute path="/account" element={<Profile />} isAuthenticated={isAuthenticated} /> */}
          {/* <Route index path="/dashboard" element={<Dashboard />} /> */}
          <Route index path="/users" element={adminAuth && <Users />} />
          <Route index path="/sellers" element={adminAuth && <Sellers />} />
          <Route path="/registration/:token" element={<RegistrationForm />} />
          <Route
            path="/registration-seller/:token"
            element={<RegistrationSeller />}
          />
          <Route
            path="/seller-account"
            element={sellerAuth && <SellerProfile />}
          />
          
          
          
          
          <Route
            path="/admin-account"
            element={adminAuth && <AdminProfile />}
          />

         
        </Routes>
        {sellerAuth && <SellerDashboard />}
        {adminAuth && <AdminDashboard />}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
