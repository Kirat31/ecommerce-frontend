// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWDSlEtYclTIH4vZxjvzagOylGHKMF7fA",
  authDomain: "ecommerce-images-ef2b7.firebaseapp.com",
  projectId: "ecommerce-images-ef2b7",
  storageBucket: "ecommerce-images-ef2b7.appspot.com",
  messagingSenderId: "761625270617",
  appId: "1:761625270617:web:c4f72df8ac37dd2cced448",
  measurementId: "G-20B2RRLDLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;