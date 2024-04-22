import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersForSeller } from '../../actions/orderAction';
import { Link, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const OrdersComponent = () => {
  const { id } = useParams(); 
  console.log("sellerId", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForSeller(id));
  }, [dispatch, id]);

  const { loading, orders, error } = useSelector((state) => state.getAllOrders);

  console.log("orders",orders);

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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>{order.orderItems.map((item) => item.name).join(', ')}</TableCell>
                    <TableCell>{order.orderItems.reduce((total, item) => total + item.quantity, 0)}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>
                      <Link to={`/order/${order._id}`}>View Details</Link>
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
