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
  allCommentsReducer,
  commentViewReducer
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
import{
  ratingAddReducer,
  allRatingsReducer,
} from "./reducers/ratingReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "seller", "admin"], // Specify which reducers you want to persist
};

const rootReducer = combineReducers({
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
  allComments: allCommentsReducer,
  commentView: commentViewReducer,
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
  ratingAdd: ratingAddReducer,
  allRatings: allRatingsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
