// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHoiW1VZ8zflwiN8ISe7HE4WcrfhKyhFM",
  authDomain: "chat-d4797.firebaseapp.com",
  projectId: "chat-d4797",
  storageBucket: "chat-d4797.firebasestorage.app",
  messagingSenderId: "3145457332",
  appId: "1:3145457332:web:b0faa21849f0646fab41e1",

  // databaseURL:
  //   "https://chat-d4797-default-rtdb.europe-west3.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Get a Firestore instance
export const db = getFirestore(app);

// // Get a Realtime Database instance (if you're using it)
// export const rtdb = getDatabase(app);
