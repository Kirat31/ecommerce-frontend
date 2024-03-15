import * as Yup from 'yup';

export const loginsignupSchema = Yup.object({
    loginEmail: Yup.string().matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ).required("Please enter your email"),
    loginPassword: Yup.string().min(8, "Password should be at least 8 characters").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
    ).required("Please enter your password") ,
    firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First name should contain only letters")
    .min(3, "First name should be at least 3 characters")
    .max(15, "First name cannot exceed 15 characters")
    .required("Please enter your first name"),
    email: Yup.string().matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ).required("Please enter your email"),
});

export const registrationSchema = Yup.object({
  firstName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "First name should contain only letters")
  .min(3, "First name should be at least 3 characters")
  .max(15, "First name cannot exceed 15 characters")
  .required("Please enter your first name"),
  lastName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "Last name should contain only letters")
  .min(3, "Last name should be at least 3 characters")
  .max(15, "Last name cannot exceed 15 characters")
  .required("Please enter your last name"),
  email: Yup.string().matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email address"
  ).required("Please enter your email"),
  password: Yup.string().min(8).matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
  ).required("Please enter the new password")
});

export const updateProfileSchema = Yup.object({
  firstName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "First name should contain only letters")
  .min(3, "First name should be at least 3 characters")
  .max(15, "First name cannot exceed 15 characters")
  .required("Please enter your first name"),
  lastName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "Last name should contain only letters")
  .min(3, "Last name should be at least 3 characters")
  .max(15, "Last name cannot exceed 15 characters")
  .required("Please enter your last name"),
  email: Yup.string().matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email address"
  ).required("Please enter your email"),
  address: Yup.object().shape({
    street: Yup.string().required("Please enter your street"),
    city: Yup.string().required("Please enter your city"),
    state: Yup.string().required("Please enter your state"),
    postalCode: Yup.string().required("Please enter your postal code"),
    country: Yup.string().required("Please enter your country"),
  }),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Please enter your phone number"),
  dateOfBirth: Yup.date().required("Please enter your date of birth").min(new Date(1930, 0, 1), 'Birth year must be after 1930')
  .max(new Date(), 'Date of birth cannot be in the future'),
  gender: Yup.string().required("Please select your gender"),
  avatar: Yup.mixed().test('fileSize', 'Avatar file size is too large', (value) => {
    if (!value) return true; // If no file is uploaded, consider it valid
    return value && value.size <= 1048576; // Limit avatar file size to 1MB
  }).test('fileType', 'Avatar file type is not supported', (value) => {
    if (!value) return true; // If no file is uploaded, consider it valid
    return value && ['image/jpeg', 'image/png'].includes(value.type); // Accept only JPEG and PNG formats
  }),
});

export const addInventorySchema = Yup.object().shape({
  productCategory: Yup.string()
    .required('Product category is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1')
    .integer('Quantity must be a whole number'),
  location: Yup.string()
    .required('Location is required'),
  costPrice: Yup.number()
    .required('Cost price is required')
    .min(1, 'Cost price must be at least 0')
    .positive('Cost price must be a positive number'),
  sellingPrice: Yup.number()
    .required('Selling price is required')
    .min(1, 'Selling price must be at least 0')
    .positive('Selling price must be a positive number'),
  minimumStock: Yup.number()
    .required('Minimum stock is required')
    .positive('Minimum stock must be a positive number'),
  currentStock: Yup.number()
    .required('Current stock is required')
    .positive('Current stock must be a positive number'),
});

export const updateInventorySchema = Yup.object().shape({
  productCategory: Yup.string()
    .required('Product category is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1')
    .integer('Quantity must be a whole number'),
  location: Yup.string()
    .required('Location is required'),
  costPrice: Yup.number()
    .required('Cost price is required')
    .min(1, 'Cost price must be at least 0')
    .positive('Cost price must be a positive number'),
  sellingPrice: Yup.number()
    .required('Selling price is required')
    .min(1, 'Selling price must be at least 0')
    .positive('Selling price must be a positive number'),
  minimumStock: Yup.number()
    .required('Minimum stock is required')
    .positive('Minimum stock must be a positive number'),
  currentStock: Yup.number()
    .required('Current stock is required')
    .positive('Current stock must be a positive number'),
  reorderQuantity: Yup.number()
  .positive('Reorder Quantity is positive'),
});

export const registrationSellerSchema = Yup.object({
  firstName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "First name should contain only letters")
  .min(3, "First name should be at least 3 characters")
  .max(15, "First name cannot exceed 15 characters")
  .required("Please enter your first name"),
  lastName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "Last name should contain only letters")
  .min(3, "Last name should be at least 3 characters")
  .max(15, "Last name cannot exceed 15 characters")
  .required("Please enter your last name"),
  email: Yup.string().matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email address"
  ).required("Please enter your email"),
  role: Yup.string()
  .required("Role is required"),
  password: Yup.string().min(8).matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
  ).required("Please enter the new password"),
  companyName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "Last name should contain only letters")
  .min(3, "Company name should be at least 3 characters")
  .required("Company name is required"),
  companyRegistrationNumber: Yup.string()
  .matches(/^[0-9]{8}$/, "Company registration number must be exactly 8 digits")
  .required("Company registration number is required"),
  companyAddress: Yup.object().shape({
    street: Yup.string().required("Please enter your street"),
    city: Yup.string().required("Please enter your city"),
    state: Yup.string().required("Please enter your state"),
    postalCode: Yup.string().required("Please enter your postal code"),
    country: Yup.string().required("Please enter your country"),
  }),
  sellerAddress: Yup.object().shape({
    street: Yup.string().required("Please enter your street"),
    city: Yup.string().required("Please enter your city"),
    state: Yup.string().required("Please enter your state"),
    postalCode: Yup.string().required("Please enter your postal code"),
    country: Yup.string().required("Please enter your country"),
  }),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Please enter your phone number")
})

export const updateSellerProfileSchema = Yup.object({
  firstName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "First name should contain only letters")
  .min(3, "First name should be at least 3 characters")
  .max(15, "First name cannot exceed 15 characters")
  .required("Please enter your first name"),
  lastName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "Last name should contain only letters")
  .min(3, "Last name should be at least 3 characters")
  .max(15, "Last name cannot exceed 15 characters")
  .required("Please enter your last name"),
  email: Yup.string().matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email address"
  ).required("Please enter your email"),
  companyName: Yup.string()
  .matches(/^[a-zA-Z]+$/, "Last name should contain only letters")
  .min(3, "Company name should be at least 3 characters")
  .required("Company name is required"),
  companyRegistrationNumber: Yup.string()
  .matches(/^[0-9]{8}$/, "Company registration number must be exactly 8 digits")
  .required("Company registration number is required"),
  companyAddress: Yup.object().shape({
    street: Yup.string().required("Please enter your street"),
    city: Yup.string().required("Please enter your city"),
    state: Yup.string().required("Please enter your state"),
    postalCode: Yup.string().required("Please enter your postal code"),
    country: Yup.string().required("Please enter your country"),
  }),
  sellerAddress: Yup.object().shape({
    street: Yup.string().required("Please enter your street"),
    city: Yup.string().required("Please enter your city"),
    state: Yup.string().required("Please enter your state"),
    postalCode: Yup.string().required("Please enter your postal code"),
    country: Yup.string().required("Please enter your country"),
  }),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Please enter your phone number"),
  
});