import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerSeller, verifySeller } from '../../actions/sellerAction';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { registrationSellerSchema } from '../../schemas';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import { useNavigate, useParams } from 'react-router-dom';

const RegistrationSeller = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {token} = useParams();
  const navigate = useNavigate();
  const { loading, success:registerSuccess, error } = useSelector((state) => state.sellerRegister);
  const { success: verifySuccess, error: verifyError } = useSelector((state) => state.sellerVerify);

  useEffect(()=>{
    if (token) {
      dispatch(verifySeller(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (verifySuccess) {
      alert.success('Email verified. Register yourself'); // Display alert when verification is successful
    }
  }, [verifySuccess, alert]);

  const onSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(registerSeller(values));

        alert.success('Seller registered successfully!');
        navigate('/seller-login');
        
        
        resetForm();
      if(error){
        alert.error('Something went wrong. Please try again');
      }
      
      
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
      companyName: '',
      companyRegistrationNumber: '',
      companyAddress: {
        street:'',
        city:'',
        state:'',
        postalCode:'',
        country: ''
      },
      sellerAddress: {  // Make sure sellerAddress is properly initialized
        street:'',
        city:'',
        state:'',
        postalCode:'',
        country: ''
      },
      phoneNumber: ''
    },
    validationSchema: registrationSellerSchema,
    onSubmit,
  });
  console.log("formik values:", formik.values);

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
                name="role"
                label="Role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                margin="normal"
                fullWidth
                error={formik.touched.role && formik.errors.role}
                helperText={formik.touched.role && formik.errors.role}
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
              <TextField
                name="companyName"
                label="Company Name"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
                margin="normal"
                fullWidth
                error={formik.touched.companyName && formik.errors.companyName}
                helperText={formik.touched.companyName && formik.errors.companyName}
              />
              <TextField
                type="number"
                name="companyRegistrationNumber"
                value={formik.values.companyRegistrationNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Company Registration Number"
                variant="outlined"
                margin="normal"
                fullWidth
                error={formik.touched.companyRegistrationNumber && formik.errors.companyRegistrationNumber}
                helperText={formik.touched.companyRegistrationNumber && formik.errors.companyRegistrationNumber}
              />
              <TextField
                type="text"
                name="companyAddress.street"
                value={formik.values.companyAddress.street }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Warehouse Street"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.street &&
                    formik.errors.companyAddress?.street
                }
                helperText={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.street &&
                    formik.errors.companyAddress?.street
                }
              />
              <TextField
                type="text"
                name="companyAddress.city"
                value={formik.values.companyAddress.city }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Warehouse City"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.city &&
                    formik.errors.companyAddress?.city
                }
                helperText={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.city &&
                    formik.errors.companyAddress?.city
                }
              />

              <TextField
                type="text"
                name="companyAddress.state"
                value={formik.values.companyAddress.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Warehouse State"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.state &&
                    formik.errors.companyAddress?.state
                  }
                  helperText={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.state &&
                    formik.errors.companyAddress?.state
                  }
              />

              <TextField
                type="text"
                name="companyAddress.postalCode"
                value={formik.values.companyAddress.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Warehouse Postal Code"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.postalCode &&
                    formik.errors.companyAddress?.postalCode
                }
                helperText={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.postalCode &&
                    formik.errors.companyAddress?.postalCode
                }
              />

              <TextField
                type="text"
                name="companyAddress.country"
                value={formik.values.companyAddress.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Warehouse Country"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.country &&
                    formik.errors.companyAddress?.country
                }
                helperText={
                    formik.touched.companyAddress &&
                    formik.touched.companyAddress.country &&
                    formik.errors.companyAddress?.country
                }
              />

              <TextField
                type="text"
                name="sellerAddress.street"
                value={formik.values.sellerAddress.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Office Street"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.street &&
                    formik.errors.sellerAddress?.street
                }
                helperText={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.street &&
                    formik.errors.sellerAddress?.street
                }

              />
              <TextField
                type="text"
                name="sellerAddress.city"
                value={formik.values.sellerAddress.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Office City"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.city &&
                    formik.errors.sellerAddress?.city
                  }
                helperText={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.city &&
                    formik.errors.sellerAddress?.city
                }
              />

              <TextField
                type="text"
                name="sellerAddress.state"
                value={formik.values.sellerAddress.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Office State"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.state &&
                    formik.errors.sellerAddress?.state
                }
                helperText={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.state &&
                    formik.errors.sellerAddress?.state
                }
              />

              <TextField
                type="text"
                name="sellerAddress.postalCode"
                value={formik.values.sellerAddress.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Office Postal Code"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.postalCode &&
                    formik.errors.sellerAddress?.postalCode
                }
                helperText={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.postalCode &&
                    formik.errors.sellerAddress?.postalCode
                }
              />

              <TextField
                type="text"
                name="sellerAddress.country"
                value={formik.values.sellerAddress.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Office Country"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.country &&
                    formik.errors.sellerAddress?.country
                }
                helperText={
                    formik.touched.sellerAddress &&
                    formik.touched.sellerAddress.country &&
                    formik.errors.sellerAddress?.country
                }
              />

              <TextField
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Phone Number"
                variant="outlined"
                margin="normal"
                fullWidth
                error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />


              <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth sx={{ mt: 2 }}>
                Register
              </Button>

            </form>
          </Paper>
        </Box>
      )}
    </Container>
    
  );
};

export default RegistrationSeller;
