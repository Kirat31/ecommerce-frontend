import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Container, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../actions/userAction';
import { useFormik } from 'formik';
import { updateProfileSchema } from '../../schemas';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const dispatch = useDispatch();
  const { user, loading, isUpdated, isAuthenticated, error } = useSelector(state => state.user);
  const [avatarPreview, setAvatarPreview] = useState('');
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
  }
    if (isUpdated) {
      dispatch({ type: 'UPDATE_PROFILE_RESET' });
    }
  }, [dispatch, isUpdated, isAuthenticated]);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      // Handle form submission
      const userData = { ...values, avatar };
      dispatch(updateProfile(userData));
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '70px', marginTop: '70px'}}>
          <Typography variant="h5" align="center" gutterBottom>
            Update Profile
          </Typography>

          <form onSubmit={handleSubmit}>
            <MetaData title="Update Profile --ECOMMERCE" />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
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
            </div>
            {errors.firstName && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.firstName}</Typography>}

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
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
            </div>
            {errors.lastName && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.lastName}</Typography>}

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
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
            </div>
            {errors.email && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.email}</Typography>}

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
              <Input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                inputProps={{ 'aria-label': 'avatar' }}
              />
              <label htmlFor="avatar">
                <Button variant="contained" component="span">
                  Upload Avatar
                </Button>
              </label>
              {avatarPreview && (
                <img src={avatarPreview} alt="Avatar Preview" style={{ maxWidth: '100px', marginLeft: '10px' }} />
              )}
            </div>

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Update Profile
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default UpdateProfile;
