// ✅ draw.js - Handles participant authentication and anonymous drawing logic
// ✅ draw.js - Secure Anonymous Drawing with Hashing
// ✅ draw.js – Handles secure anonymous drawing of names

import { db } from './firebase-config.js';
import {
  doc, getDoc, updateDoc
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

// 🔐 Generate SHA-256 hash
async function hashName(name) {
  const encoder = new TextEncoder();
  const data = encoder.encode(name);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

window.handleDraw = async function () {
  const listName = document.getElementById("listName").value.trim();
  const pin = document.getElementById("listPin").value.trim();
  const userName = document.getElementById("userName").value.trim();
  const errorBox = document.getElementById("errorMsg");
  const resultBox = document.getElementById("resultBox");

  errorBox.textContent = '';
  resultBox.textContent = '';

  if (!listName || !pin || !userName) {
    errorBox.textContent = "All fields are required.";
    return;
  }

  const listRef = doc(db, "giftLists", listName);
  const listSnap = await getDoc(listRef);

  if (!listSnap.exists()) {
    errorBox.textContent = "List not found.";
    return;
  }

  const data = listSnap.data();
  if (data.pin !== pin) {
    errorBox.textContent = "Incorrect PIN.";
    return;
  }

  const drawn = data.drawn || {};
  const hash = await hashName(userName);

  if (drawn[hash]) {
    resultBox.innerHTML = `<p>You are: <strong>${userName}</strong><br>Your drawn name is: <strong>${drawn[hash]}</strong></p>`;
    return;
  }

  const names = data.names || [];
  if (!names.includes(userName)) {
    errorBox.textContent = "Name not found on the list.";
    return;
  }

  const remaining = names.filter(n => n !== userName && !Object.values(drawn).includes(n));
  if (remaining.length === 0) {
    errorBox.textContent = "No names left to draw.";
    return;
  }

  const picked = remaining[Math.floor(Math.random() * remaining.length)];
  drawn[hash] = picked;

  await updateDoc(listRef, { drawn });

  resultBox.innerHTML = `<p>You are: <strong>${userName}</strong><br>Your drawn name is: <strong>${picked}</strong></p>`;
}
