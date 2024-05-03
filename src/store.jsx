import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import {
  createProductReducer,
  productDetailsReducer,
  productReducer,
  productsBySellerReducer
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
  commentViewReducer,
  updateCommentReducer,
  commentDeleteReducer,
  averageRatingReducer
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
import {
  cartProductsReducer,
  cartUpdateReducer,
  cartDecreaseReducer,
  totalProductsReducer,
 
} from "./reducers/cartReducer";
import {
  orderReducer,
  getAllOrdersReducer,
  orderListReducer,
  updateOrderStatusReducer,
  weeklySalesReducer,
  orderCountReducer,
  cancelledOrderCountReducer
} from "./reducers/orderReducer";

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
  updateComment: updateCommentReducer,
  commentDelete: commentDeleteReducer,
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
  cartProducts: cartProductsReducer,
  cartUpdate: cartUpdateReducer,
  cartDecrease: cartDecreaseReducer,
  productsBySeller: productsBySellerReducer,
  orders: orderReducer,
  getAllOrders: getAllOrdersReducer,
  orderList: orderListReducer,
  updateOrderStatus: updateOrderStatusReducer,
  weeklySales: weeklySalesReducer,
  totalProducts: totalProductsReducer,
  orderCount: orderCountReducer,
  cancelledOrderCount: cancelledOrderCountReducer,
  averageRating: averageRatingReducer

  // ratingAdd: ratingAddReducer,
  // allRatings: allRatingsReducer,
  // updateRating: updateRatingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
