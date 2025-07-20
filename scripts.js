// scripts.js
import { db } from './firebase-config.js';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let currentListCode = "";
let participants = [];

// Save a new list to Firestore
async function saveListToFirestore(listName, pin) {
  if (!listName || !pin || pin.length !== 4 || isNaN(pin)) {
    alert("Please enter a valid list name and 4-digit PIN.");
    return;
  }
  if (participants.length < 2) {
    alert("Add at least two participants.");
    return;
  }

  const code = listName.toLowerCase().replace(/\s+/g, '-') + "-" + Math.floor(1000 + Math.random() * 9000);
  const docRef = doc(db, "lists", code);
  await setDoc(docRef, {
    name: listName,
    pin: pin,
    participants: participants,
    drawn: {}
  });

  currentListCode = code;
  alert("List saved! Share this link: " + window.location.origin + "/draw.html?list=" + code);
  window.location.href = `draw.html?list=${code}`;
}

// Load participants by code
async function loadListFromCode(code) {
  const docRef = doc(db, "lists", code);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    alert("List not found.");
    return null;
  }
  return snapshot.data();
}

// Draw a name and save it to Firestore
async function drawName(code, userName) {
  const docRef = doc(db, "lists", code);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data();

  if (!data || !data.participants.includes(userName)) {
    alert("User not found in list.");
    return;
  }
  if (data.drawn[userName]) {
    return data.drawn[userName];
  }

  const available = data.participants.filter(p => !Object.values(data.drawn).includes(p) && p !== userName);
  if (available.length === 0) {
    alert("No names left to draw.");
    return;
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  data.drawn[userName] = selected;

  await updateDoc(docRef, {
    drawn: data.drawn
  });

  return selected;
}

// Add name to local list and display
function addNameToList(name) {
  name = name.trim();
  if (!name) {
    alert("Please enter a name.");
    return;
  }
  if (participants.includes(name)) {
    alert("This name is already added.");
    return;
  }
  participants.push(name);
  updateNameListUI();
}

function updateNameListUI() {
  const ul = document.getElementById("nameList");
  ul.innerHTML = "";
  participants.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    ul.appendChild(li);
  });
}

// Expose globally for HTML
window.saveListToFirestore = saveListToFirestore;
window.loadListFromCode = loadListFromCode;
window.drawName = drawName;
window.addNameToList = addNameToList;
