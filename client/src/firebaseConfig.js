// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export the storage object for use in other parts of your application
export { storage, analytics };
