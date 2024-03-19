import React, {useEffect, useState} from 'react'
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Box, Container, Button, Pagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory } from '../../actions/inventoryAction';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import { deleteInventory } from '../../actions/inventoryAction'

const GetInventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, inventory, inventoryCount, resultPerPage, error, totalPages } = useSelector((state) => state.getInventory);
  const [page, setPage] = useState(1);
  
  console.log("total pages", totalPages);
  useEffect(() => {
    dispatch(fetchInventory(page));
    
    // Fetch inventory on component mount
  }, [dispatch, page]);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      dispatch(deleteInventory(id));
        navigate('/inventory');
        alert.success("Following inventory is deleted");
    }
  };
  if (error) return <div>Error: {error}</div>;
 
  return (
    <Container sx={{
      background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
      padding: '10px 0',
      textAlign: 'center',
      marginTop: '40px'
  }}>{
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
                      <TableCell align="center">{item.minimumStock}</TableCell>
                      <TableCell align="center">{item.currentStock}</TableCell>
                      <TableCell align="center">{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell align="center">
                        <Button component={Link} to={`/update-inventory/${item._id}`} variant="outlined" color="primary" sx={{ marginRight: '5px' }}>
                          Update
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(item._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            style={{ marginTop: '20px' }} 
          />
        </Container>
    )
  }
    </Container>
  )
}

export default GetInventory