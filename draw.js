// ✅ draw.js - Handles participant authentication and anonymous drawing logic
// ✅ draw.js - Secure Anonymous Drawing with Hashing
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// ✅ Simple SHA-256 hashing function
async function hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

let participants = [];
let drawn = false;

// ✅ Authenticate user
document.getElementById("authBtn").addEventListener("click", async () => {
  const listName = document.getElementById("listNameInput").value.trim();
  const pin = document.getElementById("pinInput").value.trim();
  const errorBox = document.getElementById("errorMsg");
  errorBox.textContent = "";

  if (!listName || pin.length !== 4) {
    errorBox.textContent = "List name and 4-digit PIN required.";
    return;
  }

  try {
    const q = query(collection(db, "lists"), where("name", "==", listName), where("pin", "==", pin));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      errorBox.textContent = "Incorrect list name or PIN.";
      return;
    }

    const docData = snapshot.docs[0].data();
    participants = docData.participants;
    sessionStorage.setItem("authList", listName);
    sessionStorage.setItem("authPin", pin);

    showDrawSection();
    renderParticipantList();

  } catch (err) {
    console.error("Auth error:", err);
    errorBox.textContent = "Something went wrong.";
  }
});

function showDrawSection() {
  document.querySelector(".auth-form").style.display = "none";
  document.getElementById("drawSection").style.display = "block";
}

// ✅ Show names in list
function renderParticipantList() {
  const container = document.getElementById("participantList");
  container.innerHTML = "";
  participants.forEach(name => {
    const div = document.createElement("div");
    div.textContent = name;
    div.className = "name-item";
    container.appendChild(div);
  });
}

// ✅ Handle Draw
document.getElementById("drawBtn").addEventListener("click", async () => {
  const yourName = document.getElementById("yourNameInput").value.trim();
  const errorBox = document.getElementById("errorMsg");
  errorBox.textContent = "";

  if (!participants.includes(yourName)) {
    errorBox.textContent = "Name not found in list.";
    return;
  }

  const confirm = window.confirm(`Confirm your name is "${yourName}"?`);
  if (!confirm) return;

  // Prevent drawing own name
  const possible = participants.filter(name => name !== yourName);
  if (possible.length === 0) {
    errorBox.textContent = "No names available to draw.";
    return;
  }

  const drawnName = possible[Math.floor(Math.random() * possible.length)];

  // Hash drawn result
  const hashedDraw = await hash(`${yourName}-${drawnName}`);

  // Store in session to prevent re-draw
  sessionStorage.setItem("yourName", yourName);
  sessionStorage.setItem("drawnName", drawnName);
  sessionStorage.setItem("drawHash", hashedDraw);
  drawn = true;

  displayResult(yourName, drawnName);
});

function displayResult(name, drawn) {
  document.getElementById("drawSection").style.display = "none";
  document.getElementById("resultBox").style.display = "block";
  document.getElementById("yourName").textContent = name;
  document.getElementById("drawnName").textContent = drawn;
}

// ✅ Restore if session exists
window.addEventListener("DOMContentLoaded", () => {
  const name = sessionStorage.getItem("yourName");
  const drawn = sessionStorage.getItem("drawnName");

  if (name && drawn) {
    document.querySelector(".auth-form").style.display = "none";
    displayResult(name, drawn);
  }
});
