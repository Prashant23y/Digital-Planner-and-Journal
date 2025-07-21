import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  githubProvider,
  facebookProvider
} from "./firebase.js";

const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("emailId").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
});

// Social logins
document.getElementById("googleLogin").addEventListener("click", () =>
  signInWithPopup(auth, googleProvider).then(() => window.location.href = "dashboard.html").catch(alert)
);
document.getElementById("githubLogin").addEventListener("click", () =>
  signInWithPopup(auth, githubProvider).then(() => window.location.href = "dashboard.html").catch(alert)
);
document.getElementById("facebookLogin").addEventListener("click", () =>
  signInWithPopup(auth, facebookProvider).then(() => window.location.href = "dashboard.html").catch(alert)
);
