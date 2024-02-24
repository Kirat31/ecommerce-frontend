// Home.js
import React from 'react';
import Header from '../Layouts/Header/Header';
import Banner from './Banner';
//import ProductCategories from '../ProductCategories';
import FeaturedProducts from './FeaturedProducts';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader'


function Home() {

  

  return (
    <div>
      <MetaData title={"Ecommerce"} />
      <Banner />
      {/* <ProductCategories /> */}
      <FeaturedProducts />
      {/* Add testimonials, call to action buttons, footer, etc. */}
    </div>
  );
}

export default Home;
