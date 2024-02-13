// AddProductForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

function AddProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: null,
    // Add more fields as needed
  });

  const handleChange = (e) => {
    if(e.target.name === 'image'){
        setProductData({ ...productData, [e.target.name]: e.target.files[0] });
    }else{
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('stock', productData.stock);
        formData.append('category', productData.category);
        formData.append('image', productData.image);
      // Make a POST request to the backend API to add the product
      await axios.post('/api/product', formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
      // Optionally, you can display a success message or redirect the user
      console.log('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={productData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={productData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="price"
          label="Price"
          value={productData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
            name="stock"
            label="Stock"
            value={productData.stock}
            onChange={handleChange}
            fullWidth
            margin="normal"
        />
        
        <TextField
            name="category"
            label="Category"
            value={productData.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
        />
        
        <TextField
          type="file"
          name="image"
          label="Image"
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            accept: 'image/*' // accept only image files
          }}
        />
        
        {/* Add more fields for other product details */}
        <Box sx={{ marginTop: '1rem' }}>
        <Button type="submit" variant="contained" color="primary" >
          Add Product
        </Button>
        </Box>
      </form>
    </Container>
  );
}

export default AddProductForm;
