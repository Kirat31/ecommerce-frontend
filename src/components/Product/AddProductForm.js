import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  Button,
  MenuItem,
  Typography,
  Box,
  TextField,
  Container,
  Divider
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import app from "../../firebase";
import Loader from "../Layouts/Loader";

const categories = [
    "Men",
    "Electronics",
    "Women",
    "HomeFurniture",
    "Appliances",
    "More",
  ];

  const AddProductForm = () => {
    const { loading, success, error } = useSelector(
      (state) => state.createProduct
    );
    const [image, setImage] = useState(null);
    const [imgPerc, setImgPerc] = useState(null);
    const [inputs, setInputs] = useState({});
    const [done, setDone] = useState();
  
    useEffect(() => {
      image && uploadFile(image, "imgURL");
    }, [image]);
  
    const uploadFile = (file) => {
      if (!file.type.startsWith("image/")) {
        console.error("Selected file is not an image");
        return;
      }
  
      const storage = getStorage(app);
      const folder = "images/";
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, folder + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgPerc(Math.round(progress));
  
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              console.error(error);
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("DownloadURL - ", downloadURL);
            setInputs((prev) => {
              return {
                ...prev,
                imgURL: downloadURL,
              };
            });
          });
        }
      );
    };

    const initialValues = {
        name: "",
        description: "",
        price: "",
        category: "",
        images: null,
        subCategory: "",
        quantity: 0
      };

      const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").matches(/[a-zA-Z]/, 'Name must contain at least one alphabet character (a-z)'),
        description: Yup.string().required("Description is required"),
        price: Yup.number()
          .required("Price is required")
          .positive("Price must be positive"),
        category: Yup.string().required("Category is required"),
        subCategory: Yup.string().required("Sub category is required"),
        quantity: Yup.number().required('Enter quantity to update inventory').positive('Quantity cannot be negative')
  });  

  const dispatch = useDispatch();
  const alert = useAlert();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const imageUrl = inputs.imgURL; // Assuming imgURL is the URL of the uploaded image
        const placeholderPublicId = inputs.fileName + values.name;
        console.log("imageURL", inputs.imgURL);
        // Create an array containing the image data with placeholder public_id
        const images = [{ url: imageUrl, public_id: placeholderPublicId }];
        console.log(images);
        // Replace the 'images' field in the 'values' object with the new array
        values.images = images;
        console.log("ewfqw",values);
        dispatch(createProduct(values));
        console.log("sad", success);
        if (success) {
          alert.success("Product created successfully!");
          resetForm();
        }
        if (error) {
          alert.error("Product creation unsuccessful");
        }

        // Reset form fields after successful submission
        setImage(null);
      } catch (error) {
        console.error("Error creating product:", error);
        alert.error("Failed to create product.");
      }
    },
  });

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            maxWidth: 600,
            margin: "auto",
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 4,
            bgcolor: "#f5f5f5",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Create New Product
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="Price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              type="number"
              inputProps={{ min: "0.01", step: "0.01" }}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              fullWidth
              margin="normal"
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="SubCategory"
              name="subCategory"
              value={formik.values.subCategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.subCategory && Boolean(formik.errors.subCategory)}
              helperText={formik.touched.subCategory && formik.errors.subCategory}
              fullWidth
              margin="normal"
            />

<input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
              onBlur={formik.handleBlur}
            />

<Divider />

<Typography variant="h6" align="center" gutterBottom>
    Inventory
</Typography>

<TextField
  label="Quantity"
  name="quantity"
  value={formik.values.quantity}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.quantity && Boolean(formik.errors.quantity)}
  helperText={formik.touched.quantity && formik.errors.quantity}
  type="number"
  fullWidth
  margin="normal"
/>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Product
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default AddProductForm;

    
  