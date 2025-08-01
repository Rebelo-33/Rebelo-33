// ✅ scripts.js – Unified for add-names.html, my-lists.html

import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  setDoc
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

// ✅ Shared state for both pages
let nameList = [];

// ✅ DOM references
const nameInput = document.getElementById("nameInput");
const nameListContainer = document.getElementById("nameListContainer") || document.getElementById("nameList");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

// ✅ Add Name to List
window.addName = function () {
  const name = nameInput.value.trim();
  errorMsg.textContent = "";
  successMsg.textContent = "";

  if (!name) return showError("Name cannot be empty.");
  if (name.length > 30) return showError("Name too long (max 30 chars).");
  if (nameList.includes(name)) return showError("Name must be unique.");

  nameList.unshift(name);
  nameInput.value = "";
  renderNames();
};

// ✅ Render name list in columns
function renderNames() {
  nameListContainer.innerHTML = "";

  const columns = Math.ceil(nameList.length / 10);
  for (let i = 0; i < columns; i++) {
    const columnDiv = document.createElement("div");
    columnDiv.className = "name-column";

    nameList.slice(i * 10, i * 10 + 10).forEach((name, index) => {
      const row = document.createElement("div");
      row.className = "name-item";
      row.textContent = name;

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.innerHTML = "❌";
      delBtn.onclick = () => {
        nameList.splice(i * 10 + index, 1);
        renderNames();
      };

      row.appendChild(delBtn);
      columnDiv.appendChild(row);
    });

    nameListContainer.appendChild(columnDiv);
  }
}

// ✅ Show Error
function showError(msg) {
  if (errorMsg) errorMsg.textContent = msg;
}

// ✅ Show Success
function showSuccess(msg) {
  if (successMsg) successMsg.textContent = msg;
}

// ✅ Save List with prompt for List Name / PIN / Secret Code
window.saveList = async function () {
  errorMsg.textContent = "";
  successMsg.textContent = "";

  if (nameList.length < 2) {
    return showError("Add at least 2 names.");
  }

  const listName = prompt("Enter List Name:");
  const listPin = prompt("Enter 4-digit PIN:");
  const secretCode = prompt("Enter Secret Code:");

  if (!listName || !listPin || !secretCode) {
    return showError("All credentials are required.");
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
  } catch (err) {
    console.error("[saveList] Error:", err);
    showError("Failed to save list.");
  }
};
