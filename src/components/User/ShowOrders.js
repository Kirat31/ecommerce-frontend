import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersForUser } from '../../actions/orderAction';
import { useParams } from 'react-router-dom';
import { Box, Typography, Divider, List, ListItem, ListItemText, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '16px',
  },
  paper: {
    padding: '16px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    maxWidth: '200px',
    maxHeight: '200px',
    marginRight: '16px',
  },
  details: {
    flexGrow: 1,
  },
}));

const OrdersComponent = () => {
  const { id } = useParams(); 
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrdersForUser(id));
  }, [dispatch, id]);

  return (
    <ThemeProvider theme={theme}> 
      <Box className={classes.root}>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        <Divider />
        {orders.length === 0 ? (
          <Typography variant="body1">No orders found.</Typography>
        ) : (
          <List>
            {orders.map((order) => (
              <Paper key={order._id} className={classes.paper}>
                {console.log("order", order)}
                {console.log("in order",extractUrlFromString(order.product.images[0]))}

                <img
                  src={extractUrlFromString(order.product.images[0])}
                  alt="Product"
                  className={classes.image}
                  style={{ width: '250px', height: '250px' }}
                />
                <div className={classes.details}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {order.product.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Price: {order.product.price}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Order Placed: {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" gutterBottom>
                    Order Status: {order.status}
                  </Typography>
                </div>
              </Paper>
            ))}
          </List>
        )}
        {error && <Typography variant="body1">Error: {error}</Typography>}
      </Box>
    </ThemeProvider>
  );
};

const extractUrlFromString = (str) => {
  const matches = str.match(/url:\s*'([^']+)'/);
  return matches ? matches[1] : ''; // Extracted URL from the matched group
};

export default OrdersComponent;
