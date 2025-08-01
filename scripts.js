// ✅ scripts.js – Shared for add-names.html, my-lists.html

import { db } from './firebase-config.js';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

// ✅ Shared state
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
  if (name.length > 30) return showError("Name too long (max 30 characters).");
  if (nameList.includes(name)) return showError("Name must be unique.");

  nameList.unshift(name); // Add to beginning
  nameInput.value = "";
  renderNames();
};

// ✅ Render Name List with Delete Buttons in Columns
function renderNames() {
  nameListContainer.innerHTML = '';

  const columnsWrapper = document.createElement('div');
  columnsWrapper.className = 'name-columns';

  const columnCount = Math.ceil(nameList.length / 10);

  for (let c = 0; c < columnCount; c++) {
    const col = document.createElement('div');
    col.className = 'name-column';

    nameList.slice(c * 10, c * 10 + 10).forEach((name, index) => {
      const el = document.createElement('div');
      el.className = 'name-item';
      el.textContent = name;

      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.innerHTML = '❌';
      del.onclick = () => {
        nameList.splice(nameList.indexOf(name), 1);
        renderNames();
      };

      el.appendChild(del);
      col.appendChild(el);
    });

    columnsWrapper.appendChild(col);
  }

  nameListContainer.appendChild(columnsWrapper);
}

// ✅ Error Message
function showError(msg) {
  if (errorMsg) errorMsg.textContent = msg;
}

// ✅ Success Message
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

  // Validate fields
  if (!listName || !listPin || !secretCode) {
    return showError("List name, PIN and secret code are required.");
  }
  if (!/^\d{4}$/.test(listPin)) {
    return showError("PIN must be 4 digits.");
  }
  if (!/^[a-zA-Z0-9]{3,}$/.test(secretCode)) {
    return showError("Secret code must be at least 3 letters or numbers.");
  }
  if (nameList.length < 2) {
    return showError("Add at least 2 names before saving.");
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

    // Clear form fields
    document.getElementById("listName").value = '';
    document.getElementById("listPin").value = '';
    document.getElementById("secretCode").value = '';
  } catch (err) {
    showError("Failed to save list.");
    console.error("[saveList] Error:", err);
  }
};
