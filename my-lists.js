// ✅ my-lists.js

import { db } from './firebase-config.js';
import { collection, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

let currentListId = "";
let currentListData = {};

// 🔐 Authenticate and load list for managing
window.manageList = async function () {
  const listName = document.getElementById("listName").value.trim();
  const pin = document.getElementById("listPin").value.trim();
  const secret = document.getElementById("secretCode").value.trim();

  if (!listName || !pin || !secret) {
    return showError("Please enter list name, PIN and secret code.");
  }

  const listRef = doc(db, "lists", listName);
  const docSnap = await getDoc(listRef);

  if (!docSnap.exists()) {
    return showError("List not found.");
  }

  const data = docSnap.data();

  if (data.pin !== pin || data.secret !== secret) {
    return showError("Invalid credentials.");
  }

  currentListId = listName;
  currentListData = data;
  renderNames(data.participants);
  clearError();
};

// ✅ Show the participant names in columns
function renderNames(names) {
  const container = document.getElementById("nameListContainer");
  container.innerHTML = "";

  const column = document.createElement("div");
  column.className = "column";

  names.forEach((name, i) => {
    const row = document.createElement("div");
    row.className = "name-item";

    const span = document.createElement("span");
    span.textContent = name;

    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn";
    removeBtn.innerHTML = "🗑️";
    removeBtn.onclick = () => confirmDelete(name, i);

    row.appendChild(span);
    row.appendChild(removeBtn);
    column.appendChild(row);
  });

  container.appendChild(column);
}

// ❌ Confirm before deleting name
function confirmDelete(name, index) {
  const confirmDelete = confirm(`Delete ${name}?`);
  if (confirmDelete) {
    currentListData.participants.splice(index, 1);
    renderNames(currentListData.participants);
  }
}

// 💾 Save the updated list to Firestore
window.saveUpdatedList = async function () {
  if (!currentListId || !currentListData.secret) {
    return showError("You must authenticate first.");
  }

  const confirmSave = confirm("Save Changes?");
  if (!confirmSave) return;

  const ref = doc(db, "lists", currentListId);
  await updateDoc(ref, {
    participants: currentListData.participants,
    secret: currentListData.secret,
    shuffled: currentListData.shuffled || false,
    drawn: currentListData.drawn || {},
    created: currentListData.created || new Date().toISOString()
  });

  alert("List updated successfully.");
};

// 📛 Show error message
function showError(msg) {
  const el = document.getElementById("errorMsg");
  if (el) el.textContent = msg;
}

function clearError() {
  const el = document.getElementById("errorMsg");
  if (el) el.textContent = "";
}
