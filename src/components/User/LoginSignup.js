import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Typography, Box, Paper, Link, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector} from 'react-redux';
import { clearErrors, login } from '../../actions/userAction';
import {useAlert} from 'react-alert';
import Loader from '../Layouts/Loader';

function LoginSignup() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(state => state.user)

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [selectedTab, setSelectedTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const { firstName, lastName, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("email", email);
    myForm.set("password", password);
    console.log("Register form submitted");
  }

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if(isAuthenticated)
  }, [dispatch, error, alert])
  const switchTabs = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      <Box >
        {loading ? <Loader />:
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120vh' }}>
      <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '220px', marginTop: '220px' }}>

          <Box className="login-signup-toggle" sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}> 
            <Typography 
              variant="body1" 
              onClick={() => switchTabs("login")} 
              sx={{ 
                cursor: 'pointer', 
                marginRight: '60px', 
                borderBottom: selectedTab === "login" ? '2px solid blue' : 'none',
              }} 
              ref={loginTab}
            >
              LOGIN
            </Typography>
            <Typography 
              variant="body1" 
              onClick={() => switchTabs("register")} 
              sx={{ 
                cursor: 'pointer', 
                marginLeft: '60px', 
                borderBottom: selectedTab === "register" ? '2px solid blue' : 'none',
              }} 
              ref={registerTab}
            >
              REGISTER
            </Typography>
          </Box>
          <Button ref={switcherTab} style={{ display: 'none' }} />
          
          <hr style={{ margin: '16px 0' }} /> {/* This line adds the horizontal rule */}
          
          <Typography variant="h5" align="center" gutterBottom>
            {selectedTab === "login" ? "Login" : "Register"}
          </Typography>

          {selectedTab === "login" && (
            <form onSubmit={loginSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <TextField
                  type="email"
                  name="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <MailOutlineIcon sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <TextField
                  type="password"
                  name="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <LockOpenIcon sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </div>
              <Link component={RouterLink} to="//password/forgot">Forgot Password?</Link>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
            </form>
          )}

          {selectedTab === "register" && (
            <form onSubmit={registerSubmit} encType='multipart/form-data'>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <TextField
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={registerDataChange}
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <FaceIcon sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <TextField
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={registerDataChange}
                  label="Last Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <FaceIcon sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <TextField
                  type="email"
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <MailOutlineIcon sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <TextField
                  type="password"
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <LockOpenIcon sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </div>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </form>
          )}

        </Paper>
      </Box>
      
      }
      </Box>
    </Container>
  );
}

export default LoginSignup;
