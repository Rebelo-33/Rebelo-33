// ✅ access-list.js
import { db } from './firebase-config.js';
import {
  getDoc,
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔐 Get list ID and PIN from URL
const urlParams = new URLSearchParams(window.location.search);
const listId = urlParams.get("listId");
const enteredPin = urlParams.get("pin");

// 🎯 Get HTML elements
const listNameEl = document.getElementById('listName');
const participantsListEl = document.getElementById('participantsList');
const drawnNameEl = document.getElementById('drawnName');
const drawButtonEl = document.getElementById('drawButton');

// 🔒 LocalStorage key
const drawnStorageKey = `drawn_${listId}`;

// 🔍 Fetch and validate list
async function initListAccess() {
  if (!listId || !enteredPin) {
    alert("Missing list ID or PIN.");
    return;
  }

  const docRef = doc(db, "lists", listId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("List not found.");
    return;
  }

  const listData = docSnap.data();

  // 🧪 Validate PIN
  if (listData.pin !== enteredPin) {
    alert("Incorrect PIN.");
    return;
  }

  // ✅ Show list name
  listNameEl.textContent = listData.name || listId;

  // 🧾 Show participants
  participantsListEl.innerHTML = '';
  listData.participants.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    participantsListEl.appendChild(li);
  });

  // 👀 Check if already drawn
  const alreadyDrawn = localStorage.getItem(drawnStorageKey);
  if (alreadyDrawn) {
    drawnNameEl.textContent = `🎉 You previously drew: ${alreadyDrawn}`;
    drawButtonEl.style.display = 'none';
  }
}

// 🧙‍♂️ Draw a random name
async function drawName() {
  const docRef = doc(db, "lists", listId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("List not found.");
    return;
  }

  const data = docSnap.data();
  let participants = [...data.participants];

  if (participants.length === 0) {
    alert("All names have been drawn.");
    return;
  }

  // ✨ Randomly draw name
  const index = Math.floor(Math.random() * participants.length);
  const drawn = participants[index];

  // 💾 Save name locally to prevent re-draw
  localStorage.setItem(drawnStorageKey, drawn);

  // 🔥 Update Firestore to remove drawn name
  participants.splice(index, 1);
  await updateDoc(docRef, {
    participants: participants
  });

  // 🎉 Show drawn name
  drawnNameEl.textContent = `🎉 You drew: ${drawn}`;
  drawButtonEl.style.display = 'none';
}

// 📌 Bind draw button
drawButtonEl.addEventListener('click', drawName);

// 🚀 Initialize on load
initListAccess();
