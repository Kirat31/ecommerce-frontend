import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../actions/userAction';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Typography, Container } from '@mui/material';
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
    <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingRight: '0px !important'}}>

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

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} component={Link} to={`/user-details/${user._id}`}>
                    {console.log("id: ", user._id)}
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Container>
        </>
      )}
    </Box>
    </Container>
  );
};

export default Users;
