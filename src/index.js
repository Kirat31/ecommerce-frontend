import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './store';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import axios from 'axios'; // Import Axios
import setupAxiosInterceptors from './axiosConfig'; // Import the function for setting up Axios interceptors

// Set up Axios interceptors
setupAxiosInterceptors();

const options ={
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
