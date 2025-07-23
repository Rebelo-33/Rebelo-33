// ✅ scripts.js
import { db } from './firebase-config.js';
import {
  setDoc, doc, serverTimestamp, getDocs, collection, query, where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let participants = [];

// ➕ Add name to the participant list
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

// ➖ Remove last or typed name
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

// 🖥 Update the on-screen name list in columns of 10
function updateListUI() {
  const listEl = document.getElementById('nameList');
  listEl.innerHTML = '';
  const chunks = [];
  for (let i = 0; i < participants.length; i += 10) {
    chunks.push(participants.slice(i, i + 10));
  }
  chunks.forEach(chunk => {
    const ul = document.createElement('ul');
    chunk.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      ul.appendChild(li);
    });
    listEl.appendChild(ul);
  });
}

// 💾 Save list to Firebase
window.saveList = async function () {
  if (participants.length < 2) {
    alert("Add at least two participants.");
    return;
  }

  const listName = prompt("Enter a name for your list:");
  if (!listName) {
    alert("List name is required.");
    return;
  }

  // Check if list name is already taken
  const nameQuery = query(collection(db, "lists"), where("name", "==", listName));
  const snapshot = await getDocs(nameQuery);
  if (!snapshot.empty) {
    alert("List name already exists. Please choose a different name.");
    return;
  }

  const pin = prompt("Enter a 4-digit PIN to protect your list:");
  if (!pin || !/^\d{4}$/.test(pin)) {
    alert("PIN must be exactly 4 digits.");
    return;
  }

  const secretCode = prompt("Enter a secret code to manage this list (for organiser only):");
  if (!secretCode) {
    alert("Secret code is required.");
    return;
  }

  const listId = `${listName.replace(/\s+/g, '_')}_${pin}`;

  const data = {
    name: listName,
    participants: [...participants],
    pin: pin,
    secretCode: secretCode,
    timestamp: Date.now()
  };

  try {
    await setDoc(doc(db, "lists", listId), data);
    alert("List saved successfully!");

    // Clear current list and show share link
    participants = [];
    updateListUI();

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

// 📋 Copy link to clipboard
window.copyLink = function () {
  const input = document.getElementById('shareURL');
  if (input) {
    input.select();
    document.execCommand('copy');
    alert("Link copied to clipboard!");
  }
};
