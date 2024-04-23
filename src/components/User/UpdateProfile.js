import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Container, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearErrors } from '../../actions/userAction';
import { useFormik } from 'formik';
import { updateProfileSchema } from '../../schemas';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import FaceIcon from '@mui/icons-material/Face';

function UpdateProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.user);
  const { error, loading, success } = useSelector(state => state.profile);
  console.log("USEr", user);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues:{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: {
          street: user.address ? user.address.street : '',
          city: user.address ? user.address.city : '',
          state: user.address ? user.address.state : '',
          postalCode: user.address ? user.address.postalCode : '',
          country: user.address ? user.address.country : '',
        },
        phoneNumber: user.phoneNumber || '',
        dateOfBirth: user.dateOfBirth ? formatDate(user.dateOfBirth) : '',
        gender: user.gender || '',
        avatar: null
      },
      
      validationSchema: updateProfileSchema,
      onSubmit: (values) => {
        console.log('hi');
        // Handle form submission
        const userData = { ...values };
        // if (!userData.avatar) {
        //   userData.avatar = {  url: '' }; // Assuming the default value is an empty object
        // }
        console.log("user data",userData);
        dispatch(updateProfile(userData));

        alert.success("Profile Updated Successfully. ");
        navigate("/account");
          if(error){
              {alert.error('value not updated');}
          }
      },
  });

  const updateForm=()=>{
    console.log(values);
  }

  return (
    
    <Container sx={{
      background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
      padding: '10px 0',
      textAlign: 'center',
      // marginTop: '40px'
    }}>
      
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '70px', marginTop: '70px'}}>
            <Typography variant="h5" align="center" gutterBottom>
              Update Profile
            </Typography>
            <MetaData title="Update Profile --ECOMMERCE" />

            <form onSubmit={handleSubmit}>
            {/* {console.log("USer", initialValues)} */}
              <TextField
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.firstName && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.firstName}</Typography>}

              {/* Add blocks for other fields */}
              <TextField
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.lastName && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.lastName}</Typography>}

              <TextField
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.email && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.email}</Typography>}

              <TextField
                type="text"
                name="address.street"
                value={values.address.street}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Street"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.address && errors.address.street && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.address.street}</Typography>}
              {/* Add similar blocks for city, state, postalCode, and country fields */}
              <TextField
                type="text"
                name="address.city"
                value={values.address.city}
                onChange={handleChange}
                onBlur={handleBlur}
                label="City"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {/* Add similar blocks for state, postalCode, and country fields */}
              <TextField
                type="text"
                name="address.state"
                value={values.address.state}
                onChange={handleChange}
                onBlur={handleBlur}
                label="State"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {/* Add similar blocks for postalCode and country fields */}
              <TextField
                type="text"
                name="address.postalCode"
                value={values.address.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Postal Code"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {/* Add similar blocks for country fields */}
              <TextField
                type="text"
                name="address.country"
                value={values.address.country}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Country"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                type="text"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Phone Number"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.phoneNumber && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.phoneNumber}</Typography>}

              <TextField
                type="date"
                name="dateOfBirth"
                value={values.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Date of Birth"
                variant="outlined"
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.dateOfBirth && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.dateOfBirth}</Typography>}

              <TextField
                select
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Gender"
                variant="outlined"
                margin="normal"
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </TextField>
              {errors.gender && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.gender}</Typography>}
 
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} 
              // onClick={updateForm}
              >
                Update Profile
              </Button>
            </form>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default UpdateProfile;
