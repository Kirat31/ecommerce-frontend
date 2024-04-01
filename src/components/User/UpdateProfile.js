import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Container, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearErrors } from '../../actions/userAction';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useFormik } from 'formik';
import { updateProfileSchema } from '../../schemas';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import { useAlert } from 'react-alert';
import app from '../../firebase';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import FaceIcon from '@mui/icons-material/Face';

function UpdateProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.user);
  const { error, isUpdated, loading, success } = useSelector(state => state.profile);

  // const [avatar, setAvatar] = useState(null);
  // const [imgPerc, setImgPerc] = useState(null);
  // const [inputs, setInputs] = useState({});

  // useEffect(()=>{
  //   avatar && uploadFile(avatar, "imgURL");
  // }, [avatar]);

  // const uploadFile = (file) =>{

  //   if (!file.type.startsWith('image/')) {
  //     console.error('Selected file is not an image');
  //     return;
  //   }
  
  //   const storage = getStorage(app);
  //   const folder = "profileIcon/";
  //   const fileName = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, folder + fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //      setImgPerc(Math.round(progress))
          
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //       switch (error.code) {
  //         case "storage/unauthorized":
  //           // User doesn't have permission to access the object
  //           console.error(error);
  //           break;
  //         case "storage/canceled":
  //           // User canceled the upload
  //           break;
  //         case "storage/unknown":
  //           // Unknown error occurred, inspect error.serverResponse
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log('DownloadURL - ', downloadURL);
  //         setInputs((prev) => {
  //           return {
  //             ...prev,
  //             imgURL: downloadURL,
  //           };
  //         });
  //       });
  //     }
  //   );
  // }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  
  // const [avatarPreview, setAvatarPreview] = useState(FaceIcon);
  // const [avatar, setAvatar] = useState();

  const initialValues = {
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
      avatar: {
        public_id: '',
        url: ''
      }
  };
  
  
  const onSubmit = (values, { setSubmitting }) => {
    console.log("ghf",values);
      const userData = {...values };
      console.log("jh",userData);
      dispatch(updateProfile(userData))
      .then(() => {
        alert.success("Profile Updated Successfully");
        navigate("/account");
      })
      .catch((error) =>{
        alert.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
    };

  const formik = useFormik({
    initialValues,
    validationSchema: updateProfileSchema,
    onSubmit
  });

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setAvatar(file);
  //     setAvatarPreview(URL.createObjectURL(file));
  //   }
  // };

  // useEffect(() => {
  //   console.log("dob", user.dateOfBirth);
  //   console.log("error", error);
  //   console.log("success", success);
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (success) {
  //     alert.success("Profile Updated Successfully");
  //     navigate("/account");
  //     dispatch({
  //       type: UPDATE_PROFILE_RESET,
  //     });
  //   }
  // }, [dispatch, error, alert, navigate, success]);

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

            <form onSubmit={formik.handleSubmit}>
              
              <TextField
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {formik.errors.firstName && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{formik.errors.firstName}</Typography>}

              {/* Add blocks for other fields */}
              <TextField
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {formik.errors.lastName && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{formik.errors.lastName}</Typography>}

              <TextField
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {formik.errors.email && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{formik.errors.email}</Typography>}

              <TextField
                type="text"
                name="address.street"
                value={formik.values.address.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Street"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {formik.errors.address && formik.errors.address.street && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{formik.errors.address.street}</Typography>}
              {/* Add similar blocks for city, state, postalCode, and country fields */}
              <TextField
                type="text"
                name="address.city"
                value={formik.values.address.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="City"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {/* Add similar blocks for state, postalCode, and country fields */}
              <TextField
                type="text"
                name="address.state"
                value={formik.values.address.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="State"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {/* Add similar blocks for postalCode and country fields */}
              <TextField
                type="text"
                name="address.postalCode"
                value={formik.values.address.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Postal Code"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {/* Add similar blocks for country fields */}
              <TextField
                type="text"
                name="address.country"
                value={formik.values.address.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Country"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Phone Number"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              {formik.errors.phoneNumber && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{formik.errors.phoneNumber}</Typography>}

              <TextField
                type="date"
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Date of Birth"
                variant="outlined"
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {formik.errors.dateOfBirth && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{formik.errors.dateOfBirth}</Typography>}

              <TextField
                select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              {formik.errors.gender && <Typography variant="body2" color="error" sx={{ marginTop: 0 }}>{formik.errors.gender}</Typography>}

              <Button type='submit'>Update Profile</Button>
            </form>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default UpdateProfile;
