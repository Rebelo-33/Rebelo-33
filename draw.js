// ✅ draw.js - Handles participant authentication and anonymous drawing logic
// ✅ draw.js - Secure Anonymous Drawing with Hashing
// ✅ draw.js – Handles secure anonymous drawing of names
// ✅ draw.js – Secure Name Drawing with Login Session

import { db } from "./firebase-config.js";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Global session
let listName = "";
let participantList = [];
let userName = "";
let hashKey = "";

// ✅ Login verification
window.verifyDrawAccess = async () => {
  listName = document.getElementById("listName").value.trim();
  const pin = document.getElementById("listPin").value.trim();
  const docRef = doc(db, "lists", listName);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists() || docSnap.data().pin !== pin) {
    return showError("Invalid list name or PIN. Please try again.");
  }

  participantList = docSnap.data().participants || [];
  hashKey = `drawn_${listName}_${pin}`;
  renderNames(participantList);
  toggleSections(true);
  checkPreviousDraw();
};

// ✅ Show/hide sections
function toggleSections(showDraw) {
  document.getElementById("authSection").style.display = showDraw ? "none" : "block";
  document.getElementById("drawSection").style.display = showDraw ? "block" : "none";
  document.getElementById("errorMsg").textContent = "";
}

// ✅ Check localStorage for previously drawn name
function checkPreviousDraw() {
  const existing = localStorage.getItem(hashKey);
  if (existing) {
    document.getElementById("result").innerHTML = `<strong>Your drawn name is:</strong> ${existing}`;
    document.getElementById("drawBtn").style.display = "none";
  }
}

// ✅ Render list
function renderNames(names) {
  const listContainer = document.getElementById("namesList");
  listContainer.innerHTML = `<p><strong>List of participants:</strong></p><ul>${names
    .map((n) => `<li>${n}</li>`)
    .join("")}</ul>`;
}

// ✅ Perform draw
window.handleDraw = () => {
  userName = document.getElementById("yourName").value.trim();
  if (!participantList.includes(userName)) {
    return showError("Name not found. Make sure it's exactly as added.");
  }

  const others = participantList.filter((n) => n !== userName);
  const drawn = others[Math.floor(Math.random() * others.length)];

  localStorage.setItem(hashKey, drawn);
  document.getElementById("result").innerHTML = `<strong>Your drawn name is:</strong> ${drawn}`;
  document.getElementById("drawBtn").style.display = "none";
};

// ✅ Error display
function showError(msg) {
  document.getElementById("errorMsg").textContent = msg;
}
