// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbAu1W51PVTPQ2H7mkLJ-_XJV2A5QLP2I",
  authDomain: "ai-trip-planner-1eecd.firebaseapp.com",
  projectId: "ai-trip-planner-1eecd",
  storageBucket: "ai-trip-planner-1eecd.firebasestorage.app",
  messagingSenderId: "957002615645",
  appId: "1:957002615645:web:e99816f1313895099936b4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)