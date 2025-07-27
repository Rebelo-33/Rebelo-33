// ✅ draw.js - Handles participant authentication and anonymous drawing logic

import { db } from "./firebase-config.js";
import {
  getDocs,
  query,
  where,
  collection,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 🔐 Track authentication status in sessionStorage
let currentList = null;
let drawnName = null;
let participantName = null;

// ✅ Event: Access List button clicked
window.accessList = async function () {
  const listName = document.getElementById("listName").value.trim();
  const pin = document.getElementById("pin").value.trim();

  if (!listName || !pin || pin.length !== 4) {
    alert("Please enter a valid list name and 4-digit PIN.");
    return;
  }

  try {
    const q = query(collection(db, "lists"), where("name", "==", listName), where("pin", "==", pin));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("List not found. Check name and PIN.");
      return;
    }

    currentList = querySnapshot.docs[0];
    sessionStorage.setItem("authenticated", "true");
    sessionStorage.setItem("listName", listName);
    sessionStorage.setItem("pin", pin);

    document.getElementById("authSection").style.display = "none";
    document.getElementById("drawSection").style.display = "block";
    renderParticipantList();

  } catch (e) {
    console.error("Error accessing list:", e);
    alert("An error occurred. Try again.");
  }
};

// ✅ Show participants in columns
function renderParticipantList() {
  const data = currentList.data();
  const names = data.participants || [];

  const container = document.getElementById("listContainer");
  container.innerHTML = "";

  const maxPerColumn = 10;
  const columns = Math.ceil(names.length / maxPerColumn);

  for (let i = 0; i < columns; i++) {
    const col = document.createElement("div");
    col.className = "column";

    const start = i * maxPerColumn;
    const end = Math.min(start + maxPerColumn, names.length);

    for (let j = start; j < end; j++) {
      const p = document.createElement("p");
      p.textContent = names[j];
      col.appendChild(p);
    }

    container.appendChild(col);
  }
}

// ✅ Draw name - excluding your own
window.drawName = async function () {
  participantName = document.getElementById("yourName").value.trim();

  if (!participantName) {
    alert("Please enter your name.");
    return;
  }

  const listData = currentList.data();
  const names = listData.participants;
  if (!names.includes(participantName)) {
    alert("Name not found in list. Please type your name as it appears.");
    return;
  }

  // Simulate previously drawn name (via local storage)
  const localKey = `drawn_${currentList.id}_${participantName}`;
  const existing = localStorage.getItem(localKey);

  if (existing) {
    document.getElementById("result").textContent = `You are: ${participantName}\nYour drawn name is: ${existing}`;
    return;
  }

  // Filter out user's own name
  const available = names.filter(n => n !== participantName);
  if (available.length === 0) {
    alert("No available names to draw.");
    return;
  }

  // Random draw
  const randomIndex = Math.floor(Math.random() * available.length);
  drawnName = available[randomIndex];

  // Store only locally (not in Firestore)
  localStorage.setItem(localKey, drawnName);
  document.getElementById("result").textContent = `You are: ${participantName}\nYour drawn name is: ${drawnName}`;
};
