import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Container, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSeller, clearSellerErrors } from '../../actions/sellerAction';
import { useFormik } from 'formik';
import { updateSellerProfileSchema } from '../../schemas';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import { useAlert } from 'react-alert';
import { UPDATE_SELLER_RESET } from '../../constants/sellerConstants';
import FaceIcon from '@mui/icons-material/Face';

function UpdateProfileSeller() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { sellerInfo } = useSelector(state => state.seller);
  const { error, loading, success } = useSelector(state => state.updateSeller);
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };
  
  
  const [avatarPreview, setAvatarPreview] = useState(FaceIcon);
  const [avatar, setAvatar] = useState();

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    
    initialValues: {
      firstName: sellerInfo.user.firstName,
      lastName: sellerInfo.user.lastName,
      email: sellerInfo.user.email,
      companyName: sellerInfo.user.companyName,
      companyRegistrationNumber: sellerInfo.user.companyRegistrationNumber,
      companyAddress: {
        street: sellerInfo.user.companyAddress ? sellerInfo.user.companyAddress.street : '',
        city: sellerInfo.user.companyAddress ? sellerInfo.user.companyAddress.city : '',
        state: sellerInfo.user.companyAddress ? sellerInfo.user.companyAddress.state : '',
        postalCode: sellerInfo.user.companyAddress ? sellerInfo.user.companyAddress.postalCode : '',
        country: sellerInfo.user.companyAddress ? sellerInfo.user.companyAddress.country : '',
      },
      sellerAddress: {
        street: sellerInfo.user.sellerAddress ? sellerInfo.user.sellerAddress.street : '',
        city: sellerInfo.user.sellerAddress ? sellerInfo.user.sellerAddress.city : '',
        state: sellerInfo.user.sellerAddress ? sellerInfo.user.sellerAddress.state : '',
        postalCode: sellerInfo.user.sellerAddress ? sellerInfo.user.sellerAddress.postalCode : '',
        country: sellerInfo.user.sellerAddress ? sellerInfo.user.sellerAddress.country : '',
      },
      phoneNumber: sellerInfo.user.phoneNumber || '',
    },
    validationSchema: updateSellerProfileSchema,
    onSubmit: (values) => {
      // Handle form submission
      const userData = { ...values };
      dispatch(updateSeller(userData));
      alert.success("Profile Updated Successfully. Login again to see the changes.");
      navigate("/Seller/profile");
        if(error){
            {alert.error('value not updated');}
        }
    },
  });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAvatar(file);
//       setAvatarPreview(URL.createObjectURL(file));
//     }
//   };

//   useEffect(() => {
//     // if (error) {
//     //   alert.error(error);
//     //   dispatch(clearSellerErrors());
//     // }

//     if (success) {
//       alert.success("Profile Updated Successfully");
//       navigate("/seller-account");
//       dispatch({
//         type: UPDATE_SELLER_RESET,
//       });
//     }
//   }, [dispatch, error, alert, navigate, success]);

  return (
    <Container sx={{
      background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)', // Lightest shades of the original gradient
      padding: '10px 0',
      textAlign: 'center',
      marginTop: '40px'
  }}>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '70px', marginTop: '70px'}}>
            <Typography variant="h5" align="center" gutterBottom>
              Update Profile
            </Typography>

            <form onSubmit={handleSubmit}>
              <MetaData title="Update Profile --ECOMMERCE" />
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
                type="companyName"
                name="companyName"
                value={values.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Company Name"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.companyName && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.companyName}</Typography>}

              <TextField
                type="companyRegistrationNumber"
                name="companyRegistrationNumber"
                value={values.companyRegistrationNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Company Registration Number"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.companyRegistrationNumber && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.companyRegistrationNumber}</Typography>}

              <TextField
                type="text"
                name="companyAddress.street"
                value={values.companyAddress.street}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Company Street"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.companyAddress && errors.companyAddress.street && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.companyAddress.street}</Typography>}
              {/* Add similar blocks for city, state, postalCode, and country fields */}
              <TextField
                type="text"
                name="companyAddress.city"
                value={values.companyAddress.city}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Company City"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.companyAddress && errors.companyAddress.city && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.companyAddress.city}</Typography>}
              {/* Add similar blocks for state, postalCode, and country fields */}
              <TextField
                type="text"
                name="companyAddress.state"
                value={values.companyAddress.state}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Company State"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.companyAddress && errors.companyAddress.state && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.companyAddress.state}</Typography>}
              {/* Add similar blocks for postalCode and country fields */}
              <TextField
                type="text"
                name="companyAddress.postalCode"
                value={values.companyAddress.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Company Postal Code"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.companyAddress && errors.companyAddress.postalCode && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.companyAddress.postalCode}</Typography>}
              {/* Add similar blocks for country fields */}
              <TextField
                type="text"
                name="companyAddress.country"
                value={values.companyAddress.country}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Company Country"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.companyAddress && errors.companyAddress.country && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.companyAddress.country}</Typography>}

              <TextField
                type="text"
                name="sellerAddress.street"
                value={values.sellerAddress.street}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Office Street"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.sellerAddress && errors.sellerAddress.street && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.sellerAddress.street}</Typography>}
              {/* Add similar blocks for city, state, postalCode, and country fields */}
              <TextField
                type="text"
                name="sellerAddress.city"
                value={values.sellerAddress.city}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Office City"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.sellerAddress && errors.sellerAddress.city && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.sellerAddress.city}</Typography>}
              {/* Add similar blocks for state, postalCode, and country fields */}
              <TextField
                type="text"
                name="sellerAddress.state"
                value={values.sellerAddress.state}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Office State"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.sellerAddress && errors.sellerAddress.state && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.sellerAddress.state}</Typography>}
              {/* Add similar blocks for postalCode and country fields */}
              <TextField
                type="text"
                name="sellerAddress.postalCode"
                value={values.sellerAddress.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Office Postal Code"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.sellerAddress && errors.sellerAddress.postalCode && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.sellerAddress.postalCode}</Typography>}
              {/* Add similar blocks for country fields */}
              <TextField
                type="text"
                name="sellerAddress.country"
                value={values.sellerAddress.country}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Office Country"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {errors.sellerAddress && errors.sellerAddress.country && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.sellerAddress.country}</Typography>}
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

              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Update Profile
              </Button>
            </form>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default UpdateProfileSeller;
