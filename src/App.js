// frontend/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import Products from './components/Product/Products';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products/>} />
          {/* Add more routes for other pages/modules */}
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
