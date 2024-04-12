import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Box, MenuItem, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { useParams, useNavigate } from 'react-router-dom';

const categories = [
    "Men",
    "Electronics",
    "Women",
    "HomeFurniture",
    "Appliances",
    "More",
];

const UpdateProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
  
    // Retrieve product details from Redux store
    const { product } = useSelector(state => state.productDetails);
  
    // Define initial values based on product details
    const initialValues = {
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      subCategory: product.subCategory || '',
      images: product.images,
      quantity: product.quantity || 0
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    category: Yup.string().required('Category is required'),
    subCategory: Yup.string().required("Sub category is required"),
    quantity: Yup.number().required('Enter quantity to update inventory').positive('Quantity cannot be negative')
});

const onSubmit = (values, { setSubmitting }) => {
    dispatch(updateProduct(id, values))
      .then(() => {
        // Dispatch succeeded, show success message
        alert.success('Product updated successfully');
      })
      .catch((error) => {
        // Dispatch failed, show error message
        alert.error(error.response.data.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

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
      
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          type="number"
          inputProps={{ min: '0.01', step: '0.01' }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          name="category"
          select
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
          fullWidth
          margin="normal"
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
            label="SubCategory"
            name="subCategory"
            value={formik.values.subCategory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.subCategory && Boolean(formik.errors.subCategory)}
            helperText={formik.touched.subCategory && formik.errors.subCategory}
            fullWidth
            margin="normal"
        />

        <Divider />

        <Typography variant="h6" align="center" gutterBottom>
            Inventory
        </Typography>

        <TextField
          label="Quantity"
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
          type="number"
          inputProps={{ min: '1' }}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Product
        </Button>
      </form>
      <Button onClick={() => navigate(`/Seller/products/product/${id}`)} variant="contained" color="secondary" fullWidth style={{ marginTop: '1rem' }}>
        Back to Product Details
      </Button>
    </Box>
  );
};

export default UpdateProductForm;
