// ✅ draw.js – Secure Anonymous Drawing with SHA-256 and Firestore

import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

// 🧠 Local session variables
let listName = '';
let pin = '';
let participants = [];
let drawnHashes = [];
let currentUser = '';

// ✅ On load: check for access via sessionStorage or redirect
window.addEventListener('DOMContentLoaded', async () => {
  listName = sessionStorage.getItem('listName');
  pin = sessionStorage.getItem('pin');

  if (!listName || !pin) {
    alert('You must access this page from the Access List page.');
    location.href = 'access-list.html';
    return;
  }

  document.getElementById('listInfo').style.display = 'block';
  document.getElementById('listNameDisplay').textContent = `List: ${listName}`;

  // 🔐 Load list from Firestore
  const docRef = doc(db, 'lists', `${listName}_${pin}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert('List not found or incorrect PIN.');
    location.href = 'access-list.html';
    return;
  }

  const data = docSnap.data();
  participants = data.participants || [];
  drawnHashes = data.drawnHashes || [];

  // 🔁 Check if user already drew a name
  const userKey = `drawn_${listName}_${pin}`;
  const existingDraw = localStorage.getItem(userKey);
  if (existingDraw) {
    document.getElementById('resultBox').innerHTML = `<strong>You already drew:</strong> ${existingDraw}`;
  }
});

// ✅ Confirm identity (check name exists)
window.confirmIdentity = async function () {
  const input = document.getElementById('participantName');
  const name = input.value.trim();

  if (!name || !participants.includes(name)) {
    alert('Please enter your name exactly as it appears on the list.');
    return;
  }

  currentUser = name;
  document.getElementById('drawBtn').style.display = 'inline-block';
  alert(`Name confirmed: ${currentUser}`);
};

// ✅ Draw name securely
window.drawName = async function () {
  if (!currentUser) {
    alert('Please confirm your name first.');
    return;
  }

  const docRef = doc(db, 'lists', `${listName}_${pin}`);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    alert('List not found.');
    return;
  }

  const data = docSnap.data();
  const allParticipants = data.participants || [];
  const alreadyDrawn = data.drawnHashes || [];

  // 🧮 Filter names to exclude self + already drawn
  const availableNames = allParticipants.filter(
    n => n !== currentUser && !alreadyDrawn.includes(sha256(n))
  );

  if (availableNames.length === 0) {
    alert('No names left to draw!');
    return;
  }

  // 🎯 Random selection
  const randomIndex = Math.floor(Math.random() * availableNames.length);
  const drawnName = availableNames[randomIndex];
  const drawnHash = sha256(drawnName);

  // 🔐 Save hash (only) to Firestore
  await updateDoc(docRef, {
    drawnHashes: [...alreadyDrawn, drawnHash]
  });

  // 💾 Store result locally so user can see later
  const userKey = `drawn_${listName}_${pin}`;
  localStorage.setItem(userKey, drawnName);

  // ✅ Display result
  document.getElementById('resultBox').innerHTML = `
    <strong>You are:</strong> ${currentUser}<br>
    <strong>Your drawn name is:</strong> ${drawnName}
  `;

  // 🔒 Hide draw button to prevent repeat
  document.getElementById('drawBtn').style.display = 'none';
};

// ✅ Hashing function (SHA-256)
function sha256(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return crypto.subtle.digest('SHA-256', data).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  });
}
