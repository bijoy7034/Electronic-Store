// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBlV0Xnshd47GNCh3toVBbPk64qBMLql0",
  authDomain: "gadget-a7f0c.firebaseapp.com",
  projectId: "gadget-a7f0c",
  storageBucket: "gadget-a7f0c.appspot.com",
  messagingSenderId: "186071249175",
  appId: "1:186071249175:web:764b73cc7565af5bddc752",
  measurementId: "G-D0N5HLG5EQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export the storage object for use in other parts of your application
export { storage, analytics };
