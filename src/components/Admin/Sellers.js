import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSellers } from '../../actions/sellerAction';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Typography, Container, TableContainer, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../Layouts/Loader'

const Sellers = () => {
  const dispatch = useDispatch();

  const sellerList = useSelector((state) => state.sellerList);
  const { loading, error, sellers, totalSellers } = sellerList;

  useEffect(() => {
    dispatch(getSellers());
  }, [dispatch]);

  return (
    <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingRight: '0px !important'}}>

    <Box p={2}> {/* Add padding to the Box component */}
      <Typography variant="h4" gutterBottom>
        Seller List
      </Typography>
      {loading ? (
        <Loader/>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            Total Sellers: {totalSellers}
          </Typography>
          <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingRight: '0px !important'}}>
          <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Company Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellers.map((user) => (
                <TableRow key={user._id} component={Link} to={`/user-details/${user._id}`} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                    {console.log("id: ", user._id)}
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phoneNumber}</TableCell>
                  <TableCell align="center">{user.companyName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
          </Container>
        </>
      )}
    </Box>
    </Container>
  );
};

export default Sellers;
