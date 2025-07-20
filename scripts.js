// scripts.js

import { db } from './firebase-config.js';
import {
  collection, doc, setDoc, getDoc, getDocs, updateDoc, arrayUnion
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

let participants = [];
let currentListName = '';
let currentPin = '';

// Add participant
window.addName = function () {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name) {
    alert("Please enter a name.");
    return;
  }

  if (participants.includes(name)) {
    alert("Name already exists in the list.");
    return;
  }

  if (name.length > 30) {
    alert("Name must be 30 characters or fewer.");
    return;
  }

  participants.push(name);
  updateListUI();
  input.value = '';
};

// Remove participant
window.removeName = function () {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name && participants.length > 0) {
    alert(`Removed: ${participants.pop()}`);
  } else {
    const index = participants.indexOf(name);
    if (index > -1) {
      participants.splice(index, 1);
      alert(`Removed: ${name}`);
    } else {
      alert("Name not found in list.");
    }
  }

  updateListUI();
  input.value = '';
};

// Update participant list UI
function updateListUI() {
  const list = document.getElementById('nameList');
  if (!list) return;

  list.innerHTML = '';
  participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  });
}

// Save list with PIN and store in Firestore
window.saveList = async function () {
  const listName = prompt("Enter a name for this list:");
  const pin = prompt("Enter a 4-digit PIN to protect this list:");

  if (!listName || !pin || pin.length !== 4 || isNaN(pin)) {
    alert("Please enter a valid list name and 4-digit numeric PIN.");
    return;
  }

  if (participants.length < 2) {
    alert("You must add at least two participants.");
    return;
  }

  const listRef = doc(db, "lists", `${listName}_${pin}`);
  await setDoc(listRef, {
    name: listName,
    pin: pin,
    participants,
    drawn: {},
  });

  alert("List saved! Share this link: " + `${window.location.origin}/draw.html?list=${listName}_${pin}`);
};

// Load lists by PIN
window.loadMyLists = async function () {
  const pin = document.getElementById('pinInput').value;
  const output = document.getElementById('myListsOutput');
  output.innerHTML = '';

  const listsRef = collection(db, "lists");
  const snapshot = await getDocs(listsRef);

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.pin === pin) {
      const li = document.createElement('li');
      li.innerHTML = `${data.name} <button onclick="window.location.href='draw.html?list=${docSnap.id}'">Open</button>`;
      output.appendChild(li);
    }
  });
};

// Draw name logic
window.drawName = async function () {
  const params = new URLSearchParams(window.location.search);
  const listId = params.get('list');
  const nameKey = `drawn_${listId}`;

  const storedDraw = localStorage.getItem(nameKey);
  const nameDisplay = document.getElementById('drawnNameDisplay');

  if (storedDraw) {
    nameDisplay.textContent = `You got: ${storedDraw}`;
    return;
  }

  const listRef = doc(db, "lists", listId);
  const docSnap = await getDoc(listRef);

  if (!docSnap.exists()) {
    alert("List not found.");
    return;
  }

  const data = docSnap.data();
  const { participants, drawn } = data;

  const available = participants.filter(p => !Object.values(drawn).includes(p));

  if (available.length === 0) {
    alert("All names have been drawn.");
    return;
  }

  const yourId = crypto.randomUUID();
  const index = Math.floor(Math.random() * available.length);
  const selected = available[index];

  drawn[yourId] = selected;
  await updateDoc(listRef, { drawn });

  localStorage.setItem(nameKey, selected);
  nameDisplay.textContent = `You got: ${selected}`;
};

// Copy drawn name
window.copyName = function () {
  const name = document.getElementById('drawnNameDisplay').textContent;
  navigator.clipboard.writeText(name);
};

// Send drawn name to email
window.sendEmail = function () {
  const name = document.getElementById('drawnNameDisplay').textContent;
  window.location.href = `mailto:?subject=Your Secret Gift Exchange Name&body=${encodeURIComponent(name)}`;
};

// Enable draw button if link is valid
window.goToDrawPage = function () {
  const drawBtn = document.getElementById('drawBtn');
  if (!drawBtn) return;

  const listKey = localStorage.getItem('lastSavedList');
  if (listKey) {
    drawBtn.disabled = false;
    window.location.href = `draw.html?list=${listKey}`;
  }
};
