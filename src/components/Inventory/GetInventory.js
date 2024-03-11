import React, {useEffect} from 'react'
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Box, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory } from '../../actions/inventoryAction';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';

const GetInventory = () => {
  const dispatch = useDispatch();
  const { loading, inventory, error } = useSelector((state) => state.getInventory);

  useEffect(() => {
    dispatch(fetchInventory({ page: 1 })); // Fetch inventory on component mount
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;

  return (
    <Container>{
      loading? 
      <Loader />:(
        <Container sx={{ textAlign: 'center', paddingTop: '20px', paddingRight: '0px !important' }}>
          <MetaData title="INVENTORY--ECOMMERCE" />

          <Typography variant="h4" sx={{ marginTop: '20px' }} gutterBottom>
            Inventory List
          </Typography>

          <Box>
            <Button component={Link} to="/add-inventory" variant="contained" color="primary">
              Add Inventory
            </Button>
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Category</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Cost Price</TableCell>
                    <TableCell align="center">Selling Price</TableCell>
                    <TableCell align="center">Minimum Stock</TableCell>
                    <TableCell align="center">Current Stock</TableCell>
                    <TableCell align="center">Last Updated</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item._id} component={Link} to={`/inventory-details/${item._id}`} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                      <TableCell>{item.productCategory}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{item.location}</TableCell>
                      <TableCell align="center">{item.costPrice}</TableCell>
                      <TableCell align="center">{item.sellingPrice}</TableCell>
                      <TableCell align="center">{item.minStock}</TableCell>
                      <TableCell align="center">{item.currentStock}</TableCell>
                      <TableCell align="center">{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell align="center">
                        <Button component={Link} to={`/update-inventory/${item._id}`} variant="outlined" color="primary" sx={{ marginRight: '5px' }}>
                          Update
                        </Button>
                        <Button variant="outlined" color="error">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
    )
  }
    </Container>
  )
}

export default GetInventory