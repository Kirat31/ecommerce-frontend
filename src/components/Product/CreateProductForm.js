// components/CreateProductForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography, Box } from '@mui/material';
import { createProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';


const CreateProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const alert = useAlert();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct({ name, description, price, category, stock }))
      .then(() => {
        // Display success message
        alert.success('Product created successfully!');
        // Clear form fields
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setStock('');
      })
      .catch((error) => {
        // Handle any errors (if needed)
        console.error('Error creating product:', error);
        alert.error('Failed to create product.');
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
        Create New Product
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
          Create Product
        </Button>
      </form>
    </Box>
  );
};

export default CreateProductForm;
