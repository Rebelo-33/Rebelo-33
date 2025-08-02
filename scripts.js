// ✅ scripts.js - Add Names & Save List Functionality

import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  setDoc
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

// 🔄 Local name storage
let nameList = [];

// 🔗 DOM elements
const nameInput = document.getElementById("nameInput");
const nameListContainer = document.getElementById("nameList");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");
const shareBox = document.getElementById("shareLinkBox");

// ✅ Validation helper — must be 1–30 chars, no leading/trailing space
function isValidName(name) {
  const trimmed = name.trim();
  return trimmed.length > 0 && trimmed.length <= 30 && !/^\s|\s$/.test(name);
}

// ✅ Show error and clear success
function showError(msg) {
  if (errorMsg) errorMsg.textContent = msg;
  if (successMsg) successMsg.textContent = "";
}

// ✅ Show success and clear error
function showSuccess(msg) {
  if (successMsg) successMsg.textContent = msg;
  if (errorMsg) errorMsg.textContent = "";
}

// ✅ Render all names into columns of 10
function renderNames() {
  nameListContainer.innerHTML = "";
  const columns = Math.ceil(nameList.length / 10);

  for (let i = 0; i < columns; i++) {
    const col = document.createElement("div");
    col.className = "column";

    nameList.slice(i * 10, i * 10 + 10).forEach((name, index) => {
      const div = document.createElement("div");
      div.className = "name-item";
      div.textContent = name;

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.className = "delete-button";
      delBtn.onclick = () => {
        nameList.splice(i * 10 + index, 1);
        renderNames();
      };

      div.appendChild(delBtn);
      col.appendChild(div);
    });

    nameListContainer.appendChild(col);
  }
}

// ➕ Add name from input
window.addName = function () {
  const name = nameInput.value;
  const trimmed = name.trim();

  showError(""); // clear any old messages
  showSuccess("");

  if (!isValidName(name)) return showError("Name must be 1–30 characters, no leading/trailing spaces.");
  if (nameList.includes(trimmed)) return showError("Name already added.");

  nameList.unshift(trimmed); // Add to beginning
  nameInput.value = "";
  renderNames();
};

// 💾 Save list with prompts and validation
window.saveList = async function () {
  showError("");
  showSuccess("");

  if (nameList.length < 2) {
    return showError("Please add at least 2 names.");
  }

  const listNameRaw = prompt("Enter a unique list name:");
  if (!listNameRaw) return showError("List name is required.");
  const listName = listNameRaw.trim();

  const pinRaw = prompt("Enter a 4-digit PIN:");
  if (!pinRaw) return showError("PIN is required.");
  const pin = pinRaw.trim();

  const codeRaw = prompt("Enter a secret code (letters/numbers):");
  if (!codeRaw) return showError("Secret code is required.");
  const code = codeRaw.trim();

  // Validate inputs
  if (!/^\d{4}$/.test(pin)) return showError("PIN must be 4 digits.");
  if (!/^[a-zA-Z0-9]+$/.test(code)) return showError("Code must contain only letters and numbers.");

  const listId = `${listName}_${pin}`;
  const listRef = doc(db, "lists", listId);

  try {
    const exists = await getDoc(listRef);
    if (exists.exists()) {
      return showError("List name with this PIN already exists. Try another name.");
    }

    await setDoc(listRef, {
      name: listName,
      pin,
      secretCode: code,
      participants: nameList,
      drawn: [],
      lastDraw: null,
      timestamp: Date.now()
    });

    showSuccess("✅ List saved successfully!");
    nameList = [];
    renderNames();

    if (shareBox) {
      shareBox.innerHTML = `<p>Share this list name: <strong>${listName}</strong> and PIN: <strong>${pin}</strong>.</p>`;
    }
  } catch (err) {
    console.error("[saveList] Firebase error:", err);
    showError("An error occurred while saving. Try again.");
  }
};
