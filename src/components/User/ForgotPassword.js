import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Paper, Container, Input } from '@mui/material';
import Loader from '../Layouts/Loader';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from '../Layouts/MetaData';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      dispatch(forgotPassword(values.email));
    },
  });

//   const forgotPasswordSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("email", email);
//     dispatch(forgotPassword(myForm));
//   };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

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
          <MetaData title="Forgot Password" />
          <Paper elevation={3} sx={{ maxWidth: 400, p: 3, width: '100%', marginBottom: '70px', marginTop: '70px' }}>
            <div className="forgotPasswordBox">
            <Typography variant="h5" align="center" gutterBottom>
              Update Password
            </Typography>

              <form
                className="forgotPasswordForm"
                onSubmit={formik.handleSubmit}
              >
                <div className="forgotPasswordEmail">
                <TextField
  type="email"
  label="Email"
  name="email"
  value={formik.values.email}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.email && Boolean(formik.errors.email)}
  helperText={formik.touched.email && formik.errors.email}
  variant="outlined"
  margin="normal"
  fullWidth
  InputProps={{
    startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
  }}
/>
                </div>

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Send
              </Button>
              </form>
            </div>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default ForgotPassword;