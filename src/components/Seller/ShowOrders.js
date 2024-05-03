import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersForSeller, updateOrderStatus } from '../../actions/orderAction';
import { Link, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, MenuItem, Select, FormControl } from '@mui/material';

const OrdersComponent = () => {
  const { id } = useParams(); 
  console.log("sellerId", id);
  const dispatch = useDispatch();
  const [selectedStatusMap, setSelectedStatusMap] = useState({});

  useEffect(() => {
    dispatch(getAllOrdersForSeller(id));
  }, [dispatch, id]);

  const { loading, orders, error } = useSelector((state) => state.getAllOrders);

  console.log("orders",orders);

  const handleStatusChange = (orderId, newStatus) => {
    // Update the selected status map
    setSelectedStatusMap(prevState => ({
      ...prevState,
      [orderId]: newStatus,
    }));
    // Dispatch action to update order status
    dispatch(updateOrderStatus(orderId, newStatus));
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <Typography variant="h2" gutterBottom>All Orders</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>{order.product.name}</TableCell>
                    <TableCell>{order.product.quantity}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                    <TableCell>
                      <FormControl>
                        <Select
                          value={selectedStatusMap[order._id] || order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="processing">Processing</MenuItem>
                          <MenuItem value="delivered">Delivered</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default OrdersComponent;
