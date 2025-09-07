// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: "3145457332",
  appId: "1:3145457332:web:b0faa21849f0646fab41e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("Firebase initialized", firebaseConfig);

// // Get a Firestore instance
export const db = getFirestore(app);

// // Get a Realtime Database instance (if you're using it)
// export const rtdb = getDatabase(app);
