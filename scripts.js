// ✅ scripts.js
import { db } from './firebase-config.js';
import {
  setDoc,
  getDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let participants = [];

// 🚀 Add name to list
window.addName = function () {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name) {
    alert("Please enter a name.");
    return;
  }

  if (participants.includes(name)) {
    alert("Name already exists.");
    return;
  }

  if (name.length > 30) {
    alert("Name must be 30 characters or fewer.");
    return;
  }

  participants.push(name);
  input.value = '';
  updateListUI();
};

// 🗑 Remove last or specific name
window.removeName = function () {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (name) {
    const index = participants.indexOf(name);
    if (index > -1) {
      participants.splice(index, 1);
      alert(`Removed: ${name}`);
    } else {
      alert("Name not found.");
    }
  } else if (participants.length > 0) {
    const removed = participants.pop();
    alert(`Removed: ${removed}`);
  }

  input.value = '';
  updateListUI();
};

// 🔁 Update the name list on screen
function updateListUI() {
  const listEl = document.getElementById('nameList');
  listEl.innerHTML = '';

  participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    listEl.appendChild(li);
  });
}

// 💾 Save list to Firestore with unique list name
window.saveList = async function () {
  if (participants.length < 2) {
    alert("Add at least two participants.");
    return;
  }

  const listName = prompt("Enter a unique name for your list:");
  if (!listName || listName.trim().length < 3) {
    alert("List name must be at least 3 characters.");
    return;
  }

  const pin = prompt("Enter a 4-digit PIN to protect your list:");
  if (!pin || !/^\d{4}$/.test(pin)) {
    alert("PIN must be exactly 4 digits.");
    return;
  }

  const listId = listName.trim().replace(/\s+/g, '_'); // simple ID format
  const docRef = doc(db, "lists", listId);

  try {
    const existing = await getDoc(docRef);
    if (existing.exists()) {
      alert("List name already exists. Try a different name.");
      return;
    }

    await setDoc(docRef, {
      name: listName.trim(),
      participants: [...participants],
      pin: pin,
      drawn: [],
      timestamp: serverTimestamp()
    });

    alert("✅ List saved successfully!");

    const accessURL = `${window.location.origin}/access-list.html?listId=${encodeURIComponent(listId)}&pin=${encodeURIComponent(pin)}`;

    const linkBox = document.getElementById('shareLinkBox');
    linkBox.innerHTML = `
      <p><strong>Share this link with participants:</strong></p>
      <input type="text" value="${accessURL}" readonly id="shareURL" style="width:100%;" />
      <button onclick="copyLink()">Copy Link</button>
    `;

  } catch (err) {
    console.error("Error saving list:", err);
    alert("Failed to save list.");
  }
};

// 📋 Copy sharable link to clipboard
window.copyLink = function () {
  const input = document.getElementById('shareURL');
  if (input) {
    input.select();
    document.execCommand('copy');
    alert("Link copied to clipboard!");
  }
};
