import React, {useEffect, useState} from 'react'
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Box, Container, Button, Pagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory } from '../../actions/inventoryAction';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import { deleteInventory } from '../../actions/inventoryAction';
import { useAlert } from 'react-alert';

const GetInventory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, inventory,  error, totalPages } = useSelector((state) => state.getInventory);
  const { sellerInfo, isAuthenticated } = useSelector(state => state.seller);

  const [page, setPage] = useState(1);
  
  console.log("total pages", totalPages);
  console.log("sho", sellerInfo.seller._id);
  useEffect(() => {
    dispatch(fetchInventory(sellerInfo.seller._id, page));
    
    // Fetch inventory on component mount
  }, [dispatch, sellerInfo.seller._id, page]);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      dispatch(deleteInventory(id));
        // navigate('/Seller/inventory');
        alert.success(" inventory is deleted");
        dispatch(fetchInventory());
    }
  };
  if (error) return <div>Error: {error}</div>;
 
  return (
    <Container sx={{
      background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
      padding: '10px 0',
      textAlign: 'center',
      // marginTop: '40px'
  }}>{
      loading? 
      <Loader />:(
        <Container sx={{ textAlign: 'center', paddingTop: '20px', paddingRight: '0px !important' }}>
          <MetaData title="INVENTORY--ECOMMERCE" />
          <Box>
          <Typography variant="h4" sx={{ marginTop: '20px' }} gutterBottom>
            Inventory List
          </Typography>

          <Button component={Link} to="/Seller/add-inventory" variant="contained" sx={{ backgroundColor: "#856084" }}>
              Add Inventory
            </Button>
            </Box>
          <Box>
           
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Category</TableCell>
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    {/* <TableCell align="center">Location</TableCell> */}
                    {/* <TableCell align="center">Cost Price</TableCell> */}
                    <TableCell align="center">Price</TableCell>
                    {/* <TableCell align="center">Minimum Stock</TableCell>
                    <TableCell align="center">Current Stock</TableCell> */}
                    <TableCell align="center">Last Updated</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item._id} sx={{ textDecoration: 'none' }}>
                      <TableCell>{item.product.category}</TableCell>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      {/* <TableCell align="center">{item.location}</TableCell> */}
                      {/* <TableCell align="center">{item.product.costPrice}</TableCell> */}
                      <TableCell align="center">{item.product.price}</TableCell>
                      {/* <TableCell align="center">{item.minimumStock}</TableCell>
                      <TableCell align="center">{item.currentStock}</TableCell> */}
                      <TableCell align="center">{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell align="center">
                        <Button component={Link} to={`/Seller/update-inventory/${item._id}`} variant="outlined" color="primary" sx={{ marginRight: '5px' }}>
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