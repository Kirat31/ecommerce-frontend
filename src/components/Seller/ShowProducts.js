import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BasicButton, BrownButton, DarkRedButton, IndigoButton } from '../../utils/buttonStyles.js';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getAllProductsBySeller } from '../../actions/productAction.js';
import SpeedDialTemplate from '../../components/SpeedDialTemplate.js';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from '@mui/icons-material/Upload';
import AlertDialogSlide from '../AlertDialogSlide.js';

const ShowProducts = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.productsBySeller);
  const { sellerInfo, isAuthenticated, sellerProductData, responseSellerProducts } = useSelector(state => state.seller);
  console.log("pro", products);
  const sellerID = sellerInfo._id

  const [dialog, setDialog] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllProductsBySeller(sellerInfo._id));
  }, [dispatch, sellerInfo._id])

  const deleteHandler = (id) => {
    
    dispatch(deleteProduct(id))
      .then(() => {
        dispatch(getAllProductsBySeller(sellerInfo._id));
      })
  }

//   const deleteAllProducts = () => {
//     deleteHandler(sellerID, "DeleteProducts")
//   }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Product',
      action: () => navigate("/Seller/addproduct")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Products',
      action: () => {
        setDialog("Do you want to delete all products ?")
        setShowDialog(true)
      }
    },
  ];

//   const shopcartActions = [
//     {
//       icon: <AddCardIcon color="primary" />, name: 'Add New Product',
//       action: () => navigate("/Seller/addproduct")
//     },
//     {
//       icon: <UploadIcon color="success" />, name: 'Upload New Product',
//       action: () => navigate("/Seller/uploadproducts")
//     },
//     {
//       icon: <DeleteIcon color="error" />, name: 'Delete All Products',
//       action: () => {
//         setDialog("Do you want to delete all products ?")
//         setShowDialog(true)
//       }
//     },
//   ];

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
         
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <IndigoButton onClick={() => navigate("/Seller/addproduct")}>
                  Add Product
                </IndigoButton>
                <br /><br />
                {/* {
                  currentRole === "Shopcart" &&
                  <BrownButton onClick={() => navigate("/Seller/uploadproducts")}>
                    Upload Product
                  </BrownButton>
                } */}
              </Box>
              <>
                {Array.isArray(products) && products.length > 0 &&
                  <ProductGrid container spacing={3}>
                    {products.map((data, index) => (
                      <Grid item xs={12} sm={6} md={4}
                        key={index}
                      >
                        {console.log("data", data)}
                        <ProductContainer>
                          <ProductImage src={data.images[0].url} />
                          <ProductName>{data.name}</ProductName>
                          <PriceCost>₹{data.price}</PriceCost>
                          {/* <PriceCost>₹{data.price.cost}</PriceCost> */}
                          {/* <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount> */}
                          <ButtonContainer>
                            <DarkRedButton
                              onClick={() => deleteHandler(data._id, "DeleteProduct")}
                            >
                              Delete
                            </DarkRedButton>
                            <BasicButton
                              onClick={() => navigate(`/Seller/products/product/${data._id}`)}
                            >
                              View
                            </BasicButton>
                          </ButtonContainer>
                        </ProductContainer>
                      </Grid>
                    ))}
                  </ProductGrid>
                }
                <SpeedDialTemplate actions={actions} />
                {/* {
                  currentRole === "Shopcart"
                    ?
                    <SpeedDialTemplate actions={shopcartActions} />
                    :
                    
                } */}
              </>
          
        </>
      }
      {/* <AlertDialogSlide dialog={dialog} showDialog={showDialog} setShowDialog={setShowDialog} taskHandler={deleteAllProducts} /> */}
    </>
  )
};

export default ShowProducts;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 8px;
`;

const ProductName = styled.p`
  font-weight: bold;
  text-align: center;
`;

const PriceMrp = styled.p`
  margin-top: 8px;
  text-align: center;
  text-decoration: line-through;
  color: #525050;
`;

const PriceCost = styled.h3`
  margin-top: 8px;
  text-align: center;
`;

const PriceDiscount = styled.p`
  margin-top: 8px;
  text-align: center;
  color: darkgreen;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
`;