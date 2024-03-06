import React, { useRef, useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Link, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, preVerifyUser } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../Layouts/Loader';
import { useFormik } from 'formik'; // Import useFormik
import { loginsignupSchema } from '../../schemas';
import MetaData from '../Layouts/MetaData';

function LoginSignup() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading: userLoading, isAuthenticated, success: userSuccess } = useSelector(state => state.user);
  const { error: preVerifyError, loading: preVerifyLoading, success: preVerifySuccess, message } = useSelector(state => state.preVerifyUser);

  // const { token } = useSelector(state => state.user);
  // console.log(token);

  const loginTab = useRef(null);
  const preVerifyTab = useRef(null);
  const switcherTab = useRef(null);

  const [selectedTab, setSelectedTab] = useState('login');

  // Initialize Formik instance
  const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      loginEmail: '',
      loginPassword: '',
      firstName: '', 
      email: '',
      
    },
    validationSchema: ()=>{
      if (selectedTab === 'login') {
        return loginsignupSchema.pick(['loginEmail', 'loginPassword']);
      } else {
        return loginsignupSchema.pick(['firstName', 'email']);
      }
    },
    onSubmit: async(values) => {
     //console.log("Form submitted with values: ", values);
      // Handle form submission based on selected tab
      if (selectedTab === 'login') {
        dispatch(login(values.loginEmail, values.loginPassword));
      } else {
        const userData = {
          firstName: values.firstName,      
          email: values.email,      
        };
        console.log(userData);
  
        await dispatch(preVerifyUser(userData));
        if (preVerifySuccess) {
          alert.success('Entry successful. Please check your email for the registration link.');
        }
      }
    }
  });
 
  const switchTabs = tab => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(preVerifyError){
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate('/account');
    }
    if (preVerifySuccess && selectedTab === 'preVerifyUser') {
      alert.success('Entry successful. Please check your email for the registration link.');
    }
  }, [dispatch, error, preVerifyError, alert, isAuthenticated, preVerifySuccess, selectedTab]);

  return (
    <Container>
      <Box>
        {userLoading|| preVerifyLoading ? (
          <Loader />
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120vh' }}>
            <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '20px', marginTop: '20px' }}>
              <Box className="login-preVerify-toggle" sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Typography
                  variant="body1"
                  onClick={() => switchTabs('login')}
                  sx={{
                    cursor: 'pointer',
                    marginRight: '60px',
                    borderBottom: selectedTab === 'login' ? '2px solid blue' : 'none',
                  }}
                  ref={loginTab}
                >
                  LOGIN
                </Typography>
                <Typography
                  variant="body1"
                  onClick={() => switchTabs('preVerifyUser')}
                  sx={{
                    cursor: 'pointer',
                    marginLeft: '60px',
                    borderBottom: selectedTab === 'preVerifyUser' ? '2px solid blue' : 'none',
                  }}
                  ref={preVerifyTab}
                >
                  NEW USER
                </Typography>
              </Box>
              <Button ref={switcherTab} style={{ display: 'none' }} />

              <hr style={{ margin: '16px 0' }} />

              <Typography variant="h5" align="center" gutterBottom>
                {selectedTab === 'login' ? 'Login' : 'New User'}
              </Typography>

              <form onSubmit={handleSubmit}>
              <MetaData title="login/signup --ECOMMERCE" />
                {selectedTab === 'login' && (
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
                    <Typography variant="body2" component={RouterLink} to="/forgot-password" sx={{ display: 'block', textAlign: 'right', mb: 2 }}>
                      Forgot Password?
                    </Typography>
                  </>
                )}

                {selectedTab === 'preVerifyUser' && (
                  <>
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
                        InputProps={{
                          startAdornment: <FaceIcon sx={{ mr: 1 }} />,
                        }}
                      />
                    </div>
                    {errors.firstName && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.firstName}</Typography>}

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
                        InputProps={{
                          startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
                        }}
                      />
                    </div>
                    {errors.email && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{errors.email}</Typography>}

                  </>
                )}

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  {selectedTab === 'login' ? 'Login' : 'Enter'}
                </Button>
              </form>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default LoginSignup;
