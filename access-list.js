// ✅ access-list.js
import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔐 Get listId from URL
function getListIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("listId");
}

const listId = getListIdFromURL();
let currentListData = null;
let currentUserDrawnName = localStorage.getItem(`drawn_${listId}`);

// 🔑 Handle PIN submission to access list
export async function submitPin() {
  const enteredPin = document.getElementById('pinInput').value.trim();
  const pinError = document.getElementById('pinError');

  pinError.textContent = '';

  if (!enteredPin || enteredPin.length !== 4) {
    pinError.textContent = "Please enter a 4-digit PIN.";
    return;
  }

  try {
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

    currentListData = listData;
    showListContent();
  } catch (err) {
    pinError.textContent = "Error accessing the list.";
    console.error(err);
  }
}

// ✅ Show the list and draw UI
function showListContent() {
  document.getElementById("pinModal").style.display = "none";
  document.getElementById("listContent").style.display = "block";

  document.getElementById("listName").textContent = currentListData.name;

  const listEl = document.getElementById("participantList");
  listEl.innerHTML = '';

  // 👥 Show participants in columns of 10
  const columns = Math.ceil(currentListData.participants.length / 10);
  for (let i = 0; i < columns; i++) {
    const col = document.createElement('ul');
    col.classList.add("column");
    for (let j = i * 10; j < (i + 1) * 10 && j < currentListData.participants.length; j++) {
      const li = document.createElement('li');
      li.textContent = currentListData.participants[j];
      col.appendChild(li);
    }
    listEl.appendChild(col);
  }

  // ✅ If already drawn, show it
  if (currentUserDrawnName) {
    document.getElementById("drawnName").textContent = `You drew: ${currentUserDrawnName}`;
    document.getElementById("drawBtn").style.display = "none";
  }
}

// 🎲 Draw a name from the list
export async function drawName() {
  if (!currentListData) return;

  if (currentUserDrawnName) {
    alert("You have already drawn a name.");
    return;
  }

  const available = currentListData.participants.filter(name =>
    !(currentListData.drawn || []).includes(name)
  );

  if (available.length === 0) {
    alert("No names left to draw.");
    return;
  }

  // ✅ Randomly select a name
  const randomIndex = Math.floor(Math.random() * available.length);
  const drawn = available[randomIndex];

  const updatedDrawn = [...(currentListData.drawn || []), drawn];
  try {
    await updateDoc(doc(db, "lists", listId), {
      drawn: updatedDrawn,
      lastDraw: Timestamp.now()
    });

    document.getElementById("drawnName").textContent = `You drew: ${drawn}`;
    localStorage.setItem(`drawn_${listId}`, drawn);
    currentUserDrawnName = drawn;
    document.getElementById("drawBtn").style.display = "none";
  } catch (err) {
    console.error("Failed to update drawn name:", err);
    alert("Error saving draw.");
  }
}

// 🟢 Show PIN prompt on page load
window.onload = () => {
  document.getElementById("pinModal").style.display = "block";
  document.getElementById("listContent").style.display = "none";
};
