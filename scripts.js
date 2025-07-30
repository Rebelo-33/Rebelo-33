// ✅ scripts.js – Unified for add-names.html, my-lists.html

import { db } from './firebase-config.js';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

// ✅ Shared state for both pages
let nameList = [];

// ✅ DOM references
const nameInput = document.getElementById("nameInput");
const nameListContainer = document.getElementById("nameListContainer") || document.getElementById("nameList");
const shareLinkBox = document.getElementById("shareLinkBox");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

// ✅ Add Name to List
window.addName = function () {
  const name = nameInput.value.trim();
  errorMsg.textContent = "";

  if (!name) return showError("Name cannot be empty.");
  if (name.length > 30) return showError("Name too long (max 30 chars).");
  if (nameList.includes(name)) return showError("Name must be unique.");

  nameList.unshift(name); // Add at top
  nameInput.value = "";
  renderNames();
};

// ✅ Render name list with delete buttons
function renderNames() {
  nameListContainer.innerHTML = '';

  nameList.forEach((name, index) => {
    const el = document.createElement('div');
    el.className = 'name-item';
    el.textContent = name;

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.innerHTML = '❌';
    del.onclick = () => {
      nameList.splice(index, 1);
      renderNames();
    };

    el.appendChild(del);
    nameListContainer.appendChild(el);
  });
}

// ✅ Show error
function showError(msg) {
  if (errorMsg) errorMsg.textContent = msg;
}

// ✅ Show success
function showSuccess(msg) {
  if (successMsg) successMsg.textContent = msg;
}

// ✅ Save List to Firebase
window.saveList = async function () {
  const listName = document.getElementById("listName")?.value.trim();
  const listPin = document.getElementById("listPin")?.value.trim();
  const secretCode = document.getElementById("secretCode")?.value.trim();

  errorMsg.textContent = "";
  successMsg.textContent = "";

  if (!listName || !listPin || !secretCode) {
    return showError("List name, PIN and secret code are required.");
  }
  if (nameList.length < 2) {
    return showError("Add at least 2 names.");
  }

  const confirmSave = confirm("Do you want to save this list?");
  if (!confirmSave) return;

  const listId = `${listName}_${listPin}`;
  const listRef = doc(db, "lists", listId);

  try {
    const exists = await getDoc(listRef);
    if (exists.exists()) {
      const overwrite = confirm("List already exists. Overwrite?");
      if (!overwrite) return;
    }

    await setDoc(listRef, {
      name: listName,
      pin: listPin,
      secretCode,
      participants: nameList,
      drawn: [],
      lastDraw: null,
      timestamp: Date.now()
    });

    showSuccess("✅ List saved successfully!");
    nameList = [];
    renderNames();
    if (shareLinkBox) {
      shareLinkBox.innerHTML = `<p>Share this list name: <strong>${listName}</strong> and PIN: <strong>${listPin}</strong>.</p>`;
    }
    document.getElementById("listName").value = '';
    document.getElementById("listPin").value = '';
    document.getElementById("secretCode").value = '';
  } catch (err) {
    showError("Failed to save list.");
    console.error("[saveList] Error:", err);
  }
};
