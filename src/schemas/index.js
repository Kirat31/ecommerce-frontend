import * as Yup from 'yup';

export const loginsignupSchema = Yup.object({
    loginEmail: Yup.string().email().required("Please enter your email"),
    loginPassword: Yup.string().min(8).required("Please enter your password"),
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
      ).required("Please enter your password") 
});

export const updateProfileSchema = Yup.object({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  avatar: Yup.mixed().test('fileSize', 'Avatar file size is too large', (value) => {
    if (!value) return true; // If no file is uploaded, consider it valid
    return value && value.size <= 1048576; // Limit avatar file size to 1MB
  }).test('fileType', 'Avatar file type is not supported', (value) => {
    if (!value) return true; // If no file is uploaded, consider it valid
    return value && ['image/jpeg', 'image/png'].includes(value.type); // Accept only JPEG and PNG formats
  }),
});