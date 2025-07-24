// ✅ firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔐 Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_vBdjuDi059d4-Yz-fg57fdZy_1GbmcA",
  authDomain: "gift-exchange-ab8bd.firebaseapp.com",
  projectId: "gift-exchange-ab8bd",
  storageBucket: "gift-exchange-ab8bd.appspot.com",
  messagingSenderId: "371607822481",
  appId: "1:371607822481:web:35fe7d620c5e5601271f30",
  measurementId: "G-J98V9GEKFX"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 📦 Export Firestore database
export const db = getFirestore(app);
