// ✅ scripts.js
import { db } from './firebase-config.js';
import {
  setDoc, doc, getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let participants = [];

window.addName = function () {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();

  if (!name) return alert("Please enter a name.");
  if (participants.includes(name)) return alert("Name already exists.");
  if (name.length > 30) return alert("Name must be 30 characters or fewer.");

  participants.push(name);
  input.value = '';
  updateListUI();
};

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

function updateListUI() {
  const listEl = document.getElementById('nameList');
  listEl.innerHTML = '';
  participants.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    listEl.appendChild(li);
  });
}

window.saveList = async function () {
  if (participants.length < 2) return alert("Add at least two participants.");

  const listName = prompt("Enter a name for your list:");
  if (!listName) return alert("List name is required.");

  const pin = prompt("Enter a 4-digit PIN to protect your list:");
  if (!pin || !/^\d{4}$/.test(pin)) return alert("PIN must be exactly 4 digits.");

  const listId = `${listName.replace(/\s+/g, '_')}_${pin}`;

  const ref = doc(db, "lists", listId);
  const existing = await getDoc(ref);
  if (existing.exists()) {
    alert("List name and PIN combination already exists. Please try a different name.");
    return;
  }

  const data = {
    name: listName,
    participants: [...participants],
    pin: pin,
    timestamp: Date.now()
  };

  try {
    await setDoc(ref, data);
    alert("List saved successfully!");

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

window.copyLink = function () {
  const input = document.getElementById('shareURL');
  if (input) {
    input.select();
    document.execCommand('copy');
    alert("Link copied to clipboard!");
  }
};
