import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Container, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordAdmin, clearAdminErrors } from '../../actions/adminAction';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import { useAlert } from 'react-alert';
// import { UPDATE_PASSWORD_RESET } from '../../constants/sellerConstants';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const UpdatePasswordAdmin = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
    //console.log(token);
  const { error, success, loading } = useSelector((state) => state.updatePasswordAdmin);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(8).matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
      ).required("Please enter the new password") ,
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      dispatch(updatePasswordAdmin(values.oldPassword, values.newPassword, values.confirmPassword));
        alert.success('Password Updated Successfully');

      navigate('/admin-account');

      
    },
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearAdminErrors());
    }

    // if (success) {
    //   alert.success('Password Updated Successfully');

    //   navigate('/account');

    //   dispatch({
    //     type: UPDATE_PASSWORD_RESET,
    //   });
    // }
  }, [dispatch, error, alert, navigate, success]);


  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <MetaData title="Change Password" />
          <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '70px', marginTop: '70px' }}>
            <Typography variant="h5" align="center" gutterBottom>
              Update Password
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                <TextField
                    type="password"
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Old Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    InputProps={{
                        startAdornment: <VpnKeyIcon sx={{ mr: 1 }} />,
                    }}
                />
               </div>
                {formik.errors.oldPassword && formik.touched.oldPassword && (
                  <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>
                    {formik.errors.oldPassword}
                  </Typography>
                )}
             

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
              <TextField
                    type="password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="New Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    InputProps={{
                        startAdornment: <LockIcon sx={{ mr: 1 }} />,
                    }}
                />
                </div>
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>
                    {formik.errors.newPassword}
                  </Typography>
                )}
              

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
              <TextField
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    InputProps={{
                        startAdornment: <LockOpenIcon sx={{ mr: 1 }} />,
                    }}
                />
                </div>
                {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                  <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>
                    {formik.errors.confirmPassword}
                  </Typography>
                )}
              
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Update Password
              </Button>
            </form>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default UpdatePasswordAdmin