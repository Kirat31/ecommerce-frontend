import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Box } from '@mui/material';
import { updateProduct, clearErrors } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  // Use destructuring with default values to prevent errors
  //const { name: initialName = '', description: initialDescription = '', price: initialPrice = '', category: initialCategory = '', stock: initialStock = '' } = initialProductData || {};
  const { product } = useSelector(state => state.productDetails);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
    // const productId = product.id;
    console.log(id);
  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedProductData = { name, description, price, category, stock };
    dispatch(updateProduct(id, updatedProductData))
      .then(() => {
        // Dispatch succeeded, show success message
        alert.success('Product updated successfully');
        // navigate(`/product/${id}`)
      })
      .catch((error) => {
        // Dispatch failed, show error message
        alert.error(error.response.data.message);
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Update Product
      </Typography>
      
      <form onSubmit={submitHandler}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          inputProps={{ min: '0.01', step: '0.01' }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          inputProps={{ min: '1' }}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Product
        </Button>
      </form>
      <Button onClick={() => navigate(`/product/${id}`)} variant="contained" color="secondary" fullWidth style={{ marginTop: '1rem' }}>
        Back to Product Details
      </Button>
    </Box>
  );
};

export default UpdateProductForm;
