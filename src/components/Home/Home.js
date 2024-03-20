// Home.js
import React, { useEffect, useState } from 'react';
// import Header from '../Layouts/Header/Header';
import Banner from './Banner';
import { Box, Container, styled } from '@mui/material';
//import ProductCategories from '../ProductCategories';
import { useDispatch, useSelector } from 'react-redux';
import FeaturedProducts from './FeaturedProducts';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader'
import { clearErrors, getProduct } from '../../actions/productAction';
import Slide from './Slide'
import { Link } from 'react-router-dom';

function Home() {
  const adURL =
  'https://rukminim1.flixcart.com/flap/464/708/image/1f03e99f6dc9f7a6.jpg?q=70';

  const dispatch = useDispatch();
  const [showNetworkError, setShowNetworkError] = useState(false);
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setShowNetworkError(true);
      }, 40000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <div>
      <MetaData title={"Ecommerce"} />
      <BannerBox>
        <Banner />
      </BannerBox>

      {showNetworkError ? (
        <StyledContainer>
          <h1>Sorry, network error.</h1>
        </StyledContainer>
      ) : error ? (
        <StyledContainer>
          <h1>Please Wait A Second</h1>
          <Loader size={70} speed={1.4} color="black" />
        </StyledContainer>
      ) : (
        <>
          {products==null ? (
            <>
              <StyledContainer>No products found right now</StyledContainer>
              <StyledContainer>
                Become a seller to add products
                <Link to={"/seller-login"}>
                  Join
                </Link>
              </StyledContainer>
            </>
          ) : (
            <>
              <Component>
                <LeftComponent>
                  <Slide products={products} title="Top Selection" />
                </LeftComponent>

                <RightComponent>
                  <img src={adURL} alt="" style={{ width: 217 }} />
                </RightComponent>
              </Component>

              <Slide products={products} title="Deals of the Day" />
              <Slide products={products} title="Suggested Items" />
              <Slide products={products} title="Discounts for You" />
              <Slide products={products} title="Recommended Items" />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const BannerBox = styled(Box)`
  padding: 20px 10px;
  background: #F2F2F2;
`;

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
  width: '83%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const RightComponent = styled(Box)(({ theme }) => ({
  marginTop: 10,
  background: '#FFFFFF',
  width: '17%',
  marginLeft: 10,
  padding: 5,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

