// ✅ access-list.js
import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let listId = null;
let listData = null;
let drawnKey = null;

// Extract listId from URL (e.g. ?listId=Santa_2525)
function getListIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('listId');
}

// Show PIN modal
function showPinPrompt() {
  document.getElementById('pinModal').style.display = 'block';
  document.getElementById('listContent').style.display = 'none';
}

// Submit PIN and validate
window.submitPin = async function () {
  const enteredPin = document.getElementById('pinInput').value;
  listId = getListIdFromURL();

  if (!listId || !enteredPin) {
    document.getElementById('pinError').textContent = 'Missing list ID or PIN.';
    return;
  }

  try {
    const docRef = doc(db, "lists", listId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      document.getElementById('pinError').textContent = 'List not found.';
      return;
    }

    const data = docSnap.data();
    if (data.pin !== enteredPin) {
      document.getElementById('pinError').textContent = 'Incorrect PIN.';
      return;
    }

    listData = data;
    drawnKey = `drawn_${listId}`;

    showListContent(data);
  } catch (err) {
    console.error(err);
    document.getElementById('pinError').textContent = 'Error accessing list.';
  }
};

// Display list details and drawing UI
function showListContent(data) {
  document.getElementById('pinModal').style.display = 'none';
  document.getElementById('listContent').style.display = 'block';
  document.getElementById('listName').textContent = `🎁 List: ${data.name}`;

  const ul = document.getElementById('participantList');
  ul.innerHTML = '';
  data.participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    ul.appendChild(li);
  });

  // Show drawn name if exists
  const storedDrawn = localStorage.getItem(drawnKey);
  if (storedDrawn) {
    document.getElementById('drawnName').textContent = `🎉 You drew: ${storedDrawn}`;
    document.getElementById('drawBtn').style.display = 'none';
  } else {
    document.getElementById('drawBtn').onclick = drawName;
  }
}

// Draw a random name
async function drawName() {
  try {
    const docRef = doc(db, "lists", listId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return alert('List no longer exists.');
    const data = docSnap.data();
    let names = data.participants;

    if (names.length === 0) {
      alert("No names left to draw.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * names.length);
    const drawnName = names[randomIndex];

    // Save drawn name locally
    localStorage.setItem(drawnKey, drawnName);
    document.getElementById('drawnName').textContent = `🎉 You drew: ${drawnName}`;
    document.getElementById('drawBtn').style.display = 'none';

    // Remove name from firebase list
    await updateDoc(docRef, {
      participants: arrayRemove(drawnName),
      drawnNames: arrayUnion(drawnName)
    });
  } catch (error) {
    console.error(error);
    alert("Failed to draw name.");
  }
}

// Run PIN prompt on load
window.onload = showPinPrompt;
