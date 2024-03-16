import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../actions/userAction';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Typography, Container, TableContainer, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../Layouts/Loader'

const Users = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, totalUsers } = userList;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Container sx={{
      background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
      padding: '10px 0',
      textAlign: 'center',
      marginTop: '40px'
  }}>

    <Box p={2}> {/* Add padding to the Box component */}
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      {loading ? (
        <Loader/>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            Total Users: {totalUsers}
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
                <TableCell align="center">Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} component={Link} to={`/user-details/${user._id}`} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                    {console.log("id: ", user._id)}
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phoneNumber}</TableCell>
                  <TableCell align="center">{user.gender}</TableCell>
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

export default Users;
