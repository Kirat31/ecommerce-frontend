import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productDetailsReducer, productReducer} from './reducers/productReducer'; // Import your root reducer
import { forgotPasswordReducer, profileReducer, resetPasswordReducer, updatePasswordReducer, userListReducer, userReducer, userDetailsReducer } from './reducers/userReducer';
import { commentAddReducer } from './reducers/commentReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    userList: userListReducer,
    user: userReducer,
    userDetails: userDetailsReducer, 
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    updatePassword: updatePasswordReducer,
    resetPassword: resetPasswordReducer,
    commentAdd: commentAddReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
