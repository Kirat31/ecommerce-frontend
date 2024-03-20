// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Layouts/Footer"; // Import Footer component
// import ProductList from './components/ProductList'; // Import ProductList component
import LoginSignup from "./components/User/LoginSignup.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductDetails from "./components/Product/ProductDetails";
import Users from "./components/Admin/Users.js";
import Sellers from "./components/Admin/Sellers.js";
import UserDetails from "./components/Admin/UserDetails.js";
import SellerDetails from "./components/Admin/SellerDetails.js";
import Home from "./components/Home/Home";
import Header from "./components/Layouts/Header/Header.jsx";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import UserOptions from "./components/Layouts/Header/UserOptions.jsx";
import AdminOptions from "./components/Layouts/Header/AdminOptions.jsx";
import SellerOptions from "./components/Layouts/Header/SellerOptions.jsx";
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
import GetInventory from "./components/Inventory/GetInventory.js";
import AddInventoryForm from "./components/Inventory/AddInventoryForm.js";
import InventoryDetails from "./components/Inventory/InventoryDetails.js";
import UpdateInventoryForm from "./components/Inventory/UpdateInventoryForm.js";
import SellerLogin from "./components/Seller/SellerLogin.js";
import AdminLogin from "./components/Admin/AdminLogin.js";
import ForgotPasswordAdmin from "./components/Admin/ForgotPasswordAdmin.js";
import ResetPasswordAdmin from "./components/Admin/ResetPasswordAdmin.js";
import RegistrationSeller from "./components/Seller/RegistrationSeller.js";
import SellerProfile from "./components/Seller/SellerProfile.js";
import AdminProfile from "./components/Admin/AdminProfile.js";
import ForgotPasswordSeller from "./components/Seller/ForgotPasswordSeller.js";
import ResetPasswordSeller from "./components/Seller/ResetPasswordSeller.js";
import UpdatePasswordSeller from "./components/Seller/UpdatePasswordSeller.js";
import UpdatePasswordAdmin from "./components/Admin/UpdatePasswordAdmin.js";
import UpdateProfileSeller from "./components/Seller/UpdateProfileSeller.js";
import { BrowserRouter } from "react-router-dom";

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
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        {sellerAuth && <SellerOptions seller={sellerInfo} />}
        {adminAuth && <AdminOptions admin={adminInfo} />}

        <Routes>
          <Route index path="/" element={<Home />} />
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
            index
            path="/updatee"
            element={isAuthenticated && <UpdateProfile />}
          />
          <Route
            index
            path="/updatee-seller"
            element={sellerAuth && <UpdateProfileSeller />}
          />
          <Route
            index
            path="/update-password"
            element={isAuthenticated && <UpdatePassword />}
          />
          <Route
            index
            path="/update-password-seller"
            element={sellerAuth && <UpdatePasswordSeller />}
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
          <Route path="/user-details/:id" element={<UserDetails />} />
          <Route path="/seller-details/:id" element={<SellerDetails />} />
          <Route index path="/loginsignup" element={<LoginSignup />} />
          <Route index path="/seller-login" element={<SellerLogin />} />
          <Route index path="/admin-login" element={<AdminLogin />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/create-product" element={<CreateProductForm />} />
          <Route path="/update-product/:id" element={<UpdateProductForm />} />
          {/* <ProtectedRoute path="/account" element={<Profile />} isAuthenticated={isAuthenticated} /> */}
          <Route index path="/dashboard" element={<Dashboard />} />
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
          <Route path="/inventory" element={<GetInventory />} />
          <Route path="/add-inventory" element={<AddInventoryForm />} />
          <Route
            index
            path="/inventory-details/:id"
            element={<InventoryDetails />}
          />
          <Route
            index
            path="/update-inventory/:id"
            element={<UpdateInventoryForm />}
          />
          <Route
            path="/admin-account"
            element={adminAuth && <AdminProfile />}
          />

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
    </BrowserRouter>
  );
}

export default App;
