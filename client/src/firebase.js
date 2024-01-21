// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "hsh-estate-99fc7.firebaseapp.com",
  projectId: "hsh-estate-99fc7",
  storageBucket: "hsh-estate-99fc7.appspot.com",
  messagingSenderId: "100182175224",
  appId: "1:100182175224:web:429bfbc517a55520f87a0d"
};

// Initialize Firebase
export const googleAuthapp = initializeApp(firebaseConfig);