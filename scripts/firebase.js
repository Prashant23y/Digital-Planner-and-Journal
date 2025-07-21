import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"; // ✅ Add this

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC27_S7j4T5RjcMvhBW68_eeo4n8k8BBgo",
  authDomain: "digitalplannerapp-3defb.firebaseapp.com",
  projectId: "digitalplannerapp-3defb",
  storageBucket: "digitalplannerapp-3defb.appspot.com",
  messagingSenderId: "617831012240",
  appId: "1:617831012240:web:b0ef44ed48fdf1ed67c515",
  databaseURL: "https://digitalplannerapp-3defb-default-rtdb.asia-southeast1.firebasedatabase.app" // ✅ Add this if not already
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // ✅ Get database instance

// ✅ Export everything needed
export {
  app,
  auth,
  database, // ✅ Make sure this is exported
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider as googleProvider,
  GithubAuthProvider as githubProvider,
  FacebookAuthProvider as facebookProvider
};
