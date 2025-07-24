// ✅ access-list.js
import { db } from './firebase-config.js';
import { doc, getDoc, updateDoc, Timestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

function getListIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("listId");
}

const listId = getListIdFromURL();
let currentList = null;
let drawnName = localStorage.getItem(`drawn_${listId}`);

// 🔐 Submit PIN
window.submitPin = async function () {
  const enteredPin = document.getElementById("pinInput").value;
  const pinError = document.getElementById("pinError");

  if (!enteredPin || enteredPin.length !== 4) {
    pinError.textContent = "Please enter a 4-digit PIN.";
    return;
  }

  try {
    const docSnap = await getDoc(doc(db, "lists", listId));
    if (!docSnap.exists()) {
      pinError.textContent = "List not found.";
      return;
    }

    const data = docSnap.data();
    if (data.pin !== enteredPin) {
      pinError.textContent = "Incorrect PIN.";
      return;
    }

    currentList = data;
    showListContent();
  } catch (err) {
    pinError.textContent = "Error accessing list.";
    console.error(err);
  }
};

// 👀 Show list + draw UI
function showListContent() {
  document.getElementById("pinModal").style.display = "none";
  document.getElementById("listContent").style.display = "block";
  document.getElementById("listName").textContent = currentList.name;

  const ul = document.getElementById("participantList");
  ul.innerHTML = '';
  currentList.participants.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    ul.appendChild(li);
  });

  if (drawnName) {
    document.getElementById("drawnName").textContent = `You drew: ${drawnName}`;
    document.getElementById("drawBtn").style.display = "none";
  }
}

// 🎯 Draw name
window.drawName = async function () {
  if (!currentList || drawnName) return;

  const available = currentList.participants.filter(name => !(currentList.drawn || []).includes(name));
  if (available.length === 0) {
    alert("All names have been drawn.");
    return;
  }

  const random = available[Math.floor(Math.random() * available.length)];
  const updated = [...(currentList.drawn || []), random];

  await updateDoc(doc(db, "lists", listId), {
    drawn: updated,
    lastDraw: Timestamp.now()
  });

  drawnName = random;
  localStorage.setItem(`drawn_${listId}`, random);
  document.getElementById("drawnName").textContent = `You drew: ${random}`;
  document.getElementById("drawBtn").style.display = "none";
};

window.onload = () => {
  document.getElementById("pinModal").style.display = "block";
};
