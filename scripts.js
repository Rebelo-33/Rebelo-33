// ✅ scripts.js
import { db } from './firebase-config.js';
import {
  setDoc,
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let participants = [];

// 🚀 Add a name
window.addName = function () {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name) return alert("Please enter a name.");
  if (name.length > 30) return alert("Name must be 30 characters or fewer.");
  if (participants.includes(name)) return alert("Name already added.");

  participants.push(name);
  input.value = '';
  updateListUI();
};

// 🗑 Remove name
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

// 🔁 Update name list with columns
function updateListUI() {
  const listEl = document.getElementById('nameList');
  listEl.innerHTML = '';

  const columns = Math.ceil(participants.length / 10);
  for (let c = 0; c < columns; c++) {
    const col = document.createElement('ul');
    col.className = 'column';
    participants.slice(c * 10, (c + 1) * 10).forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      col.appendChild(li);
    });
    listEl.appendChild(col);
  }
}

// 💾 Save list to Firebase
window.saveList = async function () {
  if (participants.length < 2) return alert("Add at least two names.");

  const listName = prompt("Enter a unique name for your list:");
  if (!listName) return alert("List name is required.");

  const pin = prompt("Enter a 4-digit PIN:");
  if (!pin || !/^\d{4}$/.test(pin)) return alert("PIN must be 4 digits.");

  const secret = prompt("Enter a secret code (for organiser only):");
  if (!secret) return alert("Secret code is required.");

  const listId = `${listName.replace(/\s+/g, '_')}_${pin}`;

  // Check if list name already exists (by name field, not ID)
  const nameQuery = query(collection(db, "lists"), where("name", "==", listName));
  const nameSnapshot = await getDocs(nameQuery);
  if (!nameSnapshot.empty) {
    alert("List name already exists. Please choose a different name.");
    return;
  }

  const data = {
    name: listName,
    participants: [...participants],
    pin,
    secret,
    drawn: [],
    timestamp: serverTimestamp()
  };

  try {
    await setDoc(doc(db, "lists", listId), data);
    alert("List saved successfully!");
    participants = [];
    updateListUI();

    const accessURL = `${window.location.origin}/access-list.html?listId=${encodeURIComponent(listId)}`;
    const linkBox = document.getElementById('shareLinkBox');
    linkBox.innerHTML = `
      <p><strong>Share this link with participants:</strong></p>
      <input type="text" value="${accessURL}" readonly id="shareURL" />
      <button onclick="copyLink()">Copy Link</button>
    `;
  } catch (err) {
    console.error("Failed to save:", err);
    alert("Error saving the list.");
  }
};

// 📋 Copy link
window.copyLink = function () {
  const input = document.getElementById('shareURL');
  if (input) {
    input.select();
    document.execCommand('copy');
    alert("Link copied!");
  }
};
