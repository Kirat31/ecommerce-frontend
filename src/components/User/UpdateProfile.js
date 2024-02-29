import React, { useEffect, useState } from 'react';
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
  const { error, isUpdated, loading } = useSelector(state => state.profile);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(FaceIcon);
  
  const [avatar, setAvatar] = useState();

  
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

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      if (user.avatar && user.avatar.url) {
        setAvatarPreview(user.avatar.url);
    }
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      //dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);


  return (
    <Container>
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
              {avatarPreview && typeof avatarPreview === 'string' && (
                        <img src={avatarPreview} alt="Profile" style={{ maxWidth: '100px', marginLeft: '10px' }} />
                    )}
            </div>

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

export default UpdateProfile;
