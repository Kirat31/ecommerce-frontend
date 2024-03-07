import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createProductReducer, productDetailsReducer, productReducer} from './reducers/productReducer'; // Import your root reducer
import { forgotPasswordReducer, profileReducer, resetPasswordReducer, updatePasswordReducer, userListReducer, userReducer, userDetailsReducer, preVerifyUserReducer, registrationReducer } from './reducers/userReducer';
import { commentAddReducer, commentListReducer } from './reducers/commentReducer';
import inventoryReducer from './reducers/inventoryReducer';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Specify which reducers you want to persist
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
    commentList: commentListReducer,
    preVerifyUser: preVerifyUserReducer,
    registration: registrationReducer,
    inventory: inventoryReducer
});

const initialState = {};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export {store, persistor};
