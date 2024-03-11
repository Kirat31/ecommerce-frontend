import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Snackbar, Container, Box, Typography } from '@mui/material';
import { updateInventory } from '../../actions/inventoryAction';
import Loader from '../Layouts/Loader';
import { useAlert } from 'react-alert';
import { updateInventorySchema } from '../../schemas';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

const UpdateInventoryForm = () => {
    const { inventoryId } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  //const [formData, setFormData] = useState({});
  const { loading, success, error } = useSelector((state) => state.updateInventory);
  const { inventory} = useSelector((state) => state.inventoryDetails);

  const formik = useFormik({
    initialValues: {
      productCategory: inventory.productCategory||'',
      quantity: inventory.quantity || 0,
      location: inventory.location || '',
      costPrice: inventory.costPrice || '',
      sellingPrice: inventory.sellingPrice || '',
      minStock: inventory.minStock || '',
      currentStock: inventory.currentStock || '',
      reorderQuantity: inventory.reorderQuantity || ''
      // Add initial values for other fields as needed
    },
    validationSchema: updateInventorySchema,
    onSubmit: (values) => {
      dispatch(updateInventory(inventoryId, values)).then((response) => {
        if (success) {
          alert.success('Inventory updated successfully');
        } 
        else {
          alert.error(response.message || 'Failed to update inventory');
        }
      });
    },
  });

  return (
    <Container>
        {loading?
        <Loader />:(
            <Box
                sx={{
                  maxWidth: 600,
                  margin: 'auto',
                  padding: 2,
                  border: '1px solid #ccc',
                  borderRadius: 4,
                }}
              >
                <Typography variant="h5" align="center" gutterBottom>Update Inventory</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="productCategory"
          label="Product Category"
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.productCategory && Boolean(formik.errors.productCategory)}
          helperText={formik.touched.productCategory && formik.errors.productCategory}
          margin="normal"
        />
        <TextField
          name="quantity"
          label="Quantity"
          type="number"
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
          margin="normal"
        />
        <TextField
          name="location"
          label="Location"
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
          margin="normal"
        />
        <TextField
          name="costPrice"
          label="Cost Price"
          type="number"
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.costPrice && Boolean(formik.errors.costPrice)}
          helperText={formik.touched.costPrice && formik.errors.costPrice}
          margin="normal"
        />
        <TextField
          name="sellingPrice"
          label="Selling Price"
          type="number"
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
          helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
          margin="normal"
        />
        <TextField
          name="minStock"
          label="Minimum Stock"
          type="number"
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.minStock && Boolean(formik.errors.minStock)}
          helperText={formik.touched.minStock && formik.errors.minStock}
          margin="normal"
        />
        <TextField
          name="currentStock"
          label="Current Stock"
          type="number"
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.currentStock && Boolean(formik.errors.currentStock)}
          helperText={formik.touched.currentStock && formik.errors.currentStock}
            margin="normal"
        />
        <TextField
          name="reorderQuantity"
          label="Reorder Quantity"
          type="number"
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.reorderQuantity && Boolean(formik.errors.reorderQuantity)}
          helperText={formik.touched.reorderQuantity && formik.errors.reorderQuantity}
            margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Update Inventory
        </Button>
      </form>
      </Box>
      )}
    </Container>
  );
};

export default UpdateInventoryForm;
