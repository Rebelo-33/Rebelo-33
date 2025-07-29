// ✅ firebase-config.js
// ✅ firebase-config.js
// This file initializes Firebase and exports the Firestore database instance.

// Import necessary Firebase modules from the CDN for modular SDK v12
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔐 Your Firebase project configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA_vBdjuDi059d4-Yz-fg57fdZy_1GbmcA",
  authDomain: "gift-exchange-ab8bd.firebaseapp.com",
  projectId: "gift-exchange-ab8bd",
  storageBucket: "gift-exchange-ab8bd.appspot.com",
  messagingSenderId: "371607822481",
  appId: "1:371607822481:web:35fe7d620c5e5601271f30",
  measurementId: "G-J98V9GEKFX"
};

// 🚀 Initialize Firebase app with your config
const app = initializeApp(firebaseConfig);

// 📦 Initialize and export Firestore database instance
export const db = getFirestore(app);
