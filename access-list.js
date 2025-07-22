// ✅ access-list.js
import { db } from './firebase-config.js';
import { collection, doc, getDoc, updateDoc, Timestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔐 Extract listId from URL
function getListIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("listId");
}

const listId = getListIdFromURL();
let currentListData = null;
let currentUserDrawnName = localStorage.getItem(`drawn_${listId}`);

// 🔑 PIN validation
export async function submitPin() {
  const enteredPin = document.getElementById('pinInput').value;
  const pinError = document.getElementById('pinError');

  if (!enteredPin || enteredPin.length !== 4) {
    pinError.textContent = "Please enter a 4-digit PIN.";
    return;
  }

  const docRef = doc(db, "lists", listId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    pinError.textContent = "List not found.";
    return;
  }

  const listData = docSnap.data();
  if (listData.pin !== enteredPin) {
    pinError.textContent = "Incorrect PIN.";
    return;
  }

  // ✅ Access granted
  currentListData = listData;
  showListContent();
}

function showListContent() {
  document.getElementById("pinModal").style.display = "none";
  document.getElementById("listContent").style.display = "block";

  document.getElementById("listName").textContent = currentListData.name;

  // List participants
  const ul = document.getElementById("participantList");
  ul.innerHTML = "";
  currentListData.participants.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    ul.appendChild(li);
  });

  if (currentUserDrawnName) {
    document.getElementById("drawnName").textContent = `You drew: ${currentUserDrawnName}`;
    document.getElementById("drawBtn").style.display = "none";
  }
}

// 🎲 Draw logic
export async function drawName() {
  if (!currentListData) return;

  if (currentUserDrawnName) {
    alert("You have already drawn a name.");
    return;
  }

  const available = currentListData.participants.filter(name => !currentListData.drawn?.includes(name));
  if (available.length === 0) {
    alert("No names left to draw.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  const drawn = available[randomIndex];

  // Save to Firestore
  const updatedDrawn = [...(currentListData.drawn || []), drawn];
  await updateDoc(doc(db, "lists", listId), {
    drawn: updatedDrawn,
    lastDraw: Timestamp.now()
  });

  // Show to user
  document.getElementById("drawnName").textContent = `You drew: ${drawn}`;
  localStorage.setItem(`drawn_${listId}`, drawn);
  currentUserDrawnName = drawn;
  document.getElementById("drawBtn").style.display = "none";
}

// 🔁 Prompt on page load
window.onload = () => {
  document.getElementById("pinModal").style.display = "block";
  document.getElementById("listContent").style.display = "none";
};
