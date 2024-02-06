// Home.js
import React from 'react';
import Header from './Header';
import Banner from './Banner';
import ProductCategories from './ProductCategories';
import FeaturedProducts from './FeaturedProducts';

function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <ProductCategories />
      <FeaturedProducts />
      {/* Add testimonials, call to action buttons, footer, etc. */}
    </div>
  );
}

export default Home;
