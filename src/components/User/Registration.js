import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/userAction';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { registrationSchema } from '../../schemas';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.user);

  const onSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(registerUser(values));
      resetForm();
      alert.success('User registered successfully!');
      navigate('/loginsignup');
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: registrationSchema,
    onSubmit,
  });

  return (
    <Container>
      {loading?
      <Loader />:(
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '70px', marginTop: '70px'}}>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <MetaData title="Register --ECOMMERCE" />
              <TextField
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                margin="normal"
                fullWidth
                error={formik.touched.firstName && formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              {/* Add other input fields for lastName, email, and password */}
              <TextField
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                margin="normal"
                fullWidth
                error={formik.touched.lastName && formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                margin="normal"
                fullWidth
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                margin="normal"
                fullWidth
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth sx={{ mt: 2 }}>
                Register
              </Button>

              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {success && <p>User registered successfully!</p>}
            </form>
          </Paper>
        </Box>
      )}
    </Container>
    
  );
};

export default RegistrationForm;
