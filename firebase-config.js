
// firebase-config.js (Is file ko root folder mein create karein)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAM12E7clvQ9MHPRJWAIYTx8U-nITSZgks",
  authDomain: "green-step-8e058.firebaseapp.com",
  projectId: "green-step-8e058",
  storageBucket: "green-step-8e058.firebasestorage.app",
  messagingSenderId: "1039970086874",
  appId: "1:1039970086874:web:db98551c4f0e3ae67b9ae3",
  measurementId: "G-MQCPWZJ6ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage, analytics };
