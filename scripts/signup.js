import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  githubProvider,
  facebookProvider
} from "./firebase.js";

import { updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const signupForm = document.getElementById("signup");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("emailId").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // ✅ Update display name
    await updateProfile(userCredential.user, {
      displayName: name
    });

    alert("Sign-up successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// 🔗 Social Signups
document.getElementById("googleSignup").addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Google Sign-In Error: " + error.message);
  }
});

document.getElementById("githubSignup").addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, githubProvider);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("GitHub Sign-In Error: " + error.message);
  }
});

document.getElementById("facebookSignup").addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, facebookProvider);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Facebook Sign-In Error: " + error.message);
  }
});
