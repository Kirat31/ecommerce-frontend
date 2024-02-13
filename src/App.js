// App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './components/Layouts/Footer'; // Import Footer component
import ProductDetails from './components/Product/ProductDetails';
import Home from './components/Home/Home';
import Header from './components/Layouts/Header';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route index path='/product/:id' element={<ProductDetails />} />
          <Route index path='/products' element={<Products/>} /> 
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
