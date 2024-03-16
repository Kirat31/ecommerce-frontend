import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Paper, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userAction';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MetaData from '../Layouts/MetaData';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import { useAlert } from 'react-alert';
import { RESET_PASSWORD_RESET } from '../../constants/userConstants';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector((state) => state.resetPassword);

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8).matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
    ).required("Please enter the new password") ,
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      dispatch(resetPassword(token, values.password, values.confirmPassword));
    },
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password Reset Successfully');

      navigate('/loginsignup');

      dispatch({
        type: RESET_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, success]);

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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <MetaData title="Reset Password" />
          <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '70px', marginTop: '70px' }}>
            <Typography variant="h5" align="center" gutterBottom>
              Reset Password
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                <TextField
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1 }} />,
                  }}
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>
                  {formik.errors.password}
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
                Reset Password
              </Button>
            </form>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default ResetPassword;
