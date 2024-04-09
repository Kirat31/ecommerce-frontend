import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import { createInventory} from '../../actions/inventoryAction';
import { useAlert } from 'react-alert';
import Loader from '../Layouts/Loader';
import { addInventorySchema } from '../../schemas/index';

const AddInventoryForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.inventory);
//console.log("inventory: ", inventory);
  
    const formik = useFormik({
    initialValues: {
      productCategory: '',
      quantity: 0,
      location: '',
      costPrice: 0,
      sellingPrice: 0,
      minimumStock: 0, // Add minStock field
      currentStock: 0, // Add currentStock field
      // lastUpdated,
      // reorderQuantity,


    },
    validationSchema: addInventorySchema,
    onSubmit: (values, { resetForm }) => {
        //dispatch(clearErrors());
      dispatch(createInventory(values));
      // if(success){
        console.log("Success");
        alert.success("Inventory dispatched successfully");
        resetForm();
      // }
      if(error){
        alert.error("Error dispatching the inventory");
      }
      
    },
  });

  return (
    <Container sx={{
      background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
      padding: '10px 0',
      textAlign: 'center',
      // marginTop: '40px'
  }}>
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
        
        <Typography variant="h5" align="center" gutterBottom>Add Inventory</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="productCategory"
          label="Product Category"
          value={formik.values.productCategory}
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
          value={formik.values.quantity}
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
          margin="normal"
        />
        <TextField
          name="location"
          label="Location"
          value={formik.values.location}
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
          value={formik.values.costPrice}
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
          value={formik.values.sellingPrice}
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
          helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
          margin="normal"
        />
        <TextField
            name="minimumStock"
            label="Minimum Stock"
            type="number"
            value={formik.values.minimumStock}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.minimumStock && Boolean(formik.errors.minimumStock)}
          helperText={formik.touched.minimumStock && formik.errors.minimumStock}
            margin="normal"
        />
        <TextField
            name="currentStock"
            label="Current Stock"
            type="number"
            value={formik.values.currentStock}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.currentStock && Boolean(formik.errors.currentStock)}
          helperText={formik.touched.currentStock && formik.errors.currentStock}
            margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
        {/* {error && <p>{error}</p>} */}
      </form>
      </Box>
       )
    }
    </Container>
  );
};

export default AddInventoryForm;
