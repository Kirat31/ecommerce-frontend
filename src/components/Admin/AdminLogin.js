import React, { useRef, useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Link, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from 'react-redux';
import { clearAdminErrors, loginSeller } from '../../actions/adminAction';
import { useAlert } from 'react-alert';
import Loader from '../Layouts/Loader';
import { useFormik } from 'formik'; // Import useFormik
import { loginsignupSchema } from '../../schemas';
import MetaData from '../Layouts/MetaData';

function AdminLogin() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated, success: userSuccess } = useSelector(state => state.admin);

  // const { token } = useSelector(state => state.user);
  // console.log(token);

  // Initialize Formik instance
  const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      loginEmail: '',
      loginPassword: '',
     
    },
    validationSchema: ()=>{
        return loginsignupSchema.pick(['loginEmail', 'loginPassword']);
    },
    onSubmit: async(values) => {
     //console.log("Form submitted with values: ", values);
      // Handle form submission based on selected tab
      
        //dispatch(loginAdmin(values.loginEmail, values.loginPassword));
     
    }
  });
 
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearAdminErrors());
    }
    if (isAuthenticated) {
      navigate('/admin-account');
    }
    // if (preVerifySuccess && selectedTab === 'preVerifySeller') {
    //   alert.success('Entry successful. Please check your email for the registration link.');
    // }
  }, [dispatch, error, alert, isAuthenticated]);

  return (
    <Container>
      <Box>
        {loading ? (
          <Loader />
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120vh' }}>
            <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '20px', marginTop: '20px' }}>
              <Box className="login-preVerify-toggle" sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  LOGIN
              </Box>
              <Button style={{ display: 'none' }} />

              <hr style={{ margin: '16px 0' }} />

              <Typography variant="h5" align="center" gutterBottom>
                 Login
              </Typography>

              <form onSubmit={handleSubmit}>
              <MetaData title="loginadmin --ECOMMERCE" />
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
                      <TextField
                        type="email"
                        name="loginEmail"
                        value={values.loginEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        InputProps={{
                          startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
                        }}
                      />
                    </div>
                    {errors.loginEmail && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.loginEmail}</Typography>}
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                      <TextField
                        type="password"
                        name="loginPassword"
                        value={values.loginPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        InputProps={{
                          startAdornment: <LockOpenIcon sx={{ mr: 1 }} />,
                        }}
                      />
                      
                    </div>
                    {errors.loginPassword && <Typography variant="body2" color="error" sx={{ marginBottom: '16px' }}>{errors.loginPassword}</Typography>}
                    {/* Forgot Password Link */}
                    <Typography variant="body2" component={RouterLink} to="/forgot-password-admin" sx={{ display: 'block', textAlign: 'right', mb: 2 }}>
                      Forgot Password?
                    </Typography>
                  </>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Login
                </Button>
              </form>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default AdminLogin;
