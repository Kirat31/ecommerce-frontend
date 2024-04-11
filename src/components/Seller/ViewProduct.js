import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BlueButton, DarkRedButton, GreenButton } from '../../utils/buttonStyles';
import { Link } from 'react-router-dom';
import { deleteProduct, getProductDetails, clearErrors } from '../../actions/productAction';
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Avatar, Box, Card, CircularProgress, Collapse, IconButton, Stack, TextField, Typography } from '@mui/material';

const ViewProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;
  console.log("id",productID);
  
  const {product,  loading, error} = useSelector((state) => state.productDetails);
  const { isAuthenticated, seller } = useSelector((state)=>state.seller);
  
  console.log("erfer", product);
  
  useEffect(() => {
    if (product) {
      console.log('Product:', product);
      console.log('Loading: ', loading);
      // Add more property access as needed
    } else {
      console.log('Product is undefined');
    }
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    //console.log('product', productDetails);
    console.log('Dispatching getProductDetails action...');
    console.log("in effect");
    dispatch(getProductDetails(productID));
  }, [ dispatch, productID]);
  
  //   const { loading, status, error, productDetails, responseDetails } = useSelector(state => state.user);
  
    return (
      <>
        {loading ?
          <div><CircularProgress /> </div>
          :(
          <Box>
  
           {console.log("pro", product)};
                  <ProductContainer>
                    <ProductImage src={product && product.images[0]?.url} alt={product && product.name} />
                    <ProductInfo>
                      <ProductName>{product && product.name}</ProductName>
                      <PriceContainer>
                        <PriceCost>₹{product && product.price }</PriceCost>
                      </PriceContainer>
                      <Description>{product && product.description}</Description>
                      <ProductDetails>
                        <p>Category: {product && product.category}</p>
                        <p>Subcategory: {product && product.subCategory}</p>
                      </ProductDetails>
                    </ProductInfo>
                  </ProductContainer>
  
                  <ButtonContainer>
                    <GreenButton
                      component={Link} to={`/Seller/update-product/${productID}`}
                    > Edit Product
                    </GreenButton>
                  </ButtonContainer>
              </Box>
        )}
      </>
    );
  };
  
  export default ViewProduct;
  
  const ProductContainer = styled.div`
      display: flex;
      flex-direction: column;
      margin: 20px;
      justify-content: center;
      align-items: center;
      @media (min-width: 768px) {
          flex-direction: row;
      }
  `;
  
  const ProductImage = styled.img`
      max-width: 300px;
      /* width: 50%; */
      margin-bottom: 20px;
      margin-right: 40px;
  `;
  
  const EditImage = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 8px;
  `;
  
  const ProductInfo = styled.div`
      display: flex;
      flex-direction: column;
      margin-left: 40px;
  `;
  
  const ProductName = styled.h1`
      font-size: 24px;
  `;
  
  const PriceContainer = styled.div`
      display: flex;
      gap: 8px;
      margin-top: 8px;
  `;
  
  const PriceMrp = styled.p`
      margin-top: 8px;
      text-decoration: line-through;
      color: #525050;
  `;
  
  const PriceCost = styled.h3`
      margin-top: 8px;
  `;
  
  const PriceDiscount = styled.p`
      margin-top: 8px;
      color: darkgreen;
  `;
  
  const Description = styled.p`
      margin-top: 16px;
  `;
  
  const ProductDetails = styled.div`
      margin: 16px;
  `;
  
  const ButtonContainer = styled.div`
      margin: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
  `;
  
  const ReviewWritingContainer = styled.div`
      margin: 6rem;
      display: flex;
      gap: 2rem;
      justify-content: center;
      align-items: center;
      flex-direction:column;
  `;
  
  const ReviewContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  `;
  
  const ReviewCard = styled(Card)`
    && {
      background-color: white;
      margin-bottom: 2rem;
      padding: 1rem;
    }
  `;
  
  const ReviewCardDivision = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  `;
  
  const ReviewDetails = styled.div`
    flex: 1;
  `;
  
  