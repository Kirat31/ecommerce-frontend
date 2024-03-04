import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Select, MenuItem, Typography, Box, TextField, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createProduct, clearErrors } from '../../actions/productAction';
import { useAlert } from 'react-alert';

const categories = [
  "Laptops",
  "Electronics",
  "Watches",
  "Computers",
  "Mobile Phones",
  "Accessories"
];

const CreateProductForm = () => {
  const initialValues = {
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    category: Yup.string().required('Category is required'),
    stock: Yup.number().required('Stock is required').integer('Stock must be an integer').positive('Stock must be positive'),
  });

  const dispatch = useDispatch();
  const alert = useAlert();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createProduct(values));
        alert.success('Product created successfully!');
        resetForm(); // Reset form fields after successful submission
      } catch (error) {
        console.error('Error creating product:', error);
        alert.error('Failed to create product.');
      }
    },
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
        Create New Product
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
          select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
          fullWidth
          margin="normal"
        >
          <MenuItem value="" disabled>Select Category</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </TextField>
        
        <TextField
          label="Stock"
          name="stock"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
          type="number"
          inputProps={{ min: '1' }}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
          onBlur={formik.handleBlur}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Product
        </Button>
      </form>
    </Box>
  );
};

export default CreateProductForm;
