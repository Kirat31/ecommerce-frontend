// Home.js
import React from 'react';
import Header from '../Layouts/Header';
import Banner from '../Banner';
//import ProductCategories from '../ProductCategories';
import FeaturedProducts from './FeaturedProducts';
import MetaData from '../Layouts/MetaData';

function Home() {
  return (
    <div>
      <MetaData title={"Ecommerce"} />
      <Header />
      <Banner />
      {/* <ProductCategories /> */}
      <FeaturedProducts />
      {/* Add testimonials, call to action buttons, footer, etc. */}
    </div>
  );
}

export default Home;
