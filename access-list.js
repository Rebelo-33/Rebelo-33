// ✅ access-list.js
import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔍 Get list ID from URL
function getListIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("listId");
}

const listId = getListIdFromURL();
let currentListData = null;
let currentUserDrawnName = localStorage.getItem(`drawn_${listId}`);

// 🔐 Validate PIN and load list
export async function submitPin() {
  const pinInput = document.getElementById("pinInput");
  const enteredPin = pinInput.value;
  const errorText = document.getElementById("pinError");

  if (!enteredPin || enteredPin.length !== 4) {
    errorText.textContent = "Please enter a 4-digit PIN.";
    return;
  }

  try {
    const docRef = doc(db, "lists", listId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      errorText.textContent = "List not found.";
      return;
    }

    const listData = docSnap.data();
    if (listData.pin !== enteredPin) {
      errorText.textContent = "Incorrect PIN.";
      return;
    }

    // ✅ Access granted
    currentListData = listData;
    renderListView();
  } catch (error) {
    errorText.textContent = "Error accessing list.";
    console.error(error);
  }
}

// ✅ Display the list content
function renderListView() {
  document.getElementById("pinModal").style.display = "none";
  document.getElementById("listContent").style.display = "block";

  document.getElementById("listName").textContent = `List: ${currentListData.name}`;

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

// 🎯 Draw a name from the list
async function drawName() {
  if (!currentListData || currentUserDrawnName) return;

  const available = currentListData.participants.filter(
    name => !(currentListData.drawn || []).includes(name)
  );

  if (available.length === 0) {
    alert("No names left to draw.");
    return;
  }

  const index = Math.floor(Math.random() * available.length);
  const drawn = available[index];

  const updatedDrawn = [...(currentListData.drawn || []), drawn];
  await updateDoc(doc(db, "lists", listId), {
    drawn: updatedDrawn,
    lastDraw: Timestamp.now()
  });

  localStorage.setItem(`drawn_${listId}`, drawn);
  document.getElementById("drawnName").textContent = `You drew: ${drawn}`;
  document.getElementById("drawBtn").style.display = "none";
}

// 🎬 On load, show the PIN modal
window.onload = () => {
  document.getElementById("pinModal").style.display = "block";
  document.getElementById("listContent").style.display = "none";

  // Bind draw button
  const drawBtn = document.getElementById("drawBtn");
  if (drawBtn) drawBtn.onclick = drawName;
};

// 👇 Expose to global scope for inline onclick in HTML
window.submitPin = submitPin;
