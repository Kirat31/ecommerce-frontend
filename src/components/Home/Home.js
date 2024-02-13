// Home.js
import React from 'react';
import Header from '../Layouts/Header';
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
      <FeaturedProducts />
    </div>
  );
}

export default Home;
