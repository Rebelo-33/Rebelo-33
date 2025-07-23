// ✅ access-list.js
// Import Firebase Firestore instance
import { db } from './firebase-config.js';
import {
  collection, doc, getDoc, updateDoc, Timestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔍 Get listId from the URL (?listId=xxx)
function getListIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("listId");
}

const listId = getListIdFromURL();
let currentListData = null;
let currentUserDrawnName = localStorage.getItem(`drawn_${listId}`);

// 🔑 Submit and validate PIN
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

  // ✅ PIN matched — show list
  currentListData = listData;
  showListContent();
}

// 👁 Show participants and draw status
function showListContent() {
  document.getElementById("pinModal").style.display = "none";
  document.getElementById("listContent").style.display = "block";

  document.getElementById("listName").textContent = currentListData.name;

  // Display participants in columns (10 per column)
  const container = document.getElementById("participantList");
  container.innerHTML = "";

  const chunks = [];
  for (let i = 0; i < currentListData.participants.length; i += 10) {
    chunks.push(currentListData.participants.slice(i, i + 10));
  }

  chunks.forEach(columnData => {
    const ul = document.createElement("ul");
    columnData.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  });

  if (currentUserDrawnName) {
    document.getElementById("drawnName").textContent = `You drew: ${currentUserDrawnName}`;
    document.getElementById("drawBtn").style.display = "none";
  }
}

// 🎁 Random draw logic
export async function drawName() {
  if (!currentListData) return;

  if (currentUserDrawnName) {
    alert("You have already drawn a name.");
    return;
  }

  const available = currentListData.participants.filter(
    name => !(currentListData.drawn || []).includes(name)
  );

  if (available.length === 0) {
    alert("No names left to draw.");
    return;
  }

  const drawn = available[Math.floor(Math.random() * available.length)];

  await updateDoc(doc(db, "lists", listId), {
    drawn: [...(currentListData.drawn || []), drawn],
    lastDraw: Timestamp.now()
  });

  localStorage.setItem(`drawn_${listId}`, drawn);
  currentUserDrawnName = drawn;
  document.getElementById("drawnName").textContent = `You drew: ${drawn}`;
  document.getElementById("drawBtn").style.display = "none";
}

// 🔁 On page load
window.onload = () => {
  document.getElementById("pinModal").style.display = "block";
  document.getElementById("listContent").style.display = "none";
};
