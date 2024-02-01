// App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import Footer from './components/Footer'; // Import Footer component
// import ProductList from './components/ProductList'; // Import ProductList component
// import ProductDetail from './components/ProductDetail'; // Import ProductDetail component
import Sidebar from './components/Sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Invoices from './components/Invoices';
import Category from './components/Category';
import ProductDetails from './components/ProductDetails';
import Buyers from './components/Buyers';
import Sellers from './components/Sellers';

function App() {
  // const products = [
  //   // Sample product data
  //   { id: 1, name: 'Product 1', description: 'Description for Product 1' },
  //   { id: 2, name: 'Product 2', description: 'Description for Product 2' },
  //   // Add more products as needed
  // ];
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const routes = [
    {
      name: 'Sales',
      icon: <ShoppingCartIcon />,
      children: [
        { path: '/orders', name: 'Orders', component:Orders },
        { path: '/invoices', name: 'Invoices', component:Invoices }
      ]
    },
    {
      name: 'Inventory',
      icon: <StorefrontIcon />,
      children: [
        { path: '/category', name: 'Category', component:Category },
        { path: '/product-details', name: 'Product Details', component: ProductDetails}
      ]
    },
    {
      name: 'Customers',
      icon: <PeopleIcon />,
      children: [
        { path: '/buyer', name: 'Buyer', component: Buyers },
        { path: '/seller', name: 'Seller', component: Sellers}
      ]
    }
  ];


  return (
    <Router>
      <div>
        <Navbar handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} onClose={handleClose} routes={routes} />
        <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}
          {/* <Route path='/sidebar' element={ <Sidebar open={open} routes={routes} />} /> */}
          <Route path="/" element={ <Dashboard />} />
          {/* <Route path="/products" element={ <ProductList products={products} />} />
          <Route path="/products/:id" element={ <ProductDetail products={products} /> } /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
