import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInventoryDetails } from '../../actions/inventoryAction';
import { useParams } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import { Typography, Box, Container, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: 40,
      marginBottom: 40,
      padding: 20,
    },
    title: {
      marginBottom: 20,
    },
    details: {
      marginTop: 20,
    },
  }));
  
const InventoryDetails = () => {
    const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, inventory, error } = useSelector((state) => state.inventoryDetails);

  useEffect(() => {
    dispatch(getInventoryDetails(id));
  }, [dispatch, id]);

  return (
    <Container maxWidth="sm" sx={{
      background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
      padding: '10px 0',
      textAlign: 'center',
      marginTop: '40px'
  }}>
        <Paper className={classes.container}>
      {loading ? (
        <Loader />      
        ) : (
            <Box mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Inventory Details
            </Typography>
            <Typography variant="h6">Product Category: {inventory.productCategory}</Typography>
            <Typography variant="body1">Quantity: {inventory.quantity}</Typography>
            <Typography variant="body1">Location: {inventory.location}</Typography>
            <Typography variant="body1">Cost Price: {inventory.costPrice}</Typography>
            <Typography variant="body1">Selling Price: {inventory.sellingPrice}</Typography>
            <Typography variant="body1">Minimum Stock: {inventory.minimumStock}</Typography>
            <Typography variant="body1">Current Stock: {inventory.currentStock}</Typography>
            <Typography variant="body1">
              Last Updated: {new Date(inventory.lastUpdated).toLocaleDateString()}
            </Typography>
          </Box>
        )}
        </Paper>
    </Container>
  );
};

export default InventoryDetails;
