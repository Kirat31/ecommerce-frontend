import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../actions/orderAction';
import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, totalOrdersCount, loading, error } = useSelector((state) => state.orderList);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Orders
      </Typography>
      <Typography variant="body" gutterBottom>
        Total Orders Count: {totalOrdersCount}
      </Typography>
      <Divider />
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : error ? (
        <Typography variant="body1">Error: {error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Seller</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {orders.map((order) => ( 
              <TableRow key={order._id}>
                {console.log("in order", order)}
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>{order.product.sellerId}</TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>{order.product.quantity}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  {order.status}
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Orders;
