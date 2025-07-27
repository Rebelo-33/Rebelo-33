// ✅ access-list.js
import { db } from './firebase-config.js';
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let currentListId = null;
let currentListData = null;
let currentUserDrawnName = null;

// 🔐 PIN validation
window.submitPin = async function () {
  const nameInput = document.getElementById("listName").value.trim();
  const pinInput = document.getElementById("pinInput").value.trim();
  const errorEl = document.getElementById("pinError");

  if (!nameInput || !pinInput || pinInput.length !== 4) {
    errorEl.textContent = "Enter valid list name and 4-digit PIN.";
    return;
  }

  const listId = `${nameInput.replace(/\s+/g, "_")}_${pinInput}`;
  const docRef = doc(db, "lists", listId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    errorEl.textContent = "List not found.";
    return;
  }

  const data = docSnap.data();
  currentListId = listId;
  currentListData = data;
  currentUserDrawnName = localStorage.getItem(`drawn_${listId}`);

  // Show list
  showListContent();
};

function showListContent() {
  document.getElementById("pinModal").style.display = "none";
  document.getElementById("listContent").style.display = "block";
  document.getElementById("listNameDisplay").textContent = currentListData.name;

  // List participants
  const container = document.getElementById("participantList");
  container.innerHTML = '';
  const maxPerColumn = 10;
  const columns = [];

  currentListData.participants.forEach((name, index) => {
    const colIndex = Math.floor(index / maxPerColumn);
    if (!columns[colIndex]) {
      const col = document.createElement("div");
      col.className = "column";
      columns[colIndex] = col;
      container.appendChild(col);
    }
    const div = document.createElement("div");
    div.textContent = name;
    columns[colIndex].appendChild(div);
  });

  // Show previously drawn name
  if (currentUserDrawnName) {
    document.getElementById("drawnName").textContent = `You drew: ${currentUserDrawnName}`;
    document.getElementById("drawBtn").style.display = "none";
  }
}

// 🎲 Draw a name (only once per user)
window.drawName = async function () {
  if (!currentListData || currentUserDrawnName) return;

  const drawn = currentListData.drawn || [];
  const available = currentListData.participants.filter(p => !drawn.includes(p));

  if (available.length === 0) {
    alert("No names left to draw.");
    return;
  }

  const random = Math.floor(Math.random() * available.length);
  const selected = available[random];

  // Update Firestore
  const updatedDrawn = [...drawn, selected];
  await updateDoc(doc(db, "lists", currentListId), {
    drawn: updatedDrawn,
    lastDraw: Timestamp.now()
  });

  // Store locally and update UI
  localStorage.setItem(`drawn_${currentListId}`, selected);
  document.getElementById("drawnName").textContent = `You drew: ${selected}`;
  document.getElementById("drawBtn").style.display = "none";
};
