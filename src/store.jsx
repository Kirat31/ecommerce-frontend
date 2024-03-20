<<<<<<< HEAD:src/store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import {
  createProductReducer,
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";
import {
  forgotPasswordReducer,
  profileReducer,
  resetPasswordReducer,
  updatePasswordReducer,
  userListReducer,
  userReducer,
  userDetailsReducer,
  preVerifyUserReducer,
  verifyEmailReducer,
  registrationReducer,
} from "./reducers/userReducer";
import {
  commentAddReducer,
  commentListReducer,
} from "./reducers/commentReducer";
import {
  getInventoryReducer,
  inventoryDetailsReducer,
  inventoryReducer,
  updateInventoryReducer,
} from "./reducers/inventoryReducer";
import {
  preVerifySellerReducer,
  sellerReducer,
  sellerVerifyReducer,
  sellerRegisterReducer,
  sellerDetailsReducer,
  forgotPasswordSellerReducer,
  resetPasswordSellerReducer,
  updatePasswordSellerReducer,
  updateSellerReducer,
  sellerListReducer,
  sellerDetailsAdminReducer,
} from "./reducers/sellerReducer";
import {
  adminReducer,
  forgotPasswordAdminReducer,
  resetPasswordAdminReducer,
  updatePasswordAdminReducer,
} from "./reducers/adminReducer";
=======
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createProductReducer, productDetailsReducer, productReducer} from './reducers/productReducer'; // Import your root reducer
import { forgotPasswordReducer, profileReducer, resetPasswordReducer, updatePasswordReducer, userListReducer, userReducer, userDetailsReducer, preVerifyUserReducer, verifyEmailReducer, registrationReducer } from './reducers/userReducer';
import { commentAddReducer, commentListReducer } from './reducers/commentReducer';
import {getInventoryReducer, inventoryDetailsReducer, inventoryReducer, updateInventoryReducer, inventoryDeleteReducer} from './reducers/inventoryReducer';
import { preVerifySellerReducer, sellerReducer, sellerVerifyReducer, sellerRegisterReducer, sellerDetailsReducer, forgotPasswordSellerReducer, resetPasswordSellerReducer, updatePasswordSellerReducer, updateSellerReducer, sellerListReducer, sellerDetailsAdminReducer } from './reducers/sellerReducer';
import {adminReducer, forgotPasswordAdminReducer, resetPasswordAdminReducer, updatePasswordAdminReducer} from './reducers/adminReducer';
>>>>>>> 5382e08cf0628e0b252ee85bb9a3f66de7f62e94:src/store.jsx

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "seller", "admin"], // Specify which reducers you want to persist
};

const rootReducer = combineReducers({
<<<<<<< HEAD:src/store.js
  createProduct: createProductReducer,
  products: productReducer,
  productDetails: productDetailsReducer,
  userList: userListReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  updatePassword: updatePasswordReducer,
  resetPassword: resetPasswordReducer,
  commentAdd: commentAddReducer,
  commentList: commentListReducer,
  preVerifyUser: preVerifyUserReducer,
  registration: registrationReducer,
  verifyUser: verifyEmailReducer,
  inventory: inventoryReducer,
  getInventory: getInventoryReducer,
  inventoryDetails: inventoryDetailsReducer,
  updateInventory: updateInventoryReducer,
  preVerifySeller: preVerifySellerReducer,
  seller: sellerReducer,
  sellerVerify: sellerVerifyReducer,
  sellerRegister: sellerRegisterReducer,
  sellerDetails: sellerDetailsReducer,
  forgotPasswordSeller: forgotPasswordSellerReducer,
  resetPasswordSeller: resetPasswordSellerReducer,
  updatePasswordSeller: updatePasswordSellerReducer,
  sellerList: sellerListReducer,
  sellerDetailsAdmin: sellerDetailsAdminReducer,
  updateSeller: updateSellerReducer,
  admin: adminReducer,
  forgotPasswordAdmin: forgotPasswordAdminReducer,
  resetPasswordAdmin: resetPasswordAdminReducer,
  updatePasswordAdmin: updatePasswordAdminReducer,
=======
    createProduct: createProductReducer,
    products: productReducer,
    productDetails: productDetailsReducer,
    userList: userListReducer,
    user: userReducer,
    userDetails: userDetailsReducer, 
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    updatePassword: updatePasswordReducer,
    resetPassword: resetPasswordReducer,
    commentAdd: commentAddReducer,
    commentList: commentListReducer,
    preVerifyUser: preVerifyUserReducer,
    registration: registrationReducer,
    verifyUser: verifyEmailReducer,
    inventory: inventoryReducer,
    getInventory: getInventoryReducer,
    inventoryDetails: inventoryDetailsReducer,
    updateInventory: updateInventoryReducer,
    preVerifySeller: preVerifySellerReducer,
    seller: sellerReducer,
    sellerVerify: sellerVerifyReducer,
    sellerRegister: sellerRegisterReducer,
    sellerDetails: sellerDetailsReducer,
    forgotPasswordSeller: forgotPasswordSellerReducer,
    resetPasswordSeller: resetPasswordSellerReducer,
    updatePasswordSeller: updatePasswordSellerReducer,
    sellerList: sellerListReducer,
    sellerDetailsAdmin: sellerDetailsAdminReducer,
    updateSeller: updateSellerReducer,
    admin: adminReducer,
    forgotPasswordAdmin: forgotPasswordAdminReducer,
    resetPasswordAdmin: resetPasswordAdminReducer,
    updatePasswordAdmin: updatePasswordAdminReducer,
    inventoryDelete: inventoryDeleteReducer
>>>>>>> 5382e08cf0628e0b252ee85bb9a3f66de7f62e94:src/store.jsx
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
